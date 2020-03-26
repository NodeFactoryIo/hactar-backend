import {expect} from "chai";
import {createSandbox, SinonSandbox, SinonStub} from "sinon";
import {NodeBalanceService} from "../../../src/Services/NodeBalanceService";
import logger from "../../../src/Services/Logger";
import {NodeBalance} from "../../../src/Models/NodeBalance";
import sinon from "sinon";

describe("NodeBalanceService", function () {

    let sandbox: SinonSandbox;
    let nodeBalanceService: NodeBalanceService;
    let nodeBalanceFindAllStub: SinonStub<any>;
    let nodeBalanceFindOneStub: SinonStub<any>;

    beforeEach(function () {
        sandbox = createSandbox();
        nodeBalanceService = new NodeBalanceService();
        nodeBalanceFindAllStub = sinon.stub(NodeBalance, "findAll");
        nodeBalanceFindOneStub = sinon.stub(NodeBalance, "findOne");
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        nodeBalanceFindAllStub.restore();
        nodeBalanceFindOneStub.restore();
    });

    it("should return node balance with balance changes in the last 24 hours", async () => {
        nodeBalanceFindAllStub.returns([
            {
                "currentBalance": "8537124947501041",
                "updatedAt": "2020-03-26T06:41:48.000Z",
                "balanceChange": "0",
                "balanceChangePerc": "0.00%"
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

    it("should return latest node balance outside the last 24 hours", async () => {
        nodeBalanceFindAllStub.returns([]);
        nodeBalanceFindOneStub.returns(
            {
                "id": 2,
                "balance": "8537124947501041",
                "createdAt": "2020-01-13T06:41:48.000Z",
                "updatedAt": "2020-02-17T06:41:48.000Z",
                "nodeId": 5
            } as unknown as NodeBalance);
        try {
            const balances = await nodeBalanceService.fetchNodeBalance(5);

            expect(balances).to.exist;
            expect(balances).to.haveOwnProperty('balance');
            expect(balances).to.haveOwnProperty('createdAt');
            expect(balances).to.haveOwnProperty('updatedAt');
            expect(balances).to.haveOwnProperty('nodeId');

        } catch (err) {
            logger.error(`Unexpected error occured: ${err.message}`);
            expect.fail(err);
        }
    });
});
