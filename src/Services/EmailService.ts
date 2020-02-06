import config from "../Config/Config";
import {User} from "../Models/User";
import axios, {AxiosRequestConfig} from "axios"

export class EmailService {
    public async sendEmailNotification(user: User, params: any): Promise<boolean> {
        const sendEmailRequest: AxiosRequestConfig = {
            data: {
                to: [{
                    email: user.email,
                }],
                templateId: config.sendinblue.templateId,
                params: params
            },
            url: config.sendinblue.apiUrl,
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'api-key': config.sendinblue.apiKey
            },
            method: "POST"
        };
        // send request
        const response = await axios(sendEmailRequest);
        return response.status >= 200 && response.status < 300
    }
}