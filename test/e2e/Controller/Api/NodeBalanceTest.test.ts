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
import {NodeBalance} from "../../../../src/Models/NodeBalance";

describe("Node balance controller - fetch node balance test", async () => {

    before(async function () {
        const password = bcrypt.hashSync('password', 10);
        // eslint-disable-next-line
        await UserModel.create({id: 100, email: 'test@test.com', hash_password: `${password}`})
        await Node.create({
            id: 5,
            token: 'token111',
            url: 'url111',
            address: 'address111',
            userId: 100
        });
        await NodeBalance.create({
            id: 10,
            balance: 43543727524,
            nodeId: 5
        });
        await NodeBalance.create({
            id: 11,
            balance: 857386456,
            nodeId: 5
        });
    });

    after(async () => {
        await database.sequelize.sync({force: true});
    });

    it("Should return node balance with changes in th elast 24 hours", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .get("/api/user/node/balance/5")
                .set('Authorization', token)
                .send({
                    params: {
                        nodeId: 5,
                    }
                })
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                    expect(res.body).to.haveOwnProperty('currentBalance');
                    expect(res.body).to.haveOwnProperty('updatedAt');
                    expect(res.body).to.haveOwnProperty('balanceChange');
                    expect(res.body).to.haveOwnProperty('balanceChangePerc');
                    done();
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done();
        }
    });
});
