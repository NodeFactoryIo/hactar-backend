import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import logger from "../../../src/Services/Logger";
import {app} from "../index.test";
import * as jwt from "jsonwebtoken";
import config from "../../../src/Config/Config";

describe("Authorization middleware tests", async () => {

    it("Should return unauthorized user - user not the owner of the node", () => {
        const token = jwt.sign({id: 777}, config.jwtKey, {expiresIn: '1h'})

        try {
            request(app.server)
                .post("/api/user/node/diskinformation")
                .set('Authorization', token)
                .send({
                    "freeSpace": "430",
                    "takenSpace": "270",
                    "url": "url111",
                    "address": "address111"
                })
                .expect(403)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });

    it("Should return unauthorized user - token expired", () => {
        const token = jwt.sign({id: 200}, config.jwtKey, {expiresIn: '0s'})

        try {
            request(app.server)
                .post("/api/user/node/diskinformation")
                .set('Authorization', token)
                .send({
                    "freeSpace": "430",
                    "takenSpace": "270",
                    "url": "url111",
                    "address": "address111"
                })
                .expect(403)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });

    it("Should successfully authorize user.", () => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .post("/api/user/node/diskinformation")
                .set('Authorization', token)
                .send({
                    "freeSpace": "430",
                    "takenSpace": "270",
                    "url": "url111",
                    "address": "address111"
                })
                .expect(201)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });
});
