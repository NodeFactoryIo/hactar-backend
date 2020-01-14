import {User} from "../Models/User";

export class UserService {
    // eslint-disable-next-line
    public async registerUser(email: string, hash_password: string) {
        // eslint-disable-next-line
        return await User.create({email, hash_password});
    }

    public async getUserByEmail(email: string) {
        return await User.findOne({
            raw: true,
            where: {
                email,
            }
        })
    }
}
