import {expect} from "chai";
import {createSandbox, SinonSandbox, SinonStub} from "sinon";
import {NodeBalanceService} from "../../../src/Services/NodeBalanceService";
import logger from "../../../src/Services/Logger";
import {NodeBalance} from "../../../src/Models/NodeBalance";
import sinon from "sinon";

describe("NodeBalanceService", function () {

    let sandbox: SinonSandbox;
    let nodeBalanceService: NodeBalanceService;
    let nodeBalanceFindAStub: SinonStub<any>;

    beforeEach(function () {
        sandbox = createSandbox();
        nodeBalanceService = new NodeBalanceService();
        nodeBalanceFindAStub = sinon.stub(NodeBalance, "findAll");
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        nodeBalanceFindAStub.restore();
    });

    it("should return node balance with balance changes in the last 24 hours", async () => {
        nodeBalanceFindAStub.returns({
            "currentBalance": "8537124947501041",
            "updatedAt": "2020-03-26T06:41:48.000Z",
            "balanceChange": "2353252",
            "balanceChangePerc": "+23.00%"
        } as unknown as NodeBalance);
        try {
            const balances = await nodeBalanceService.fetchNodeBalance(1);

            expect(balances).to.exist;
            expect(balances).to.haveOwnProperty('currentBalance');
            expect(balances).to.haveOwnProperty('updatedAt');
            expect(balances).to.haveOwnProperty('balanceChange');
            expect(balances).to.haveOwnProperty('balanceChangePerc');

        } catch (err) {
            logger.error(`Unexpected error occured: ${err.message}`);
            expect.fail(err);
        }
    });
});
