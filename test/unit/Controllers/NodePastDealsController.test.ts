import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodePastDealsService} from "../../../src/Services/NodePastDealsService";
import {NodePastDealsController} from "../../../src/Controller/Api/NodePastDealsController";
import logger from "../../../src/Services/Logger";
import {NodePastDealModel} from "../../../src/Models/NodePastDealModel";

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
            } as unknown as NodePastDealModel,
            {
                "id": 2,
                "cid": "cid2",
                "state": 6,
                "size": "9734204",
                "provider": "tj0f02",
                "price": "100000",
                "duration": 1000,
                "nodeId": 100,
            } as unknown as NodePastDealModel
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

    describe('GET /user/node/pastdeals/:nodeId?limits=5&offset=0', () => {
        const nodePastDealsServiceStub = sinon.createStubInstance(NodePastDealsService);
        nodePastDealsServiceStub.fetchNodePastDeals.resolves([
            {
                "cid": "mof2iin023finm23imfp",
                "state": 7,
                "size": "35236547456",
                "provider": "v913nrhvs08",
                "price": "82",
                "duration": 16,
            } as unknown as NodePastDealModel,
            {
                "cid": "inef2iefn02f84f9uwbqd",
                "state": 2,
                "size": "345235424366",
                "provider": "fm139fh91",
                "price": "5",
                "duration": 10,
            } as unknown as NodePastDealModel
        ]);

        it('should return array of node past deals with pagination for the logged in user', async function () {
            try {
                const nodePastDealsController = new NodePastDealsController(
                    nodePastDealsServiceStub as unknown as NodePastDealsService);
                const response = {} as Response;
                response.locals = {node: {id: 1}};
                response.json = sinon.spy((result) => {
                    expect(result).to.be.an("Array");
                    expect(result[0]).to.have.ownProperty('cid');
                    expect(result[0]).to.have.ownProperty('state');
                    expect(result[0]).to.have.ownProperty('size');
                    expect(result[0]).to.have.ownProperty('provider');
                    expect(result[0]).to.have.ownProperty('price');
                    expect(result[0]).to.have.ownProperty('duration');
                }) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodePastDealsController.fetchNodePastDeals({
                    query: {
                        limits: 10,
                        offset: 0,
                        orderBy: "asc"
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
