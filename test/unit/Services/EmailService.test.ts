import sinon, {createSandbox, SinonSandbox} from "sinon";
import {EmailService} from "../../../src/Services/EmailService";

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
        const newVar = await emailService.sendEmailNotification();
        console.log(newVar)
    })
});
