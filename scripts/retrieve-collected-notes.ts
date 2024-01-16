import * as path from 'https://deno.land/std@0.212.0/path/mod.ts'

const COLLECTED_NOTES_JSON_URL = 'https://collectednotes.com/awendland.json'
const COLLECTED_NOTES_OUTPUT_DIR =
  path.dirname(path.fromFileUrl(import.meta.url)) +
  '/../content/collected-notes'

try {
  Deno.mkdirSync(COLLECTED_NOTES_OUTPUT_DIR, { recursive: true })

  const response = await fetch(COLLECTED_NOTES_JSON_URL)
  const collectedNotes = await response.json()

  await Promise.all(
    collectedNotes.notes.map(async (note) => {
      const slug = `${note.created_at.substr(0, 10)}-${note.path}`
      const noteMd = `\
${JSON.stringify({
  date: note.created_at,
  layout: 'post',
  title: note.title,
  featureimg: undefined,
  originalUrl: note.url,
  visibility: note.visibility,
}, null, 2)}
${note.body.replace(/^\s*# .+\n/, '') /* remove title/header from body */}
`

      await Deno.writeTextFile(
        COLLECTED_NOTES_OUTPUT_DIR + '/' + slug + '.md',
        noteMd
      )
      console.log('Wrote ' + slug + '.md')
    })
  )
} catch (error) {
  console.error(error)
}
