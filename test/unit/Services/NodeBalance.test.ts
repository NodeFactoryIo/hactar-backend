import {expect} from "chai";
import {createSandbox, SinonSandbox} from "sinon";
import {NodeBalanceService} from "../../../src/Services/NodeBalanceService";
import logger from "../../../src/Services/Logger";
import {NodeBalance} from "../../../src/Models/NodeBalance";
import sinon from "sinon";

describe("NodeBalanceService", function () {

    let sandbox: SinonSandbox;
    let nodeBalanceService: NodeBalanceService;
    let nodeBalanceFindStub: any;

    beforeEach(function () {
        sandbox = createSandbox();
        nodeBalanceService = new NodeBalanceService();
        nodeBalanceFindStub = sinon.stub(NodeBalance, "findAll");
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        nodeBalanceFindStub.restore();
    });

    it("should return current node balance", async () => {
        nodeBalanceFindStub.returns([
            {
                "id": 3,
                "balance": "8537124947501041",
                "createdAt": "2020-01-13T06:41:48.000Z",
                "updatedAt": "2020-02-17T06:41:48.000Z",
                "nodeId": 1
            },
            {
                "id": 2,
                "balance": "78974914234696",
                "createdAt": "2020-02-13T12:02:13.000Z",
                "updatedAt": "2020-02-17T12:02:13.000Z",
                "nodeId": 1
            }
        ]);
        try {
            const balances = await nodeBalanceService.fetchNodeBalance(1);

            expect(balances).to.exist;
            expect(balances).to.haveOwnProperty('currentBalance');
            expect(balances).to.haveOwnProperty('updatedAt');
            expect(balances).to.haveOwnProperty('balanceChangePerc');

        } catch (err) {
            logger.error(`Unexpected error occured: ${err.message}`);
            expect.fail(err);
        }
    });
});
