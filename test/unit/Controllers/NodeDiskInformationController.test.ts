import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodeDiskInformationService} from "../../../src/Services/NodeDiskInformationService";
import {NodeDiskInformationController} from "../../../src/Controller/Api/NodeDiskInformationController";
import logger from "../../../src/Services/Logger";

describe("NodeDiskInformation Controller", function () {
    describe('POST /diskinfo', () => {
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
