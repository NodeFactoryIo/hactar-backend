import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import logger from "../../../../src/Services/Logger";
import {app} from "../../index.test";
import * as jwt from "jsonwebtoken";
import config from "../../../../src/Config/Config";
import {Node} from "../../../../src/Models/Node";
import * as bcrypt from "bcryptjs";
import {User} from "../../../../src/Models/User";

describe("Node controller add additional node info tests", async () => {

    before(async function () {
        const password = bcrypt.hashSync('password', 10);
        // eslint-disable-next-line
        await User.create({id: 200, email: 'test@test.com', hash_password: `${password}`})
        await Node.create({
            id: 2,
            url: 'some url',
            token: 'some token',
            address: 'some address',
            userId: 200
        });
    });

    after(async () => {
        await User.destroy({
            where: {
                id: 200
            }
        });

        await Node.destroy({
            where: {
                id: 2
            }
        })
    });

    it("Should add name and description to the node", (done) => {
        const token = jwt.sign({id: 200}, config.jwtKey, {expiresIn: '1h'})

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
                    done()
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done()
        }
    });
});
