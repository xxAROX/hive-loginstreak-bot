/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import FileCache from "prismarine-auth/src/common/cache/FileCache.js";
import {existsSync, mkdirSync} from "node:fs";
import {accountsFolder} from "./utils";
import {MicrosoftAuthFlowOptions, Titles} from "prismarine-auth";

export const cache_manager = ({ username, cacheName }) => {
	if (!existsSync(accountsFolder(username))) mkdirSync(accountsFolder(username), {recursive:true});
	return new FileCache(accountsFolder(username, `${cacheName}-cache.json`));
};

export const options: MicrosoftAuthFlowOptions = {
	authTitle: Titles.MinecraftNintendoSwitch,
	deviceType: 'Nintendo',
	flow: 'live'
} as MicrosoftAuthFlowOptions;