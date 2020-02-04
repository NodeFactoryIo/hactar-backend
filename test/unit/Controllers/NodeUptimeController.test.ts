import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodeUptimeService} from "../../../src/Services/NodeUptimeService";
import {NodeUptimeController} from "../../../src/Controller/Api/NodeUptimeController";
import logger from "../../../src/Services/Logger";

describe("NodeUptimeController", function () {
    describe('POST /node/uptime', () => {
        const nodeUptimeStub = sinon.createStubInstance(NodeUptimeService);
        // @ts-ignore
        nodeUptimeStub.createNodeUptime.resolves({isWorking: true, nodeId: 4});

        it('should add new node uptime to the database', async function () {
            try {
                const nodeUptimeController = new NodeUptimeController(nodeUptimeStub as unknown as NodeUptimeService);
                const response = {} as Response;
                response.locals = {node: {id: 4}};
                response.json = sinon.spy((result) => expect(result.nodeId).to.be.equal(4)) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await nodeUptimeController.storeNodeUptime({
                    body: {
                        isWorking: true,
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
    describe('GET /node/uptime/:nodeId', () => {
        const nodeUptimeStub = sinon.createStubInstance(NodeUptimeService);
        // @ts-ignore
        nodeUptimeStub.getNodeUpTimeByPk.resolves({url: 'some url', address: 'some address'});

        it('should return node with its uptime status', async function () {
            try {
                const nodeUptimeController = new NodeUptimeController(
                    nodeUptimeStub as unknown as NodeUptimeService);
                const response = {} as Response;
                response.json = sinon.spy((result) => expect(result.url).to.be.equal('some url')) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeUptimeController.getNodeUptime({
                    params: {
                        nodeId: 4
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
