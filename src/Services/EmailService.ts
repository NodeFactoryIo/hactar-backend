import config from "../Config/Config";
import {UserModel} from "../Models/UserModel";
import axios, {AxiosRequestConfig} from "axios"
import logger from "./Logger";

export class EmailService {
    public async sendEmailNotification(user: UserModel, params: any, templateId: number): Promise<void> {
        const sendEmailRequest: AxiosRequestConfig = {
            data: {
                to: [{
                    email: user.email,
                }],
                templateId,
                params,
                sender:{
                    name: "Hactar",
                    email: "hactar@nodefactory.io"
                },
                subject: "Your Filecoin node is down",
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
            try {
                const response = await axios(sendEmailRequest);
                // finish if email sent
                if (response.status >= 200 && response.status < 300) {
                    return;
                }
                logger.error(`Failed to send mail to: ${user.email}, try [${i + 1}]`, response.data)
            } catch (e) {
                logger.error(`Failed email sending request: ${e.message}`);
                logger.error("Response is: ", e.response.data);
            }
        }
    }
}
