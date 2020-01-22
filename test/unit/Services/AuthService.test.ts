import {expect} from "chai";
import {createSandbox, SinonSandbox} from "sinon";
import {AuthService} from "../../../src/Services/AuthService";
import logger from "../../../src/Services/Logger";
import {NodeService} from "../../../src/Services/NodeService";
import sinon from "sinon";
import * as jwt from "jsonwebtoken";
import {ServiceError} from "../../../src/Services/ServiceError";
// import config from "../../../src/Config/Config";

describe("UserService", function () {

    let sandbox: SinonSandbox;
    let authService: AuthService;
    let userNodesStub: any;

    // eslint-disable-next-line
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc5NjM4MzIxLCJleHAiOjE1Nzk3MjQ3MjF9.RQHJPim2Qo8Ff80JlwqvBautNifSuQFSnjGvG6QmJ7w`;

    beforeEach(function () {
        sandbox = createSandbox();
        authService = new AuthService();
        userNodesStub = sinon.stub(NodeService, 'getAllNodes');
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        userNodesStub.restore();
    });

    it("should return all nodes for user", async () => {
        userNodesStub.returns([
            {
                "id": 300,
                "url": "url333",
                "token": "token33",
                "address": "address333",
                "createdAt": "2020-01-20T09:48:10.599Z",
                "updatedAt": "2020-01-20T09:48:10.599Z",
                "userId": 1
            }
        ]);
        try {
            const userNodes = await authService.authorizerUser(token);
            expect(userNodes).to.be.a('array');
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    })

    it("should fail to find nodes for user", async () => {
        userNodesStub.returns([]);
        try {
            await authService.authorizerUser(token);
        } catch (err) {
            expect(err).to.be.an.instanceof(ServiceError)
        }
    })
});
