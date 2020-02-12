import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import logger from "../../../../src/Services/Logger";
import {app} from "../../index.test";
import * as jwt from "jsonwebtoken";
import config from "../../../../src/Config/Config";
import {Node} from "../../../../src/Models/Node";

describe("Node controller add additional node info tests", async () => {

    before(async function () {
        await Node.create({
            url: 'some url',
            token: 'some token',
            address: 'some address',
            userId: 100
        });
    })

    it("Should add name and description to the node", () => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '1h'})

        try {
            request(app.server)
                .put("/api/user/node")
                .set('Authorization', token)
                .send({
                    nodeInfo: {
                        url: 'some url',
                        address: 'some address'
                    },
                    name: 'node name',
                    description: 'node description'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                    expect(res.body).to.deep.include(
                        {
                            name: 'node name',
                            description: 'node description'
                        });
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });

    it("Should update name and description of the node", () => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '1h'})

        try {
            request(app.server)
                .put("/api/user/node")
                .set('Authorization', token)
                .send({
                    nodeInfo: {
                        url: 'some url',
                        address: 'some address'
                    },
                    name: 'updated node name',
                    description: 'updated node description'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                    expect(res.body).to.deep.include(
                        {
                            name: 'updated node name',
                            description: 'updated node description'
                        });
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
        }
    });
});
