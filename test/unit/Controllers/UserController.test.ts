import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {UserService} from "../../../src/Services/UserService";
import {NodeService} from "../../../src/Services/NodeService";
import {UserController} from "../../../src/Controller/Api/UserController";
import logger from "../../../src/Services/Logger";
import {Node} from "../../../src/Models/Node";

describe("UserController", function () {

    const userServiceStub = sinon.createStubInstance(UserService);
    const nodeServiceStub = sinon.createStubInstance(NodeService);

    const userController = new UserController(
        userServiceStub as unknown as UserService);

    const response = {} as Response;

    describe('POST /user/register', () => {

        // @ts-ignore
        userServiceStub.registerUser.resolves({email: 'example@example.com', password: 'super secret password'});

        it('should add new user to the database', async function () {
            try {
                response.json = sinon.spy((result) =>
                    expect(result.password).to.be.equal('super secret password')) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await userController.registerUser({
                    body: {
                        email: 'example@example.com',
                        password: 'super secret password'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occurred: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('POST /user/login', () => {
        // @ts-ignore
        userServiceStub.authenticateUser.resolves({"token": "test token"});

        it('should return JWT on existing valid email and password input', async function () {
            try {
                response.json = sinon.spy((result) =>
                    expect(result).to.have.property('token')) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await userController.loginUser({
                    body: {
                        email: 'example@example.com',
                        password: 'secret password'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occurred: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('POST /user/daemon/login', () => {
        // @ts-ignore
        userServiceStub.authenticateUserDaemonApp.resolves({"token": "test token"});

        it('should return JWT on existing valid email and password input', async function () {
            try {
                response.json = sinon.spy((result) =>
                    expect(result).to.have.property('token')) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await userController.loginUserDaemonApp({
                    body: {
                        email: 'example@example.com',
                        password: 'secret password'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occurred: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('GET /node/user', () => {
        nodeServiceStub.getAllNodes.resolves([
            {
                "url": "url111",
                "token": "token111",
                "address": "address111",
            } as unknown as Node,
            {
                "url": "url222",
                "token": "token222",
                "address": "address222",
            } as unknown as Node
        ]);
    });
});
