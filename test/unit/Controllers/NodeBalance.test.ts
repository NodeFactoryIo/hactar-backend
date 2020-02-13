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

    describe('GET /user/node/balance/:nodeId', () => {
        const nodeBalanceServiceStub = sinon.createStubInstance(NodeBalanceService);
        // @ts-ignore
        nodeBalanceServiceStub.fetchNodeBalance.resolves({
            "currentBalance": "5675673737",
            "balanceChangePerc": "74.45%"
        } as unknown as NodeBalance);

        it('should return current node balance and balance change percentage', async function () {
            try {
                const nodeController = new NodeBalanceController(
                    nodeBalanceServiceStub as unknown as NodeBalanceService);
                const response = {} as Response;
                response.locals = {
                    node: {id: 200}
                };
                response.json = sinon.spy((result) => {
                    expect(result).to.exist;
                    expect(result.currentBalance).to.be.equal('5675673737');
                    expect(result.balanceChangePerc).to.be.equal('74.45%');
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeController.fetchNodeBalance({
                    params: {
                        nodeId: 200
                    },
                } as Request, response)
            } catch (err) {
                console.log('test error ', err)
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
