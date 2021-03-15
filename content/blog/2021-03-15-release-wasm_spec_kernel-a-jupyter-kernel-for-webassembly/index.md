---
layout: post
visibility: public
title: 'Release: wasm_spec_kernel - a Jupyter kernel for WebAssembly'
date: 2020-12-31T00:02:52.845Z
emoji: 🎉
---

Testing out WebAssembly features that are only present in [webassembly/spec](https://github.com/WebAssembly/spec/tree/master/interpreter)'s reference interpreter is hard because the interpreter is written in OCaml and can't be run on the web.

So I created a Jupyter kernel that interfaces with its REPL. Now you showcase WebAssembly code in a Jupyter environment.

You can jump right into a web-based Jupyter notebook with this kernel loaded thanks to Binder:

[![launch Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/awendland/wasm_spec_kernel/HEAD?filepath=example_notebook.ipynb)
