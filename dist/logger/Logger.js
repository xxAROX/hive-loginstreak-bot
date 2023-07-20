"use strict";
/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixedLogger = exports.Logger = void 0;
// noinspection JSAnnotator
const Colors = require("colors.ts");
Colors.enable(true);
const date_fns_1 = require("date-fns");
const node_fs_1 = require("node:fs");
class Logger {
    constructor(prefix = "", prefix_color = prefix => prefix.white) {
        this.format = "do LLL, hh:mm\0aaa";
        this.prefix_color = prefix => prefix.white;
        this.prefix = prefix;
        this.prefix_color = prefix_color;
    }
    log(message, level = "NULL", color = s => s.white) {
        const longest = Object.values(Logger.LEVELS).sort((a, b) => b.length - a.length)[0];
        const spaces = " ".repeat(Math.max(0, longest.length - level.length));
        let timestamp = `${("[".gray(12))}${(0, date_fns_1.format)(new Date(Date.now()), this.format)}${("]".gray(12))}`.blue;
        console.log(`${timestamp} ${color(color(level) + spaces)}  ${">".gray(18)} ${this.getPrefix()} ${(color(message))}`);
    }
    getPrefix() { return ""; }
    info(message) {
        this.log(message, Logger.LEVELS.info);
    }
    error(message) {
        this.log((message instanceof Error ? message.message || message.stack : message), Logger.LEVELS.error, s => s.red);
    }
    success(message) {
        this.log(message, Logger.LEVELS.success, s => s.green);
    }
    warn(message) {
        this.log(message, Logger.LEVELS.warn, s => s.yellow);
    }
    debug(message) {
        if (Logger.debug)
            this.log(message, Logger.LEVELS.debug, s => s.magenta);
    }
}
exports.Logger = Logger;
Logger.debug = (0, node_fs_1.existsSync)("debug") && ["y", "yes", "true", "1"].includes((0, node_fs_1.readFileSync)("debug").toString().trim().toLowerCase());
Logger.LEVELS = {
    info: "ℹ  INFO",
    error: "✗  ERROR",
    success: "✔  SUCCESS",
    warn: "❗  WARNING",
    debug: "▶  DEBUG",
};
class PrefixedLogger extends Logger {
    constructor(parent, prefix) {
        super(("[".gray(12)) + prefix + ("]".gray(12)));
        this.parent = parent;
    }
    getPrefix() {
        return `${this.parent instanceof PrefixedLogger ? this.parent.getPrefix() : ""}${this.prefix}`;
    }
    setPrefix(prefix) {
        this.prefix = prefix;
    }
}
exports.PrefixedLogger = PrefixedLogger;
