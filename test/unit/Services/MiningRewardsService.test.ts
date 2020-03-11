import {expect} from "chai";
import {createSandbox, SinonSandbox} from "sinon";
import logger from "../../../src/Services/Logger";
import sinon from "sinon";
import database from "../../../src/Services/Database";
import {MiningRewardsService} from "../../../src/Services/MiningRewardsService";
import {MiningReward} from "../../../src/Models/MiningReward";

describe("MiningRewards", function () {

    let sandbox: SinonSandbox;
    let miningRewardsService: MiningRewardsService;
    let miningRewardsFindStub: any;

    beforeEach(function () {
        sandbox = createSandbox();
        miningRewardsService = new MiningRewardsService();
        miningRewardsFindStub = sinon.stub(database, "runQuery");
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        miningRewardsFindStub.restore();
    });

    it("should return an filtered array (by day) of mining rewards for a certain node",
        async () => {
            miningRewardsFindStub.returns([
                {
                    "id": 2,
                    "cid": "an93fw40gona8sfb7qifo",
                    "rewardAmount": "679194967572963500",
                    "createdAt": "2019-10-19T23:56:40.000Z",
                    "updatedAt": "2019-10-19T23:56:40.000Z",
                    "nodeId": 1
                } as unknown as MiningReward,
                {
                    "id": 1,
                    "cid": "s9a8ghw3pegq57jiwoew35te",
                    "rewardAmount": "598095274278474",
                    "createdAt": "2020-01-27T12:39:01.000Z",
                    "updatedAt": "2020-01-27T12:39:01.000Z",
                    "nodeId": 1
                } as unknown as MiningReward
            ]);
            try {
                const miningRewards = await miningRewardsService.fetchMiningRewards(5, 'day');

                expect(miningRewards).to.exist;
                expect(miningRewards[0]).to.haveOwnProperty('cid');
                expect(miningRewards[0]).to.haveOwnProperty('rewardAmount');
                expect(miningRewards[0]).to.haveOwnProperty('nodeId');

            } catch (err) {
                logger.error(`Unexpected error occured: ${err.message}`);
                expect.fail(err);
            }
        });
});
