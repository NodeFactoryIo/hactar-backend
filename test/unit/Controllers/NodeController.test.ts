import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodeService} from "../../../src/Services/NodeService";
import {NodeController} from "../../../src/Controller/Api/NodeController";
import logger from "../../../src/Services/Logger";
import {Node} from "../../../src/Models/Node";

describe("NodeController", function () {
    describe('POST /user/node', () => {
        const nodeServiceStub = sinon.createStubInstance(NodeService);
        // @ts-ignore
        nodeServiceStub.createNode.resolves({url: 'some url', token: 'some token', address: 'some address'});

        it('should add new node to the database', async function () {
            try {
                const nodeController = new NodeController(nodeServiceStub as unknown as NodeService);
                const response = {} as Response;
                response.locals = {userId: 100}
                response.json = sinon.spy((result) => expect(result.url).to.be.equal("some url")) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await nodeController.createNode({
                    body: {
                        token: 'some token',
                        nodeInfo: {
                            url: 'some url',
                            address: 'some address'
                        }
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('PUT /user/node', () => {
        const nodeServiceStub = sinon.createStubInstance(NodeService);
        // @ts-ignore
        nodeServiceStub.addNodeAdditionalInfo.resolves({
            url: 'some url',
            token: 'some token',
            address: 'some address',
            name: 'node name',
            description: 'node description'
        });

        it('should add node name and description to the node', async function () {
            try {
                const nodeController = new NodeController(nodeServiceStub as unknown as NodeService);
                const response = {} as Response;
                response.locals = {node: {id: 100}}
                response.json = sinon.spy((result) => {
                    expect(result.name).to.be.equal("node name");
                    expect(result.description).to.be.equal("node description")
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeController.addNodeAdditionalInfo({
                    body: {
                        nodeInfo: {
                            url: 'some url',
                            address: 'some address'
                        },
                        name: 'node name',
                        description: 'node description'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('DELETE /user/node/:nodeId', () => {
        const nodeServiceStub = sinon.createStubInstance(NodeService);
        nodeServiceStub.deleteNode.resolves(1);
        // @ts-ignore
        nodeServiceStub.getNodeByPk.resolves({id: 5, url: "url", address: "address", token: "token"});

        it('should delete a node', async function () {
            try {
                const nodeController = new NodeController(nodeServiceStub as unknown as NodeService);
                const response = {} as Response;
                response.json = sinon.spy((result) => {
                    if (result) {
                        expect(result.id).to.be.equal(5)
                        return response;
                    }
                }) as any;

                response.status = sinon.spy((result) => {
                    if (result) {
                        expect(result).to.equal(200)
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
    });

    describe('GET /node/user', () => {
        const nodeServiceStub = sinon.createStubInstance(NodeService);
        nodeServiceStub.getAllNodes.resolves([
            {
                "url": "url111",
                "token": "token111",
                "address": "address111",
            } as unknown as Node,
            {
                "url": "url222",
                "token": "token222",
                "address": "address222",
            } as unknown as Node
        ]);
        it('should return array of nodes belonging to the user', async function () {
            try {
                const nodeController = new NodeController(nodeServiceStub as unknown as NodeService);
                const response = {} as Response;
                response.locals = {userId: {id: 1}};
                response.json = sinon.spy((result) =>
                    expect(result).to.be.an('Array')) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeController.getAllUserNodes({
                    body: {
                        userId: 1
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
