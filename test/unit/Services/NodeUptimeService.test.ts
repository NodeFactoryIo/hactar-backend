import {expect} from "chai";
import {createSandbox, SinonSandbox, SinonStub} from "sinon";
import {NodeUptimeService} from "../../../src/Services/NodeUptimeService";
import logger from "../../../src/Services/Logger";
import {NodeUptime} from "../../../src/Models/NodeUptime";
import sinon from "sinon";

describe("NodeUptime", function () {

    let sandbox: SinonSandbox;
    let nodeUptimeService: NodeUptimeService;
    let nodeUptimeFindStub: SinonStub<any>;

    beforeEach(function () {
        sandbox = createSandbox();
        nodeUptimeService = new NodeUptimeService();
        nodeUptimeFindStub = sinon.stub(NodeUptime, "findAll");
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        nodeUptimeFindStub.restore();
    });

    it("should return an filtered array (by day) of node uptime for a certain node",
        async () => {
            nodeUptimeFindStub.returns([
                {
                    "isWOrking": true,
                    "nodeId": 5
                } as unknown as NodeUptime,
                {
                    "isWOrking": false,
                    "nodeId": 5
                } as unknown as NodeUptime,
            ]);
            try {
                const nodeUptime = await nodeUptimeService.fetchNodeUptime(5, 'day');

                expect(nodeUptime).to.exist;
                expect(nodeUptime[0]).to.haveOwnProperty('isWOrking');
                expect(nodeUptime[0]).to.haveOwnProperty('nodeId');

            } catch (err) {
                logger.error(`Unexpected error occured: ${err.message}`);
                expect.fail(err);
            }
        });
});
