import {expect} from "chai";
import {createSandbox, SinonSandbox} from "sinon";
import {UserService} from "../../../src/Services/UserService";
import logger from "../../../src/Services/Logger";
import {User} from "../../../src/Models/User";
import sinon from "sinon";

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

    it("should be true provided email and password are valid", async () => {
        userFindStub.returns({
            email: 'example@example.com',
            // eslint-disable-next-line
            hash_password: '$2a$10$/cF6NuqvsX8/J7WbU1REEeO4xWafYrh6CmZiQkl0bij436fz/oRaS'
        })
        try {
            const authenticatedUser = await userService.isAuthenticatedUser(
                'example@example.com',
                'super secret password'
            );
            expect(authenticatedUser).to.be.equal(true);
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    })

    it("should be false if provided email and password are not valid", async () => {
        userFindStub.returns(null);
        try {
            const authenticatedUser = await userService.isAuthenticatedUser(
                'example@example.com',
                'super secret password'
            );
            expect(authenticatedUser).to.be.equal(false);
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    })
});
