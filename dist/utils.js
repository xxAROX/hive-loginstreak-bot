"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mt_rand = exports.accountsFolder = void 0;
const node_path_1 = require("node:path");
const accountsFolder = (...paths) => (0, node_path_1.join)(__dirname, __dirname.includes("dist") ? "../" : "", ".accounts/", ...paths);
exports.accountsFolder = accountsFolder;
function mt_rand(min, max) {
    if (!min)
        min = 0;
    if (!max)
        max = 2147483647;
    const _max = Math.max(min, max);
    const _min = Math.min(min, max);
    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}
exports.mt_rand = mt_rand;
