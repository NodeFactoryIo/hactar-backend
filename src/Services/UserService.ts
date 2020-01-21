import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../Config/Config";

import {User} from "../Models/User";
import {ServiceError} from "./ServiceError";

export class UserService extends ServiceError {
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
        // eslint-disable-next-line
        const hash_password = bcrypt.hashSync(password, 10);
        // eslint-disable-next-line
        return await User.create({email, hash_password});
    }

    public async authenticateUser(email: string, password: string) {
        const user = await User.findOne({
            raw: true,
            where: {
                email,
            }
        });
        if (user) {
            const authenticatedUser = bcrypt.compareSync(password, user['hash_password']);
            if (authenticatedUser) {
                const token = jwt.sign({id: user['id']}, config.jwtKey, {expiresIn: config.jwtExpiry});
                return token;
            }
            throw new ServiceError(401, "Unauthorized user.");
        }
        throw new ServiceError(404, "User not found.");
    }
}
