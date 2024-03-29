import { parseArgs } from "https://deno.land/std@0.212.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.212.0/path/mod.ts";

// Retrieve notes from collectednotes.com and save them as markdown files.
//
// Pass --preview-data to print out the data retrieved from collectednotes.com, but not write any files.

const COLLECTED_NOTES_JSON_URL = "https://collectednotes.com/awendland.json";
const COLLECTED_NOTES_OUTPUT_DIR =
  path.dirname(path.fromFileUrl(import.meta.url)) +
  "/../content/collected-notes";

const args = parseArgs(Deno.args);

try {
  Deno.mkdirSync(COLLECTED_NOTES_OUTPUT_DIR, { recursive: true });

  const response = await fetch(COLLECTED_NOTES_JSON_URL);
  const collectedNotes = await response.json();

  if (args["preview-data"]) {
    console.log(collectedNotes);
    Deno.exit(0);
  }

  await Promise.all(
    // deno-lint-ignore no-explicit-any
    collectedNotes.notes.map(async (note: any) => {
      const slug = `${note.created_at.substr(0, 10)}-${note.path}`;
      const noteMd = `\
${
        JSON.stringify(
          {
            title: note.title,
            date: note.created_at,
            lastmod: note.updated_at,
            layout: "post",
            featureimg: undefined,
            originalUrl: note.url,
            visibility: note.visibility,
          },
          null,
          2,
        )
      }
${note.body.replace(/^\s*# .+\n/, "") /* remove title/header from body */}
`;

      await Deno.writeTextFile(
        COLLECTED_NOTES_OUTPUT_DIR + "/" + slug + ".md",
        noteMd,
      );
      console.log("Wrote " + slug + ".md");
    }),
  );
} catch (error) {
  console.error(error);
}
