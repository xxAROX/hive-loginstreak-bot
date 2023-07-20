"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const prismarine_auth_1 = require("prismarine-auth");
const utils_1 = require("./utils");
const jsonwebtoken_1 = require("jsonwebtoken");
const authflow_cache_1 = require("./authflow_cache");
async function run() {
    console.log((0, utils_1.accountsFolder)());
    // @ts-ignore
    const keypair = (0, node_crypto_1.generateKeyPairSync)('ec', { namedCurve: "secp384r1" }).toString('base64');
    const cacheKey = (0, node_crypto_1.randomUUID)();
    if ((0, node_fs_1.existsSync)((0, utils_1.accountsFolder)(cacheKey)))
        (0, node_fs_1.rmSync)((0, utils_1.accountsFolder)(cacheKey), { recursive: true, force: true });
    // @ts-ignore
    await (new prismarine_auth_1.Authflow(cacheKey, authflow_cache_1.cache_manager, authflow_cache_1.options).getMinecraftBedrockToken(keypair));
    const gamertag = (0, jsonwebtoken_1.decode)(JSON.parse((0, node_fs_1.readFileSync)((0, utils_1.accountsFolder)(cacheKey, "bed-cache.json")).toString())['mca']['chain'][1])["extraData"]["displayName"];
    if (gamertag)
        (0, node_fs_1.renameSync)((0, utils_1.accountsFolder)(cacheKey), (0, utils_1.accountsFolder)(gamertag));
    process.exit(0);
}
run();
