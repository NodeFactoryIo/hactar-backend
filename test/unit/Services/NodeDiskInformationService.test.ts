import {expect} from "chai";
import sinon from "sinon";
import {createSandbox, SinonSandbox, SinonStub} from "sinon";
import logger from "../../../src/Services/Logger";
import {NodeDiskInformationService} from "../../../src/Services/NodeDiskInformationService";
import {NodeDiskInformation} from "../../../src/Models/NodeDiskInformation";
import database from "../../../src/Services/Database";

describe("NodeDiskInformation", function () {

    let sandbox: SinonSandbox;
    let nodeDiskInformationService: NodeDiskInformationService;
    let nodeDiskInformationFindStub: SinonStub<any>;

    beforeEach(function () {
        sandbox = createSandbox();
        nodeDiskInformationService = new NodeDiskInformationService();
        nodeDiskInformationFindStub = sinon.stub(database, "runQuery");
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        nodeDiskInformationFindStub.restore();
    });

    it("should return a filtered array (by day) of disk information for a certain node",
        async () => {
            nodeDiskInformationFindStub.returns([
                {
                    "freeSpace": "125",
                    "takenSpace": "50",
                    "nodeId": 5
                } as unknown as NodeDiskInformation,
                {
                    "freeSpace": "250",
                    "takenSpace": "100",
                    "nodeId": 5
                } as unknown as NodeDiskInformation,
            ]);
            try {
                const nodeDiskInfo = await nodeDiskInformationService.fetchDiskInfo(5, 'day');

                expect(nodeDiskInfo).to.exist;
                expect(nodeDiskInfo[0]).to.haveOwnProperty('freeSpace');
                expect(nodeDiskInfo[0]).to.haveOwnProperty('takenSpace');
                expect(nodeDiskInfo[0]).to.haveOwnProperty('nodeId');

            } catch (err) {
                logger.error(`Unexpected error occured: ${err.message}`);
                expect.fail(err);
            }
        });
});
