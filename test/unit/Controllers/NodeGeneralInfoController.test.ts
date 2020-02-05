import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {NodeGeneralInfoService} from "../../../src/Services/NodeGeneralInfoService";
import {NodeGeneralInfoController} from "../../../src/Controller/Api/NodeGeneralInfoController";
import logger from "../../../src/Services/Logger";

describe("NodeGeneralInfoController", function () {
    describe('PUT /user/node/generalminerinfo', () => {
        const nodeGeneralInfoStub = sinon.createStubInstance(NodeGeneralInfoService);
        // @ts-ignore
        nodeGeneralInfoStub.updateOrCreateNodeGeneralInfo.resolves({
            version: '1.0.1',
            sectorSize: 100,
            minerPower: 150,
            totalPower: 300,
            nodeId: 100
        });

        it('should add new node general info to the database', async function () {
            try {
                const nodeGeneralInfoController = new NodeGeneralInfoController(
                    nodeGeneralInfoStub as unknown as NodeGeneralInfoService);
                const response = {} as Response;
                response.locals = {node: {id: 100}};
                response.json = sinon.spy((result) => expect(result.nodeId).to.be.equal(100)) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeGeneralInfoController.updateOrCreateNodeGeneralInfo({
                    body: {
                        version: '1.0.1',
                        sectorSize: 100,
                        minerPower: 150,
                        totalPower: 300,
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
    describe('GET /user/node/generalminerinfo/:nodeId', () => {
        const nodeGeneralInfoStub = sinon.createStubInstance(NodeGeneralInfoService);
        // @ts-ignore
        nodeGeneralInfoStub.fetchNodeGeneralInfo.resolves({
            version: '1.0.1',
            sectorSize: 100,
            minerPower: 150,
            totalPower: 300,
            nodeId: 100
        });

        it('should return node general info', async function () {
            try {
                const nodeGeneralInfoController = new NodeGeneralInfoController(
                    nodeGeneralInfoStub as unknown as NodeGeneralInfoService);
                const response = {} as Response;
                response.locals = {node: {id: 100}};
                response.json = sinon.spy((result) => expect(result.nodeId).to.be.equal(100)) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await nodeGeneralInfoController.fetchNodeGeneralInfo({
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
