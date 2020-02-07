import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodeBalanceService} from "../../../src/Services/NodeBalanceService";
import {NodeBalanceController} from "../../../src/Controller/Api/NodeBalanceController";
import {NodeBalance} from "../../../src/Models/NodeBalance";
import logger from "../../../src/Services/Logger";

describe("NodeBalanceController", function () {
    describe('POST /user/node/balance', () => {
        const nodeBalanceServiceStub = sinon.createStubInstance(NodeBalanceService);
        // @ts-ignore
        nodeBalanceServiceStub.storeNodeBalance.resolves({
            "id": 2,
            "balance": "21203123",
            "nodeId": 100
        } as unknown as NodeBalance);

        it('should store mining rewards array to the database', async function () {
            try {
                const nodeController = new NodeBalanceController(
                    nodeBalanceServiceStub as unknown as NodeBalanceService);
                const response = {} as Response;
                response.locals = {
                    node: {id: 100}
                };
                response.json = sinon.spy((result) => {
                    expect(result).to.exist;
                    expect(result).to.haveOwnProperty('balance');
                    expect(result).to.haveOwnProperty('nodeId');
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await nodeController.storeNodeBalance({
                    body: {
                        "balance": "21203123",
                        "address": "address222",
                        "url": "url222"
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
