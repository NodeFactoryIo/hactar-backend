import {createSandbox, SinonSandbox} from "sinon";
import {NotificationService} from "../../../src/Services/NotificationService";
import {Node} from "../../../src/Models/Node";
import {NodeService} from "../../../src/Services/NodeService";

describe("EmailService", function () {

    let sandbox: SinonSandbox;

    beforeEach(function () {
        sandbox = createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("should successfully authenticate user", async () => {
        const notificationService = new NotificationService();
        const nodeService = new NodeService();
        const node = await nodeService.getNodeByPk(1);

        if (node != null) {
            console.log(notificationService.sendNodeDownNotification(node));
        }
    })
});