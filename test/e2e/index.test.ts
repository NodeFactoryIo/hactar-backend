import {after, before} from "mocha";
import {App} from "../../src/App";
import database from "../../src/Services/Database";
import logger from "../../src/Services/Logger";

export const app: App = new App();

before(async () => {
    logger.silent = true;
    await database.init();
    await app.start();
});

after(async () => {
    await app.stop();
    logger.silent = false;
});
