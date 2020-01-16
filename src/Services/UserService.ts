import * as bcrypt from "bcryptjs";
import logger from "./Logger";

import {User} from "../Models/User";

export class UserService {
    // eslint-disable-next-line
    public async registerUser(email: string, hash_password: string) {
        // eslint-disable-next-line
        return await User.create({email, hash_password});
    }

    public async isAuthenticatedUser(email: string, password: string) {
        try {
            const user = await User.findOne({
                raw: true,
                where: {
                    email,
                }
            })
            if (user) {
                return bcrypt.compareSync(password, user['hash_password']);
            }
            return false;
        } catch (e) {
            logger.error(`Error while searching for user: ${e.message}`);
        }
    }
}
