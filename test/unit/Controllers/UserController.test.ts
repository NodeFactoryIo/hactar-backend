import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {UserService} from "../../../src/Services/UserService";
import {AuthService} from "../../../src/Services/AuthService";
import {UserController} from "../../../src/Controller/Api/UserController";
import logger from "../../../src/Services/Logger";

describe("UserController", function () {

    const userServiceStub = sinon.createStubInstance(UserService);
    const authServiceStub = sinon.createStubInstance(AuthService);

    const userController = new UserController(
        userServiceStub as unknown as UserService,
        authServiceStub as unknown as AuthService);

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
                logger.error('Unexpected error occured: ${err.message}');
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
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('GET /node/user', () => {
        // @ts-ignore
        authServiceStub.authorizerUser.resolves([
            {
                "url": "url111",
                "token": "token111",
                "address": "address111",
            }
        ]);

        it('should return array of nodes belonging to the user', async function () {
            try {
                response.json = sinon.spy((result) =>
                    expect(result).to.be.an('Array')) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await userController.getAllUserNodes({
                    headers: {
                        "authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
                        eyJpZCI6MSwiaWF0IjoxNTc5NjE0MTgxLCJleHAiOjE1Nzk3MDA1ODF9.
                        7b334R6HLjlPuhnfZOzmoOROzlnAUm_ZBqu-XGA4YI`
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occured: ${err.message}');
                expect.fail(err);
            }
        });
    });
});
