/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {generateKeyPairSync, randomUUID} from "node:crypto";
import {existsSync, readFileSync, renameSync, rmSync} from "node:fs";
import {Authflow} from "prismarine-auth";
import {accountsFolder} from "./utils";
import {decode as jwt_decode} from "jsonwebtoken";
import {cache_manager as authflow_cache_manager, options as authflow_options} from "./authflow_cache";

async function run() {
	// @ts-ignore
	const keypair = generateKeyPairSync('ec', { namedCurve: "secp384r1" }).toString('base64');
	const cacheKey = randomUUID();
	if (existsSync(accountsFolder(cacheKey))) rmSync(accountsFolder(cacheKey), {recursive:true,force:true});
	// @ts-ignore
	await (new Authflow(cacheKey, authflow_cache_manager, authflow_options).getMinecraftBedrockToken(keypair as any));
	const gamertag = jwt_decode(JSON.parse(readFileSync(accountsFolder(cacheKey, "bed-cache.json")).toString())['mca']['chain'][1])["extraData"]["displayName"];
	if (gamertag) renameSync(accountsFolder(cacheKey), accountsFolder(gamertag));
	process.exit(0);
}
run();