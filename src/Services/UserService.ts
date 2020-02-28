import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../Config/Config";
import {UserModel} from "../Models/UserModel";
import {ServiceError} from "./ServiceError";
import {UserAttrs} from "../Types/UserAttrsType";

export enum AuthSource {
    CLIENT,
    DAEMON_APP
}

export class UserService {

    public async registerUser(email: string, password: string) {
        const user = await this.getUserByEmail(email);
        if (user) {
            throw new ServiceError(409, "There is already a user with this email address.");
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        return await UserModel.create({email, 'hash_password': hashPassword});
    }

    public async getUserByPk(userId: number): Promise<UserModel | null> {
        return await UserModel.findByPk(userId);
    }

    public async getUserByEmail(email: string) {
        return await UserModel.findOne({
            raw: true,
            where: {
                email,
            }
        });
    }

    public async authenticateUser(email: string, password: string) {
        return await this.authenticate(email, password, AuthSource.CLIENT)
    }

    public async authenticateUserDaemonApp(email: string, password: string) {
        return await this.authenticate(email, password, AuthSource.DAEMON_APP)
    }

    private async authenticate(email: string, password: string, source: AuthSource) {
        const user = await this.getUserByEmail(email);
        if (user) {
            const authenticatedUser = bcrypt.compareSync(password, user['hash_password']);
            if (authenticatedUser) {
                const token = jwt.sign({id: user.id}, config.jwtKey, this.createJwtOptions(source));
                return {token: token};
            }
            throw new ServiceError(401, "Unauthorized user.");
        }
        throw new ServiceError(404, "UserModel not found.");
    }

    private createJwtOptions(source: AuthSource): any {
        let options;
        switch (source) {
            case AuthSource.CLIENT:
                options = {expiresIn: config.jwtExpiry};
                break;
            case AuthSource.DAEMON_APP:
                options = {};
                break;
        }
        return options
    }

    public async updateAccount(userAttrs: UserAttrs, userId: number) {
        if (userAttrs.password) {
            userAttrs.password = bcrypt.hashSync(userAttrs.password, 10);
            // "renaming" password property to hash_password so it can be inserted into database
            delete Object.assign(userAttrs, {'hash_password': userAttrs.password}).password;
        }
        if (userAttrs.email && await this.getUserByEmail(userAttrs.email)) {
            throw new ServiceError(409, "There is already a user with this email address.");
        }
        const updatedUser = await UserModel.update(userAttrs,
            {
                where: {
                    id: userId
                },
                returning: true,
            })
        return await updatedUser[1][0]; // returns the updated object, without updates count
    }
}
