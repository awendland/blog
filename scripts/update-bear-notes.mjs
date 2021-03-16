#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import AdmZip from 'adm-zip'
import R from 'rambdax'
import * as libBear from './lib/bear.mjs'
import * as libmd from './lib/md.mjs'
import { __repo } from './lib/repo.mjs'

const argv = yargs(process.argv.slice(2)).command(
  '$0 <bearbkPath>',
  false,
  (yargs) => {
    yargs
      .positional('bearbkPath', {
        demandOption: true,
        type: 'string',
        desc: 'Path to the *.bearbk file',
      })
      .check((argv) => fs.statSync(argv.bearbkPath))
      .option('outputDir', {
        type: 'string',
        desc:
          'Path to directory where generated markdown files should be written',
        default: path.join(__repo, 'content', 'notes'),
      })
      .option('logBundles', {
        type: 'boolean',
        desc: 'If true, log all bundles to stderr for debugging',
        default: false,
      })
  }
).argv

const bearbkArchive = new AdmZip(argv.bearbkPath)

if (argv.logBundles)
  process.stderr.write(
    bearbkArchive
      .getEntries()
      .map((e) => e.entryName)
      .join('\n')
  )

// prepare Developer Resources
const devResourcesMarkdown = R.piped(
  bearbkArchive.getEntries(),
  (entries) => entries.filter(libBear.onlyEntriesNamed(/Developer Resources/)),
  (entries) => entries.reduce(libBear.loadBundles, new Map()),
  libBear.onlyActiveBundles,
  libBear.concatBundleText([
    'Developer Resources Learning + References.textbundle',
    'Developer Resources Tools 2.textbundle',
    'Developer Resources Libraries + Frameworks + Packages.textbundle',
  ]),
  libmd.downLevelHeading(),
  libmd.stripTags,
  libmd.mapLines((line) =>
    line.match(/## /) ? line.replace('Developer Resources: ', '') : line
  ),
  (md) => `\
<!-- markdownlint-disable MD034 -->
${md}`,
  libmd.withFrontmatter({
    layout: 'note',
    title: 'Developer Resources 💻',
    order: 4,
    modifiedTime: new Date().toISOString(),
    visibility: 'public',
  })
)
const devNotePath = path.join(argv.outputDir, 'notes-dev-resources.md')
fs.mkdirSync(path.dirname(devNotePath), { recursive: true })
fs.writeFileSync(devNotePath, devResourcesMarkdown)
console.log(`Wrote Developer Resources notes to: ${devNotePath}`)
