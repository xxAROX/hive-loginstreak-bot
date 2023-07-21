/*
 * Copyright (c) Jan Sohn / xxAROX
 * All rights reserved.
 * I don't want anyone to use my source code without permission.
 */

import {Logger, PrefixedLogger} from "./Logger";
import {existsSync, mkdirSync, readdirSync} from "node:fs";
import {scheduleJob} from "node-schedule";
import {createClient} from "bedrock-protocol";
import {Authflow} from "prismarine-auth";
import {accountsFolder, mt_rand} from "./utils";
import {cache_manager as authflow_cache_manager, options as authflow_options} from "./authflow_cache";

const CRON_HOUR = 4;
const CRON_MINUTES = 20;

console.clear();
// noinspection JSAnnotator
import Colors = require('colors.ts');

Colors.enable(true);


if (!existsSync(accountsFolder())) mkdirSync(accountsFolder(), {recursive: true});

const logger = new Logger("Loginstreak-helper", s=>s.hex("fc9803"));

async function run(): Promise<void>{
	const gamertags = readdirSync(accountsFolder());
	if (gamertags.length == 0) {
		logger.error("No account found!");
		logger.error("Please execute: '" + `npm run "add account"`.italic.yellow + "' in your command shell".red);
		process.exit(1);
		return;
	}
	const promises: Promise<void>[] = [];
	for (const gamertag of gamertags) {
		promises.push(new Promise(async resolve => {
			const client_logger = new PrefixedLogger(logger, gamertag);
			// @ts-ignore
			const client = await createClient({
				// @ts-ignore
				authflow: new Authflow(gamertag, authflow_cache_manager, authflow_options),
				username: gamertag,
				viewDistance: 1,
				connectTimeout: 10_000,
				skipPing: true,
				host: "fr.hivebedrock.network",
				port: 19132,
				offline: false,
			});
			client_logger.info("Connecting to The Hive");

			client.on("error", client_logger.error);
			client.on("spawn", () => {
				client_logger.success("Joined");
				setTimeout(() => {
					client.disconnect();
					client_logger.success("Left");
				}, 1000 *mt_rand(5, 15));
			});
		}));
	}
	if (promises.length > 0) await Promise.all(promises);
}
logger.info("Starting..");

if (process.argv[2] && process.argv[2].toLowerCase().includes("auto")) scheduleJob("hive-loginstreak-bot", `* ${CRON_MINUTES} ${CRON_HOUR} * * *`, fireDate => run());
else run();
