import * as SibApiV3Sdk from "sib-api-v3-typescript";
import {SendSmtpEmail} from "sib-api-v3-typescript";
import config from "../Config/Config";
import {User} from "../Models/User";
import {CreateSmtpEmail} from "sib-api-v3-typescript/api";
import * as http from "http";

export class EmailService {

    protected smtpApi: SibApiV3Sdk.SMTPApi;

    constructor() {
        this.smtpApi = new SibApiV3Sdk.SMTPApi();
        // @ts-ignore
        const apiKey = this.smtpApi.authentications.apiKey;
        apiKey.apiKey = config.sendinblue.apiKey;
    }

    public async sendEmailNotification(user: User, templateId: number):
        Promise<{response: http.ServerResponse; body: CreateSmtpEmail}> {
        const sendSmtpEmail = {
            to: [{
                email: user.email,
                name: ""
            }],
            templateId: templateId,
            headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
            }
        } as SendSmtpEmail;

        return await this.smtpApi.sendTransacEmail(sendSmtpEmail)
    }
}