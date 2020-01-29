import sinon from "sinon";
import {expect} from "chai";
import logger from "../../../src/Services/Logger";
import * as jwt from "jsonwebtoken";
import config from "../../../src/Config/Config";
import {Request, Response} from "express";
import {AuthorizeUser} from "../../../src/Middleware/Authorization";
// import {NodeService} from "../../../src/Services/NodeService";
// import {Node} from "../../../src/Models/Node";

describe("Authorization middleware", function () {

    it("should successfully authorize user", async () => {
        const token = jwt.sign({id: 200}, config.jwtKey);
        // const nodeServiceStub = sinon.createStubInstance(NodeService);
        // nodeServiceStub.getNodeByPk.resolves(null);

        try {

            const response = {} as Response;
            response.locals = {
                node: {
                    id: 400,
                    url: "url11",
                    token: "token111",
                    address: "address111",
                    userId: 200
                }
            }
            // response.locals = {userId: 200}
            response.json = sinon.spy((result) => {
                if (result) {
                    expect(result).to.be.equal(200)
                    return response;
                }
            }) as any;

            response.status = sinon.spy((result) => {
                if (result) {
                    expect(result).to.equal(200)
                    return response;
                }
            }) as any;
            const next = sinon.stub();

            await AuthorizeUser({
                headers: {
                    // eslint-disable-next-line
                    authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAwLCJpYXQiOjE1ODAzMTIxNjUsImV4cCI6MTU4MDM5ODU2NX0.eWd_tH3pNaNXDQw8UPsQ_VjP-x4-JOm7vTCCqFRy9HQ`
                },
                body: {
                    url: 'url111',
                    address: 'address111'
                }
            } as Request, response, next);
        } catch (err) {
            console.log(err)
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });

    it("should fail to authorize user with expired token", async () => {
        const token = jwt.sign({id: 200}, config.jwtKey, {expiresIn: '0s'})

        try {
            const response = {} as Response;
            response.json = sinon.spy((result) => {
                if (result) {
                    expect(result).to.have.property('error')
                    return response;
                }
            }) as any;

            response.status = sinon.spy((result) => {
                if (result) {
                    expect(result).to.equal(403)
                    return response;
                }
            }) as any;

            const next = sinon.stub();
            await AuthorizeUser({
                headers: {
                    authorization: token
                },
                body: {
                    url: 'url111',
                    address: 'address111'
                }
            } as Request, response, next);
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });

    it("should fail to authorize user which is not owner of the node", async () => {
        try {
            const token = jwt.sign({id: 300}, config.jwtKey, {expiresIn: '24h'})

            const response = {} as Response;
            response.json = sinon.spy((result) => {
                if (result) {
                    expect(result).to.have.property('error')
                    return response;
                }
            }) as any;

            response.status = sinon.spy((result) => {
                if (result) {
                    expect(result).to.equal(403)
                    return response;
                }
            }) as any;

            const next = sinon.stub();
            await AuthorizeUser({
                headers: {
                    authorization: token
                },
                body: {
                    url: 'url111',
                    address: 'address111',
                    userId: 200
                }
            } as Request, response, next);
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });
});
