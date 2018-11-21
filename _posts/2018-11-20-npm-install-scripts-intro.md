---
layout: post
title:  "npm Install Hook Scripts: Intro (Part 1)"
date:   2018-11-20 23:53:30-0500
featureimg: "posts/2018-11-20_npm_panic.jpg"
---

[npm](https://docs.npmjs.com/about-npm/index.html)[^fn0] is the de-facto package manager for JavaScript code. Though initially intended for use with node.js, it's expanded to managing dependencies on the frontend as well. npm makes a developer's life substantially more convenient, but it provides that convenience at the cost of security. In particular, npm is happy to auto-execute package scripts upon install, thanks to various install hook scripts.<!--break-->

---

## Rising Issues

Historically, the automatic execution of scripts during the install process made sense. The same user privileges that were being used to run `npm install` were being used to run the node application that leveraged those packages, so any malicious activity could have just as easily been in the package's JS files (ie executing upon `require('package')`), instead of needing to be triggered by the install hook scripts. However, this assumption is no longer the case in many situations. As npm is used to manage frontend dependencies this assumption breaks down. A user may execute `npm install` using their full privileged user account, but the actual JavaScript module in the package will never run outside of the browser's sandbox. Therefore, the only point at which a package could perform a malicious activity on the user's machine (such as exfiltrating data from their filesystem, writing arbitrary files, etc.) would be through one of these install hook scripts.

## In the Wild

In July of 2018, `eslint-escope` and `eslint-config-eslint` were modified of to include a postinstall hook script that located a user's `.npmrc` file and send that file to a remote website[^fn1]. The attacker used previously compromised credentials to publish these malicious versions of the package. Over the next two hours the compromised packages exfiltrated `.npmrc` files, and since the packages were dependencies of extremely popular packages, `babel-eslint`, it's likely they had a noticeable install population[^fn2].

```diff
{
+ "postinstall": "node ./lib/build.js",
}
```

## npm's Auto-Run Scripts, According To The Docs

npm details the various scripts that are executed automatically during the install process at [cli/doc/misc/npm-scripts#e2346e7/](https://github.com/npm/cli/blob/e2346e7702acccefe6d711168c2b0e0e272e194a/doc/misc/npm-scripts.md). I've reflected the relevant script hooks here that are executed during the install process:

> * preinstall:
>   Run BEFORE the package is installed
> * install, postinstall:
>   Run AFTER the package is installed.
> * preuninstall, uninstall:
>   Run BEFORE the package is uninstalled.
> * postuninstall:
>   Run AFTER the package is uninstalled.

_~~(Note to self: create a test package to verify these hooks)~~ Test package located at [awendland/npm-install-hook-test](https://github.com/awendland/npm-install-hook-test)._

Additionally, the docs provide a recommendation (emphasis mine):

> Don't use `install`. Use a `.gyp` file for compilation, and `prepublish` for anything else. You should almost never have to explicitly set a preinstall or install script. If you are doing this, please consider if there is another option. **The only valid use of `install` or `preinstall` scripts is for compilation which must be done on the target architecture**.

The last sentence explains why these hooks exist at all, instead of npm just autodetecting the need to handle `.gyp` files for compilation: npm is trying to be as flexible as possible.

## Demonstrations

To demonstrate what someone could do with these automated hooks, I've created a toy package at [awendland/npm-install-hook-test](https://github.com/awendland/npm-install-hook-test). If you clone the repo you can run `./run_demo.sh` to see what's going on (nothing evil will happen). Besides printing out the name of the hook being run at each of the install hook scripts, the package can do two other things:

1. POST the sha256 of your `.bashrc` file to a remote server
2. Use `brew` to install `cowsay`

This demonstrates that npm is not putting strong restrictions on the install scripts being executed. Here's an abbreviated version of what you'd see upon executing `run_demo.sh` (which 1. builds the package, 2. installs the package, 3. uninstalls the package):

```txt
######################
# Installing package #
######################
script: preinstall
script: install

Updating Homebrew...
==> Downloading https://homebrew.bintray.com/bottles/cowsay-3.04.mojave.bottle.tar.gz
Already downloaded: /Users/awendland/Library/Caches/Homebrew/downloads/38854ad3bfa8be16c69e8b9813aebb2526a32b23a8ab3e7c1b33c24164e891c0--cowsay-3.04.mojave.bottle.tar.gz
==> Pouring cowsay-3.04.mojave.bottle.tar.gz
🍺  /usr/local/Cellar/cowsay/3.04: 65 files, 82.9KB
 _______________________________________
/ Uh Oh! The install script in this npm \
| package just installed cowsay using   |
\ brew.                                 /
 ---------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

script: postinstall
added 1 package from 1 contributor and audited 1 package in 11.306s
found 0 vulnerabilities

########################
# Uninstalling package #
########################
script: preuninstall
script: uninstall
removed 1 package in 0.672s
found 0 vulnerabilities
```

If you run the script with [https://npm-test-install-hook.requestcatcher.com/](https://npm-test-install-hook.requestcatcher.com/) beforehand, you'll see web requests coming in reporting your username and the sha256 of your `~/.bashrc` file.

## Next Steps

With the new uses of npm, it's not appropriate to expect all developers to be wary of the malicious activities install hook scripts might perform. Many develoeprs may assume that since the packages are executing safely in the sandbox of their web browser there is no way for malicious packages to compromise their computers.

As the next step, I'm going to conduct a review of legitimate npm packages to see what an appropriate featureset for install hook scripts is. Two initial mitigation thoughts that came to mind were:

* Creating a reduced execution environment for these install hooks, such as a DSL that only allows certain filesystem IO that's scoped only to the packages install directory and a temp folder.
* Add a new parameter to dependencies that require install hook script execution so that the consumer has to explicitly authorize it (this would have protected against the eslint-worm[^fn2]), such as:

  ```json
  "dependencies": {
    "package": "version_or_uri",
    "package_with_hooks": {"uri": "version_or_uri", "run_hooks": true}
  }
  ```

[^fn0]: Feature image from [The Register: NPM package dev logins...](https://www.theregister.co.uk/2018/07/12/npm_eslint/)
[^fn1]: [ESLint - hzoo/build.js](https://gist.github.com/hzoo/51cb84afdc50b14bffa6c6dc49826b3e)
[^fn2]: [ESLint - Postmortem for Malicious Packages Published on July 12th, 2018](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes)
