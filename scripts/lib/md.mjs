export const mapLines = (fn) => (md) => md.split('\n').map(fn).join('\n')

export const downLevelHeading = (n = 1) =>
  mapLines((line) => {
    const heading = line.match(/^(#+) /)
    if (!heading) return line
    return '#'.repeat(n) + line
  })

export const stripTags = mapLines((line) => {
  if (line.match(/^#[^#]/)) return ''
  return line
})

export const withFrontmatter = (frontmatter) => (md) =>
  `\
---
${Object.entries(frontmatter)
  .map(([k, v]) => `${k}: ${v}`)
  .join('\n')}
---
${md}`
