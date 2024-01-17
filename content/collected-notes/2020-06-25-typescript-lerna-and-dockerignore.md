{
  "title": "TypeScript, Lerna, and .dockerignore",
  "date": "2020-06-25T19:10:55.460Z",
  "lastmod": "2020-06-25T19:10:55.460Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/typescript-lerna-and-dockerignore",
  "visibility": "public"
}

This approach ignores everything by default and then whitelists what's permitted. Or at least it takes that approach for the top-level directory but has to explicitly restrict nested directories because [exception statements don't support wildcard directories](https://github.com/moby/moby/issues/30018).

```dockerignore
*
!package.json
!yarn.lock
!lerna.json
!tsconfig*
!packages/
packages/*/dist/
packages/*/node_modules/
packages/*/tests/
**/.DS_Store

# Can't do the following because exception statements don't support wildcard directories https://github.com/moby/moby/issues/30018 (and see other related issues at https://github.com/moby/moby/issues/40319)
# !packages/*/src
# !packages/*/tsconfig.json
# !packages/*/package.json

# Consider using an approach with a manual `tar` step like https://github.com/moby/moby/issues/12971#issuecomment-138134947
```
