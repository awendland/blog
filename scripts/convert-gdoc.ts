import { parseArgs } from "https://deno.land/std@0.212.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.212.0/path/mod.ts";
import {NodeHtmlMarkdown} from 'npm:node-html-markdown@1.3.0'

// Take in a Google Docs HTML export and convert it to Markdown.
//
// Usage:
// 1. Open the Google Doc
// 2. File > Download > Web Page (.html, zipped)
// 3. Unzip the downloaded file
// 4. Run `deno run --allow-read --allow-write scripts/convert-gdocs-html-to-md.ts <doc.html>`
// 5. Review <doc.md> and make any necessary edits

const args = parseArgs(Deno.args)
if (args._.length !== 1) {
  console.error(`\
Expected exactly one argument, the path to the HTML file

Usage: deno run --allow-read --allow-write scripts/convert-gdocs-html-to-md.ts <doc.html>\
`)
  Deno.exit(1)
}
const htmlPath = String(args._[0])

try {
  const html = await Deno.readTextFile(htmlPath)
  const md = await NodeHtmlMarkdown.translate(html)
  const mdWithFrontmatter = `\
---
title: TBD
order: 1
lastmod: ${new Date().toISOString()}
visibility: public
---

${md}`
  const outputPath = path.join(path.dirname(htmlPath), path.basename(htmlPath, '.html') + '.md')
  await Deno.writeTextFile(outputPath, mdWithFrontmatter)
  console.log(`Wrote ${mdWithFrontmatter.split("\n").length} lines of md to ${outputPath}`)
} catch (error) {
  console.error(error)
}
