import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {MiningRewardsService} from "../../../src/Services/MiningRewardsService";
import {MiningRewardsController} from "../../../src/Controller/Api/MiningRewardsController";
import logger from "../../../src/Services/Logger";
import {MiningRewardInput} from "../../../src/Types/MiningRewardInputType";

describe("MiningRewardsController", function () {
    describe('POST /user/node', () => {
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
                    // expect(result[0]).to.have.ownProperty('cid');
                    // expect(result[0]).to.have.ownProperty('rewardAmount');
                    // expect(result[0]).to.have.ownProperty('nodeId');
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await nodeController.storeMiningRewards({
                    body: [
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
});
