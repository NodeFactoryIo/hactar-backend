import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {DiskInformationService} from "../../../src/Services/DiskInformationService";
import {DiskInformationController} from "../../../src/Controller/Api/DiskInformationController";
import logger from "../../../src/Services/Logger";

describe("DiskInformationController", function () {
    describe('POST /diskinfo', () => {
        const diskInfoStub = sinon.createStubInstance(DiskInformationService);
        // @ts-ignore
        diskInfoStub.createDiskData.resolves({freeSpace: 150, takenSpace: 50, nodeId: 4});

        it('should store new disk space in the database', async function () {
            try {
                const diskInfoController = new DiskInformationController(
                    diskInfoStub as unknown as DiskInformationService);
                const response = {} as Response;
                response.locals = {node: {id: 4}};
                response.json = sinon.spy((result) => expect(result.freeSpace).to.be.equal(150)) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await diskInfoController.createDiskData({
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
