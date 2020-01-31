import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../Config/Config";

import {User} from "../Models/User";
import {ServiceError} from "./ServiceError";

export enum AuthSource {
    CLIENT,
    DEAMON_APP
}

export class UserService {
    // eslint-disable-next-line
    public async registerUser(email: string, password: string) {
        const user = await User.findOne({
            raw: true,
            where: {
                email,
            }
        });

        if (user) {
            throw new ServiceError(409, "There is already a user with this email address.");
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        return await User.create({email, 'hash_password': hashPassword});
    }

    public async authenticateUser(email: string, password: string) {
        return await this.authenticate(email, password, AuthSource.CLIENT)
    }

    public async authenticateUserDeamonApp(email: string, password: string) {
        return await this.authenticate(email, password, AuthSource.DEAMON_APP)
    }

    private async authenticate(email: string, password: string, source: AuthSource) {
        const user = await User.findOne({
            raw: true,
            where: {
                email,
            }
        });
        if (user) {
            const authenticatedUser = bcrypt.compareSync(password, user['hash_password']);
            if (authenticatedUser) {
                const token = jwt.sign({id: user['id']}, config.jwtKey, this.createJwtOptions(source));
                return {token: token};
            }
            throw new ServiceError(401, "Unauthorized user.");
        }
        throw new ServiceError(404, "User not found.");
    }

    private createJwtOptions(source: AuthSource): any {
        let options;
        switch (source) {
            case AuthSource.CLIENT:
                options = {expiresIn: config.jwtExpiry};
                break;
            case AuthSource.DEAMON_APP:
                options = {};
                break;
        }
        return options
    }
}
