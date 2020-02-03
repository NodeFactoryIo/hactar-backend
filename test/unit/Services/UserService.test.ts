import {expect} from "chai";
import {createSandbox, SinonSandbox} from "sinon";
import {UserService} from "../../../src/Services/UserService";
import logger from "../../../src/Services/Logger";
import {User} from "../../../src/Models/User";
import sinon from "sinon";
import * as jwt from "jsonwebtoken";
// import {ServiceError} from "../../../src/Services/ServiceError";

describe("UserService", function () {

    let sandbox: SinonSandbox;
    let userService: UserService;
    let userFindStub: any;

    beforeEach(function () {
        sandbox = createSandbox();
        userService = new UserService();
        userFindStub = sinon.stub(User, "findOne");
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        userFindStub.restore();
    });

    it("should successfully authenticate user", async () => {
        userFindStub.returns({
            id: 123,
            email: 'example@example.com',
            // eslint-disable-next-line
            hash_password: '$2a$10$/cF6NuqvsX8/J7WbU1REEeO4xWafYrh6CmZiQkl0bij436fz/oRaS'
        });
        try {
            const authenticatedUser = await userService.authenticateUser(
                'example@example.com',
                'super secret password'
            );
            expect(authenticatedUser).to.haveOwnProperty('token');
            const token = jwt.decode(authenticatedUser.token, {complete: true});
            expect(token).not.to.be.null;
            expect(token).to.haveOwnProperty('payload');
            // @ts-ignore
            const payload = token.payload;
            expect(payload).not.to.be.null;
            // token with expiration date
            expect(payload).to.haveOwnProperty('iat');
            expect(payload).to.haveOwnProperty('exp');

        } catch (err) {
            logger.error(`Unexpected error occured: ${err.message}`);
            expect.fail(err);
        }
    });

    it("should successfully authenticate user daemon app", async () => {
        userFindStub.returns({
            id: 123,
            email: 'example@example.com',
            // eslint-disable-next-line
            hash_password: '$2a$10$/cF6NuqvsX8/J7WbU1REEeO4xWafYrh6CmZiQkl0bij436fz/oRaS'
        });
        try {
            const authenticatedUser = await userService.authenticateUserDaemonApp(
                'example@example.com',
                'super secret password'
            );
            expect(authenticatedUser).to.haveOwnProperty('token');
            const token = jwt.decode(authenticatedUser.token, {complete: true});
            expect(token).not.to.be.null;
            expect(token).to.haveOwnProperty('payload');
            // @ts-ignore
            const payload = token.payload;
            expect(payload).not.to.be.null;
            // token without expiration date
            expect(payload).to.haveOwnProperty('iat');
        } catch (err) {
            logger.error(`Unexpected error occured: ${err.message}`);
            expect.fail(err);
        }
    });

    it("should fail to authenticate user", async () => {
        userFindStub.returns(null);
        try {
            await userService.authenticateUser(
                'example123@example.com',
                'wrong password'
            );
        } catch (err) {
            expect(err.status).to.be.equal(404)
        }
    });

    it("should fail to authenticate user daemon app", async () => {
        userFindStub.returns(null);
        try {
            await userService.authenticateUserDaemonApp(
                'example123@example.com',
                'wrong password'
            );
        } catch (err) {
            expect(err.status).to.be.equal(404)
        }
    })
});
