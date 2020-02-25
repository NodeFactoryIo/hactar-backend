import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {GeneralMinerInfoService} from "../../../src/Services/GeneralMinerInfoService";
import {GeneralMinerInfoController} from "../../../src/Controller/Api/GeneralMinerInfoController";
import logger from "../../../src/Services/Logger";

describe("GeneralMinerInfoController", function () {
    describe('PUT /user/node/generalminerinfo', () => {
        const generalMinerInfoStub = sinon.createStubInstance(GeneralMinerInfoService);
        // @ts-ignore
        generalMinerInfoStub.updateOrCreateGeneralMinerInfo.resolves({
            version: '1.0.1',
            walletAddress: "test-wallet-address",
            sectorSize: "100",
            numberOfSectors: 4,
            minerPower: "150",
            totalPower: "300",
            nodeId: 100
        });

        it('should add new general miner info to the database', async function () {
            try {
                const generalMinerInfoController = new GeneralMinerInfoController(
                    generalMinerInfoStub as unknown as GeneralMinerInfoService);
                const response = {} as Response;
                response.locals = {node: {id: 100}};
                response.json = sinon.spy((result) => expect(result.nodeId).to.be.equal(100)) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await generalMinerInfoController.updateOrCreateGeneralMinerInfo({
                    body: {
                        version: '1.0.1',
                        walletAddress: "test-wallet-address",
                        sectorSize: "100",
                        numberOfSectors: 4,
                        minerPower: "150",
                        totalPower: "300",
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
    describe('GET /user/node/generalminerinfo/:nodeId', () => {
        const generalMinerInfoStub = sinon.createStubInstance(GeneralMinerInfoService);
        // @ts-ignore
        generalMinerInfoStub.fetchGeneralMinerInfo.resolves({
            version: '1.0.1',
            walletAddress: "test-wallet-address",
            sectorSize: "100",
            numberOfSectors: 4,
            minerPower: "150",
            totalPower: "300",
            nodeId: 100
        });

        it('should return general miner info', async function () {
            try {
                const generalMinerInfoController = new GeneralMinerInfoController(
                    generalMinerInfoStub as unknown as GeneralMinerInfoService);
                const response = {} as Response;
                response.locals = {node: {id: 100}};
                response.json = sinon.spy((result) => expect(result.nodeId).to.be.equal(100)) as any;
                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await generalMinerInfoController.fetchGeneralMinerInfo({
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
