import sinon from "sinon";
import {expect} from "chai";
import {createSandbox, SinonSandbox} from "sinon";
import logger from "../../../src/Services/Logger";
import * as jwt from "jsonwebtoken";
import config from "../../../src/Config/Config";
import {JwtPayload} from "../../../src/Types/JwtPayloadType";

describe("Authorization middleware", function () {

    let sandbox: SinonSandbox;
    let authStub: any;

    // eslint-disable-next-line
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJpYXQiOjE1Nzk3MDAxMTUsImV4cCI6MTU3OTc4NjUxNX0.Hd2RnG1KYfd-7c2ozNlZvzY0V2vVROT6CLWwrhGvXs4';

    beforeEach(function () {
        sandbox = createSandbox();
        authStub = sinon.stub(jwt, "verify");
    });

    afterEach(function () {
        sandbox.restore();
        logger.silent = false;
        authStub.restore();
    });

    it("should successfully authorize user", async () => {
        authStub.returns({
            id: 100,
            iat: 1579788404,
            exp: 1579874804
        })
        try {
            const authorizedUser = await jwt.verify(token, config.jwtKey) as JwtPayload;
            expect(authorizedUser).to.haveOwnProperty('id');
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });

    it("should fail to authorize an user without token", async () => {
        try {
            await jwt.verify('', 'wrong secret') as JwtPayload;
        } catch (err) {
            expect(err.message).to.be.equal('jwt must be provided');
        }
    });

    it("should fail to authorize an user without valid token", async () => {
        try {
            await jwt.verify('123token456', config.jwtKey) as JwtPayload;
        } catch (err) {
            expect(err.message).to.be.equal('jwt malformed');
        }
    });
});
