---
layout: post
title:  "npm Install Hook Scripts: In The Wild (Part 2)"
date:   2018-11-20 23:53:30-0500
featureimg: ""
---

[npm](https://docs.npmjs.com/about-npm/index.html) is the de-facto package manager for JavaScript code. Though initially intended for use with node.js, it's expanded to managing dependencies on the frontend as well. npm makes a developer's life substantially more convenient, but it provides that convenience at the cost of security. In particular, npm is happy to auto-execute package scripts upon install, thanks to various install script hooks.

---

NOTE: all of the issues with "why bother protecting the install scripts when the package already has arbitrary code getting executed by the node app anyway" disappears when we consider that npm is being used for frontend packages which are only run in the browser and therefore would only be able to perform malicious activity on the host through the install scripts.

Needed features:
- Compilation
- Connecting to the internet (whitelisted domains? in package or by consumer?)
- Reading/writing from/to the filesystem (whitelisted paths? in package or by consumer?)

Analysis:
- Use docker? to review all network requests + file IO made by npm packages' install scripts
  - Create modified npm binary that runs scripts using strace https://linux-audit.com/the-ultimate-strace-cheat-sheet/

Constraints:
- If can't impose significant constraints:
  - How to create a bouncer that users don't detect? ie only running extraction code on macOS, but not in linux OSs (which Docker envs would be)?
- Ideally, after running review, impose strict constraints.

