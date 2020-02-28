import config from "../Config/Config";
import {UserModel} from "../Models/UserModel";
import axios, {AxiosRequestConfig} from "axios"
import logger from "./Logger";

export class EmailService {
    public async sendEmailNotification(user: UserModel, params: any, templateId: string): Promise<void> {
        const sendEmailRequest: AxiosRequestConfig = {
            data: {
                to: [{
                    email: user.email,
                }],
                nodeUptimeNotifEmailTemplateId: templateId,
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
        // send request (retry X times as defined in config)
        for (let i = 0; i < config.sendinblue.retryCount; i++) {
            const response = await axios(sendEmailRequest);
            // finish if email sent
            if (response.status >= 200 && response.status < 300) {
                return;
            }
            logger.error(`Failed to send mail to: ${user.email}, try [${i + 1}]`, response.data)
        }
    }
}
