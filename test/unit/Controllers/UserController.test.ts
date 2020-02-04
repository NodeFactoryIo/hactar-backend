import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {UserService} from "../../../src/Services/UserService";
import {UserController} from "../../../src/Controller/Api/UserController";
import logger from "../../../src/Services/Logger";

describe("UserController", function () {

    const userServiceStub = sinon.createStubInstance(UserService);

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
});
