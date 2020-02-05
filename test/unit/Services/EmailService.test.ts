import sinon, {createSandbox, SinonSandbox} from "sinon";
import {EmailService} from "../../../src/Services/EmailService";
import {User} from "../../../src/Models/User";

describe("EmailService", function () {

    let sandbox: SinonSandbox;

    beforeEach(function () {
        sandbox = createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("should successfully authenticate user", async () => {
        const emailService = new EmailService();
        const newVar = await emailService.sendEmailNotification({id: 1, email: ""} as User, 1);
        console.log(newVar)
    })
});
