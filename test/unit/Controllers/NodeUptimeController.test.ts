import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodeUptimeService} from "../../../src/Services/NodeUptimeService";
import {NodeUptimeController} from "../../../src/Controller/Api/NodeUptimeController";
import logger from "../../../src/Services/Logger";
import {NodeUptimeNotificationService} from "../../../src/Services/NodeUptimeNotificationService";
import {NodeUptime} from "../../../src/Models/NodeUptime";

describe("NodeUptimeController", function () {
    describe('POST /node/uptime', () => {
        const nodeUptimeStub = sinon.createStubInstance(NodeUptimeService);
        const nodeNotificationStub = sinon.createStubInstance(NodeUptimeNotificationService);
        // @ts-ignore
        nodeUptimeStub.createNodeUptime.resolves({isWorking: true, nodeId: 4});

        it('should add new node uptime to the database', async function () {
            try {
                const nodeUptimeController = new NodeUptimeController(
                    nodeUptimeStub as unknown as NodeUptimeService,
                    nodeNotificationStub as unknown as NodeUptimeNotificationService);
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

    describe('GET /user/node/uptime/:nodeId?filter=week', () => {
        const nodeUptimeStub = sinon.createStubInstance(NodeUptimeService);
        const nodeNotificationStub = sinon.createStubInstance(NodeUptimeNotificationService);
        nodeUptimeStub.fetchNodeUptime.resolves([
            {
                "id": 1,
                "isWorking": true,
                "createdAt": "2019-06-11T17:59:40.000Z",
                "updatedAt": "2019-06-11T17:59:40.000Z",
                "nodeId": 1
            } as unknown as NodeUptime,
            {
                "id": 2,
                "isWorking": false,
                "createdAt": "2019-06-11T18:59:42.000Z",
                "updatedAt": "2019-06-11T18:59:42.000Z",
                "nodeId": 1
            } as unknown as NodeUptime
        ]);

        it('should return an filtered array (by week) of uptime for a certain node', async function () {
            try {
                const nodeUptimeController = new NodeUptimeController(
                    nodeUptimeStub as unknown as NodeUptimeService,
                    nodeNotificationStub as unknown as NodeUptimeNotificationService);
                const response = {} as Response;
                response.locals = {node: {id: 100}};
                response.json = sinon.spy((result) => {
                    expect(result).to.be.an("Array");
                    expect(result[0]).to.have.ownProperty('isWorking');
                    expect(result[0]).to.have.ownProperty('nodeId');
                }) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeUptimeController.fetchNodeUptime({
                    params: {
                        nodeId: 100
                    },
                    query: {
                        filter: 'week'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
