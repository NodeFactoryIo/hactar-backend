import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {MiningRewardsService} from "../../../src/Services/MiningRewardsService";
import {MiningRewardsController} from "../../../src/Controller/Api/MiningRewardsController";
import logger from "../../../src/Services/Logger";
import {MiningRewardInput} from "../../../src/Types/MiningRewardInputType";
import {MiningReward} from "../../../src/Models/MiningReward";

describe("MiningRewardsController", function () {
    describe('POST /user/node/miningrewards', () => {
        const miningRewardsServiceStub = sinon.createStubInstance(MiningRewardsService);
        // @ts-ignore
        miningRewardsServiceStub.storeMiningRewards.resolves({} as unknown as Array<MiningRewardInput>);

        it('should store mining rewards array to the database', async function () {
            try {
                const nodeController = new MiningRewardsController(
                    miningRewardsServiceStub as unknown as MiningRewardsService);
                const response = {} as Response;
                response.locals = [
                    {
                        "cid": "some cid",
                        "nodeInfo": {
                            "address": "address111",
                            "url": "url111"
                        }
                    },
                    {
                        "cid": "some cid 2",
                        "nodeInfo": {
                            "address": "address222",
                            "url": "url22"
                        }
                    }
                ];
                response.json = sinon.spy((result) => {
                    expect(result).to.exist;
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await nodeController.storeMiningRewards({
                    body: [
                        {
                            "cid": "some cid",
                            "reward": "5",
                            "nodeInfo": {
                                "address": "address111",
                                "url": "url111"
                            }
                        },
                        {
                            "cid": "some cid 2",
                            "reward": "5",
                            "nodeInfo": {
                                "address": "address222",
                                "url": "url222"
                            }
                        }
                    ]
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('GET /user/node/miningrewards/:nodeId?filter=week', () => {
        const miningRewardsStub = sinon.createStubInstance(MiningRewardsService);
        miningRewardsStub.fetchMiningRewards.resolves([
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

        it('should return an filtered array (by week) of mining rewards for a certain node', async function () {
            try {
                const miningRewardsController = new MiningRewardsController(
                    miningRewardsStub as unknown as MiningRewardsService);
                const response = {} as Response;
                response.locals = {node: {id: 100}};
                response.json = sinon.spy((result) => {
                    expect(result).to.be.an("Array");
                    expect(result[0]).to.have.ownProperty('cid');
                    expect(result[0]).to.have.ownProperty('rewardAmount');
                    expect(result[0]).to.have.ownProperty('nodeId');
                }) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await miningRewardsController.fetchMiningRewards({
                    params: {
                        nodeId: 100
                    },
                    query: {
                        filter: 'week'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
