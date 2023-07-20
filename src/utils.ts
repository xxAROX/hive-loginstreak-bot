/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {join} from "node:path";

export const accountsFolder = (...paths) => join(__dirname, __dirname.includes("dist") ? "../" : "", ".accounts/", ...paths);
export function mt_rand(min: number, max: number) {
	if (!min) min = 0;
	if (!max) max = 2147483647;
	const _max = Math.max(min, max);
	const _min = Math.min(min, max);
	return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}