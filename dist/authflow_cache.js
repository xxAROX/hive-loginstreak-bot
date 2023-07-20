"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.cache_manager = void 0;
const FileCache_js_1 = __importDefault(require("prismarine-auth/src/common/cache/FileCache.js"));
const node_fs_1 = require("node:fs");
const utils_1 = require("./utils");
const prismarine_auth_1 = require("prismarine-auth");
const cache_manager = ({ username, cacheName }) => {
    if (!(0, node_fs_1.existsSync)((0, utils_1.accountsFolder)(username)))
        (0, node_fs_1.mkdirSync)((0, utils_1.accountsFolder)(username), { recursive: true });
    return new FileCache_js_1.default((0, utils_1.accountsFolder)(username, `${cacheName}-cache.json`));
};
exports.cache_manager = cache_manager;
exports.options = {
    authTitle: prismarine_auth_1.Titles.MinecraftNintendoSwitch,
    deviceType: 'Nintendo',
    flow: 'live'
};
