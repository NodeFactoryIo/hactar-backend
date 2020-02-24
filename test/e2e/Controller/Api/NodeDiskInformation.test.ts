import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import logger from "../../../../src/Services/Logger";
import {app} from "../../index.test";
import database from "../../../../src/Services/Database";
import config from "../../../../src/Config/Config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {User} from "../../../../src/Models/User";
import {Node} from "../../../../src/Models/Node";
import {NodeDiskInformation} from "../../../../src/Models/NodeDiskInformation";

describe("Node disk information controller - fetch disk information test", async () => {

    before(async function () {
        const password = bcrypt.hashSync('password', 10);
        // eslint-disable-next-line no-console
        console.log("Before Authorization e2e test");
        // eslint-disable-next-line
        await User.create({id: 100, email: 'test@test.com', hash_password: `${password}`})
        await Node.create({
            id: 5,
            token: 'token111',
            url: 'url111',
            address: 'address111',
            userId: 100
        });
        await NodeDiskInformation.create({
            id: 10,
            freeSpace: 34254326,
            takenSpace: 234246234,
            nodeId: 5
        });
    });

    after(async () => {
        await database.sequelize.sync({force: true});
        // eslint-disable-next-line no-console
        console.log("After NodeDiskInformation e2e test")
    });

    it("Should return a filtered array (by month) of disk information for a certain node", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .get("/api/user/node/diskinformation/5?filter=month")
                .set('Authorization', token)
                .send({
                    params: {
                        nodeId: 5,
                    },
                    query: {
                        filter: 'month'
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

    it("Should fail with filter must be one of [day, week, month, year] error", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .get("/api/user/node/diskinformation/5?filter=quarter")
                .set('Authorization', token)
                .send({
                    params: {
                        nodeId: 5,
                    },
                    query: {
                        filter: 'quarter'
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
                                    "message": "\"filter\" must be one of [day, week, month, year]",
                                    "name": "filter"
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

    it("Should fail with filter is required error", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .get("/api/user/node/diskinformation/5")
                .set('Authorization', token)
                .send({
                    params: {
                        nodeId: 5,
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
                                    "message": "\"filter\" is required",
                                    "name": "filter"
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
