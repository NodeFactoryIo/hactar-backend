import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import logger from "../../../src/Services/Logger";
import {app} from "../index.test";
import * as jwt from "jsonwebtoken";
import config from "../../../src/Config/Config";
import {Node} from "../../../src/Models/Node";
import {User} from "../../../src/Models/User";
import * as bcrypt from "bcryptjs";
import database from "../../../src/Services/Database";

describe("Authorization middleware tests", async () => {

    before(async () => {
        const password = bcrypt.hashSync('password', 10);
        // eslint-disable-next-line no-console
        console.log("Before Authorization e2e test")
        // eslint-disable-next-line
        await User.create({id: 100, email: 'test@test.com', hash_password: `${password}`})
        await Node.create({
            id: 1,
            url: 'url111',
            token: 'token111',
            address: 'address111',
            userId: 100
        });
    });

    after(async () => {
        await database.sequelize.sync({force: true});
        // eslint-disable-next-line no-console
        console.log("After Authorization e2e test")
    });

    it("Should return unauthorized user - user not the owner of the node", (done) => {
        const token = jwt.sign({id: 200}, config.jwtKey, {expiresIn: '1h'})
        try {
            request(app.server)
                .post("/api/user/node/diskinformation")
                .set('Authorization', token)
                .send({
                    "freeSpace": "430",
                    "takenSpace": "270",
                    "nodeInfo": {
                        "url": "url111",
                        "address": "address111"
                    }
                })
                .expect(403)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                    done()
                });
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done()
        }
    });

    it("Should return unauthorized user - token expired", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '0s'})
        try {
            request(app.server)
                .post("/api/user/node/diskinformation")
                .set('Authorization', token)
                .send({
                    "freeSpace": "430",
                    "takenSpace": "270",
                    "nodeInfo": {
                        "url": "url111",
                        "address": "address111"
                    }
                })
                .expect(403)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                    done()
                });
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done()
        }
    });

    it("Should successfully authorize user.", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})
        try {
            request(app.server)
                .post("/api/user/node/diskinformation")
                .set('Authorization', token)
                .send({
                    "freeSpace": "430",
                    "takenSpace": "270",
                    "nodeInfo": {
                        "url": "url111",
                        "address": "address111"
                    }
                })
                .expect(201)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                    done()
                });
        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done()
        }
    });
});
