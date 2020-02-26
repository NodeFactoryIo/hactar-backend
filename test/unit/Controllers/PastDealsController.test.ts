import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodePastDealsService} from "../../../src/Services/NodePastDealsService";
import {NodePastDealsController} from "../../../src/Controller/Api/NodePastDealsController";
import logger from "../../../src/Services/Logger";
import {NodePastDeal} from "../../../src/Models/NodePastDeal";

describe("NodePastDealsController", function () {
    describe('PUT /user/node/pastdeals', () => {
        const nodePastDealsServiceStub = sinon.createStubInstance(NodePastDealsService);
        // @ts-ignore
        nodePastDealsServiceStub.replacePastDealsForNode.returns([
            {
                "id": 1,
                "cid": "cid1",
                "state": 5,
                "size": "9734204",
                "provider": "tj0f01",
                "price": "100000",
                "duration": 1000,
                "nodeId": 100,
            } as unknown as NodePastDeal,
            {
                "id": 2,
                "cid": "cid2",
                "state": 6,
                "size": "9734204",
                "provider": "tj0f02",
                "price": "100000",
                "duration": 1000,
                "nodeId": 100,
            } as unknown as NodePastDeal
        ]);

        it('should store new node past deal to database', async function () {
            try {
                const nodeController = new NodePastDealsController(
                    nodePastDealsServiceStub as unknown as NodePastDealsService);
                const response = {} as Response;
                response.locals = {
                    node: {id: 100}
                };
                response.json = sinon.spy((result) => {
                    expect(result).to.exist;
                    // past deal 1
                    expect(result[0].cid).to.be.equal('cid1');
                    expect(result[0].state).to.be.equal(5);
                    expect(result[0].size).to.be.equal("9734204");
                    expect(result[0].provider).to.be.equal('tj0f01');
                    expect(result[0].price).to.be.equal('100000');
                    expect(result[0].duration).to.be.equal(1000);
                    expect(result[0].nodeId).to.be.equal(100);
                    // past deal 2
                    expect(result[1].cid).to.be.equal('cid2');
                    expect(result[1].state).to.be.equal(6);
                    expect(result[1].size).to.be.equal("9734204");
                    expect(result[1].provider).to.be.equal('tj0f02');
                    expect(result[1].price).to.be.equal('100000');
                    expect(result[1].duration).to.be.equal(1000);
                    expect(result[1].nodeId).to.be.equal(100);
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200);
                    return response;
                }) as any;

                await nodeController.updateOrCreatePastDeal({
                    body: {
                        "pastDeals": [
                            {
                                "id": 1,
                                "cid": "cid1",
                                "state": 5,
                                "size": "9734204",
                                "provider": "tj0f01",
                                "price": "100000",
                                "duration": 1000
                            },
                            {
                                "id": 2,
                                "cid": "cid2",
                                "state": 6,
                                "size": "9734204",
                                "provider": "tj0f02",
                                "price": "100000",
                                "duration": 1000,
                            },
                        ],
                        "nodeInfo": {
                            "address": "address111",
                            "url": "url111"
                        }
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
