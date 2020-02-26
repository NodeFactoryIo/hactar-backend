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

describe("User controller - edit account", async () => {

    before(async function () {
        const password = bcrypt.hashSync('password', 10);
        // eslint-disable-next-line
        await User.create({id: 100, email: 'test@test.com', hash_password: `${password}`})
    });

    after(async () => {
        await database.sequelize.sync({force: true});
    });

    it("Should update user password", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .put("/api/user/account")
                .set('Authorization', token)
                .send({
                    email: 'new.email@test.com'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.not.exist;
                    expect(res.body).to.deep.include({
                        email: "new.email@test.com"
                    });
                    done();
                });

        } catch (err) {
            logger.error('Unexpected error occured: ${err.message}');
            expect.fail(err);
            done();
        }
    });

    it("Should fail with value must have at least 1 children error", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .put("/api/user/account")
                .set('Authorization', token)
                .send()
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.exist;
                    expect(res.body).to.deep.include({
                        "type": "body",
                        "errors": [
                            {
                                "message": "\"value\" must have at least 1 children"
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

    it("Should fail with email, password is not allowed to be empty", (done) => {
        const token = jwt.sign({id: 100}, config.jwtKey, {expiresIn: '24h'})

        try {
            request(app.server)
                .put("/api/user/account")
                .set('Authorization', token)
                .send({
                    email: "",
                    password: ""
                })
                .expect(200)
                .end((err, res) => {
                    expect(res).to.exist;
                    expect(err).to.exist;
                    expect(res.body).to.deep.include({
                        "type": "body",
                        "errors": [
                            {
                                "message": "\"email\" is not allowed to be empty",
                                "name": "email"
                            },
                            {
                                "message": "\"email\" must be a valid email",
                                "name": "email"
                            },
                            {
                                "message": "\"password\" is not allowed to be empty",
                                "name": "password"
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
