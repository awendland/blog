#!/usr/bin/env node
/*
 * __filename.mjs [sitemap.xml]
 *
 * Output: a newline separated list of page URLs
 *
 * Use this to easily diff two sitemaps to understand what's
 * been added/removed/changed/etc. to make sure that URLs are
 * stable.
 */
import { readFileSync } from "fs";

const sitemapPath = process.argv[3] || "public/sitemap.xml";

const urls = readFileSync(sitemapPath, "utf8")
  .split("\n")
  .map((l) => l.match(/<loc>(.+?)<\/loc>/))
  .filter((match) => !!match)
  .map((match) => match[1]);

process.stdout.write(urls.join("\n"));
