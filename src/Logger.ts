/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */


// noinspection JSAnnotator
import Colors = require('colors.ts');

Colors.enable(true);
import {format} from "date-fns";
import {existsSync, readFileSync} from "node:fs";


class Logger {
	private format = "do LLL, hh:mm\0aaa";
	protected prefix: string;
	protected prefix_color: (string) => string = prefix => prefix.white;
	private static readonly debug = existsSync("debug") && ["y","yes","true","1"].includes(readFileSync("debug").toString().trim().toLowerCase());

	private static readonly LEVELS = {
		info: "ℹ  INFO",
		error: "✗  ERROR",
		success: "✔  SUCCESS",
		warn: "❗  WARNING",
		debug: "▶  DEBUG",
	}

	constructor(prefix: string = "", prefix_color: (string) => string = prefix => prefix.white) {
		this.prefix = prefix;
		this.prefix_color = prefix_color;
	}

	protected log(message: string, level: string = "NULL", color: (s:string) => string = s => s.white): void{
		const longest = Object.values(Logger.LEVELS).sort((a, b) => b.length - a.length)[0];
		const spaces = " ".repeat(Math.max(0, longest.length -level.length));
		let timestamp = `${("[".gray(12))}${format(new Date(Date.now()), this.format)}${("]".gray(12))}`.blue;
		console.log(`${timestamp} ${color(color(level) + spaces)}  ${">".gray(18)} ${this.getPrefix()} ${(color(message))}`);
	}
	public getPrefix(): string{return "";}

	public info(message: string) {
		this.log(message, Logger.LEVELS.info);
	}
	public error(message: string|Error) {
		this.log((message instanceof Error ? message.message || message.stack : message), Logger.LEVELS.error,s=>s.red);
	}
	public success(message: string) {
		this.log(message, Logger.LEVELS.success,s=>s.green);
	}
	public warn(message: string) {
		this.log(message, Logger.LEVELS.warn,s=>s.yellow);
	}
	public debug(message: string) {
		if (Logger.debug) this.log(message, Logger.LEVELS.debug, s=>s.magenta);
	}
}
class PrefixedLogger extends Logger{
	protected parent: Logger|PrefixedLogger;

	constructor(parent: Logger|PrefixedLogger, prefix: string) {
		super(("[".gray(12)) + prefix + ("]".gray(12)));
		this.parent = parent;
	}
	public getPrefix(): string{
		return `${this.parent instanceof PrefixedLogger ? this.parent.getPrefix() : ""}${this.prefix}`;
	}
	public setPrefix(prefix: string){
		this.prefix = prefix;
	}
}
export {Logger, PrefixedLogger};