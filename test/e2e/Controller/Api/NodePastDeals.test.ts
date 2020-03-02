import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import logger from "../../../../src/Services/Logger";
import {app} from "../../index.test";
import database from "../../../../src/Services/Database";
import config from "../../../../src/Config/Config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {UserModel} from "../../../../src/Models/UserModel";
import {Node} from "../../../../src/Models/Node";
import {NodePastDealModel} from "../../../../src/Models/NodePastDealModel";

describe("Node past deals controller - fetch past deals test", async () => {

    before(async function () {
        const password = bcrypt.hashSync('password', 10);
        // eslint-disable-next-line
        await UserModel.create({id: 100, email: 'test@test.com', hash_password: `${password}`})
        await Node.create({
            id: 100,
            token: 'token111',
            url: 'url111',
            address: 'address111',
            userId: 100
        });
        await NodePastDealModel.create({
            "id": 1,
            "cid": "cid1",
            "state": 5,
            "size": "9734204",
            "provider": "tj0f01",
            "price": "100000",
            "duration": 1000,
            "nodeId": 100,
        });
    });

    after(async () => {
        await database.sequelize.sync({force: true});
    });

    it("Should return an paginated array of past deals for a certain node ordered by updatedAt asc", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .get("/api/user/node/pastdeals/1?from=0&to=10&orderBy=asc")
                .set('Authorization', token)
                .send({
                    params: {
                        nodeId: 1,
                    },
                    query: {
                        from: 0,
                        to: 10,
                        orderBy: 'asc'
                    }
                })
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                    expect(res.body).to.be.a('array').that.is.not.empty;
                    done();
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done();
        }
    });

    it("Should fail with from and to is required error", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .get("/api/user/node/pastdeals/1?orderBy=asc")
                .set('Authorization', token)
                .send({
                    params: {
                        nodeId: 1,
                    },
                    query: {
                        orderBy: 'asc'
                    }
                })
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.exist;
                    expect(res.body).to.deep.include(
                        {
                            type: "query",
                            "errors": [
                                {
                                    "message": "\"from\" is required",
                                    "name": "from"
                                },
                                {
                                    "message": "\"to\" is required",
                                    "name": "to"
                                }
                            ]
                        });
                    done();
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done();
        }
    });

    it("Should fail with orderBy is required error", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .get("/api/user/node/pastdeals/1?from=0&to=3")
                .set('Authorization', token)
                .send({
                    params: {
                        nodeId: 1,
                    },
                    query: {
                        orderBy: 'asc'
                    }
                })
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.exist;
                    expect(res.body).to.deep.include(
                        {
                            type: "query",
                            "errors": [
                                {
                                    "message": "\"orderBy\" is required",
                                    "name": "orderBy"
                                }
                            ]
                        });
                    done();
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done();
        }
    });
});
