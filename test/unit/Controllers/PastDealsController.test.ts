import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodePastDealsService} from "../../../src/Services/NodePastDealsService";
import {NodePastDealsController} from "../../../src/Controller/Api/NodePastDealsController";
import {NodeBalance} from "../../../src/Models/NodeBalance";
import logger from "../../../src/Services/Logger";

describe("NodePastDealsController", function () {
    describe('PUT /user/node/pastdeals', () => {
        const nodePastDealsServiceStub = sinon.createStubInstance(NodePastDealsService);
        // @ts-ignore
        nodePastDealsServiceStub.updateOrCreatePastDeal.resolves({
            "id": 1,
            "cid": "cid444",
            "state": 7,
            "size": "9734204",
            "provider": "tj0f38",
            "price": "100000",
            "duration": 1000,
            "nodeId": 100,
        } as unknown as NodeBalance);

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
                    expect(result.cid).to.be.equal('cid444');
                    expect(result.state).to.be.equal(7);
                    expect(result.size).to.be.equal("9734204");
                    expect(result.provider).to.be.equal('tj0f38');
                    expect(result.price).to.be.equal('100000');
                    expect(result.duration).to.be.equal(1000);
                    expect(result.nodeId).to.be.equal(100);
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeController.updateOrCreatePastDeal({
                    body: {
                        "cid": "cid444",
                        "state": 202,
                        "size": "9734204",
                        "provider": "tj0f38",
                        "price": "100000",
                        "duration": 1000,
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
