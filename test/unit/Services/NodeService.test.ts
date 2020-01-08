import {NodeService} from "../../../src/Services/NodeService";
import {createSandbox, SinonSandbox} from "sinon";

describe("NodeService", function () {

    let _sandbox: SinonSandbox;
    let _nodeService: NodeService;

    beforeEach(function () {
        _sandbox = createSandbox();
    });

});
