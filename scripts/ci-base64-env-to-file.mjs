#!/usr/bin/env node
/*
 * __filename.mjs <envKey> <filePath>
 *
 * 1. Load an environment variable named <envKey>
 * 2. Decode it using base64
 * 3. Write the decoded value to <filePath>
 */
import { writeFileSync } from "fs";

const [envKey, filePath] = process.argv.slice(2);
if (!envKey) {
  throw new Error(`Missing 1st arg = name of the environment variable`);
}
if (!filePath) {
  throw new Error(`Missing 2nd arg = path to write decoded base64 data`);
}

const envVal = process.env[envKey];
if (!envVal) {
  console.error(`Unable to find ${envKey} in the environment:`, process.env);
  process.exit(1);
}

writeFileSync(filePath, Buffer.from(envVal, "base64"));
