import {after, before} from "mocha";
import {App} from "../../src/App";
import database from "../../src/Services/Database";
import logger from "../../src/Services/Logger";

export const app: App = new App();

before(async function () {
    this.timeout(10000);
    logger.silent = true;
    await database.init();
    await app.start();
    await database.sequelize.sync({force: true});
    // eslint-disable-next-line no-console
    console.log("DB initi before test suit finished")
});

after(async function () {
    this.timeout(10000);
    await app.stop();
    logger.silent = false;
});
