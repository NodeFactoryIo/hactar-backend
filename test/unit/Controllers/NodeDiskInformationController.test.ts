import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodeDiskInformationService} from "../../../src/Services/NodeDiskInformationService";
import {NodeDiskInformationController} from "../../../src/Controller/Api/NodeDiskInformationController";
import logger from "../../../src/Services/Logger";
import {NodeDiskInformation} from "../../../src/Models/NodeDiskInformation";

describe("NodeDiskInformation Controller", function () {
    describe('POST /user/node/diskinformation', () => {
        const nodeDiskInfoStub = sinon.createStubInstance(NodeDiskInformationService);
        // @ts-ignore
        nodeDiskInfoStub.createDiskData.resolves({freeSpace: 150, takenSpace: 50, nodeId: 4});

        it('should store new disk space in the database', async function () {
            try {
                const nodeDiskInfoController = new NodeDiskInformationController(
                    nodeDiskInfoStub as unknown as NodeDiskInformationService);
                const response = {} as Response;
                response.locals = {node: {id: 4}};
                response.json = sinon.spy((result) => expect(result.freeSpace).to.be.equal(150)) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await nodeDiskInfoController.createDiskData({
                    body: {
                        freeSpace: 150,
                        takenSpace: 50,
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('GET /user/node/diskinformation/:nodeId', () => {
        const nodeDiskInfoStub = sinon.createStubInstance(NodeDiskInformationService);
        nodeDiskInfoStub.fetchDiskInfo.resolves([
            {
                "freeSpace": "125",
                "takenSpace": "50",
                "nodeId": 100
            } as unknown as NodeDiskInformation
        ]);

        it('should return an array of disk information for a certain node', async function () {
            try {
                const nodeDiskInfoController = new NodeDiskInformationController(
                    nodeDiskInfoStub as unknown as NodeDiskInformationService);
                const response = {} as Response;
                response.json = sinon.spy((result) => expect(result).to.be.an("Array")) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeDiskInfoController.fetchNodeDiskInfo({
                    params: {
                        nodeId: 100
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
