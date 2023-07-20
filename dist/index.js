"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
const node_fs_1 = require("node:fs");
const bedrock_protocol_1 = require("bedrock-protocol");
const prismarine_auth_1 = require("prismarine-auth");
const utils_1 = require("./utils");
const authflow_cache_1 = require("./authflow_cache");
console.clear();
// noinspection JSAnnotator
const Colors = require("colors.ts");
Colors.enable(true);
if (!(0, node_fs_1.existsSync)((0, utils_1.accountsFolder)()))
    (0, node_fs_1.mkdirSync)((0, utils_1.accountsFolder)(), { recursive: true });
const logger = new Logger_1.Logger("Loginstreak-helper", s => s.hex("fc9803"));
async function run() {
    const gamertag = (0, node_fs_1.readdirSync)((0, utils_1.accountsFolder)())[0];
    if (!gamertag) {
        logger.error("No account found!");
        logger.error("Please execute: '" + `npm run "add account"`.italic.yellow + "' in your command shell".red);
        process.exit(1);
    }
    logger.info("Creating client");
    // @ts-ignore
    const client = await (0, bedrock_protocol_1.createClient)({
        // @ts-ignore
        authflow: new prismarine_auth_1.Authflow(gamertag, authflow_cache_1.cache_manager, authflow_cache_1.options),
        username: gamertag,
        viewDistance: 1,
        connectTimeout: 10000,
        skipPing: true,
        host: "fr.hivebedrock.network",
        port: 19132,
        offline: false,
    });
    logger.info("Connecting to The Hive");
    client.on("error", logger.error);
    client.on("spawn", () => {
        logger.success("Joined The Hive");
        setTimeout(() => {
            client.disconnect();
            logger.success("Left The Hive");
        }, 1000 * (0, utils_1.mt_rand)(5, 15));
    });
}
logger.info("Starting..");
run();
