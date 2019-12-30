import sinon from "sinon";
import { expect } from "chai";
import { Request, Response } from "express";
import { NodeService } from "../../../src/Services/NodeService";
import { NodeController } from "../../../src/Controller/Api/NodeController";
import logger from "../../../src/Services/Logger";

describe("NodeController", function () {
    describe('POST /user/node', () => {
        const nodeServiceStub = sinon.createStubInstance(NodeController);
        nodeServiceStub.createNode.resolves({ url: 'some url', token: 'some token', address: 'some address' });

        it('should add new node to the database', async function () {
            try {
                const nodeController = new NodeController(nodeServiceStub as unknown as NodeService);
                const response = {} as Response;
                response.json = sinon.spy((result) => expect(result.token).to.be.equal("some token")) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await nodeController.createNode({
                    body: {
                        url: 'some url',
                        token: 'some token',
                        address: 'some address'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('DELETE /user/node/:nodeId', () => {
        const nodeServiceStub = sinon.createStubInstance(NodeController);
        nodeServiceStub.deleteNode.resolves({ nodeId: 5 });

        it('should delete a node', async function () {
            try {
                const nodeController = new NodeController(nodeServiceStub as unknown as NodeService);
                const response = {} as Response;
                response.json = sinon.spy((result) => {
                    if (result.deleted !== 0) {
                        expect(result.deleted.nodeId).to.be.equal(5)
                        return response;
                    }
                    else {
                        expect(result.deleted.nodeId).to.be.equal(0)
                        return response;

                    }
                }) as any;

                response.status = sinon.spy((result) => {
                    if (result.deleted !== 0) {
                        expect(result).to.equal(200)
                        return response;
                    }
                    else {
                        expect(result).to.equal(404)
                        return response;
                    }
                }) as any;

                await nodeController.deleteNode({
                    params: {
                        nodeId: 5
                    }
                } as Request, response);

            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        })
    })
});
