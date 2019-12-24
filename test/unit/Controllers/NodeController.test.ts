import sinon from "sinon";
import { expect } from "chai";
import { Request, Response } from "express";
import { NodeService } from "../../../src/Services/NodeService";
import { NodeController } from "../../../src/Controller/Api/NodeController";
import { fail } from "assert";

describe("NodeController", function () {
    describe('POST /user/node', () => {
        const nodeServiceStub = sinon.createStubInstance(NodeController);
        nodeServiceStub.createNode.resolves({ url: 'some url', token: 'some token', address: 'some address' });

        it('should add new node to the database', async function () {
            // try {
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
            // } catch (err) {
            //     console.log('test controller', err.message);
            //     logger.error('Unexpected error occured: ${e.message}');
            //     expect.fail(err);
            // }
        });
    })
});
