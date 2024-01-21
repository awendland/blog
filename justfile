#!/usr/bin/env just --justfile
# Just is a replacement for Make. It's focused on running project-specific instead
# of building C code, so it's easier to work with. It's available in almost all
# package libraries, e.g., `brew install just`.
#
# Quick Start: https://just.systems/man/en/chapter_18.html

default:
    @just --list

# Add pre-commit to the git hooks so it auto-runs on each commit
setup-pre-commit:
    pre-commit install

# Must be run after you've followed the "Setup" instruction in README.md.
setup: setup-pre-commit

# Run all pre-commit rules against all files
lint:
    pre-commit run --all-files

HUGO_VERSION := "0.121.2" # NOTE: ensure this matches netlify.toml

# Run Hugo, isolated via Docker for reproducibility
docker-hugo *args:
    docker run --rm --interactive --tty --volume $PWD:/src hugomods/hugo:base-{{HUGO_VERSION}} {{args}}

# Serve the site locally for development
serve-dev:
    docker run --rm --interactive --tty --volume $PWD:/src -p 3113:3113 hugomods/hugo:base-{{HUGO_VERSION}} hugo server --bind 0.0.0.0 --buildDrafts --port 3113

DENO_VERSION := "1.39.4"

# Run Deno, isolated via Docker for reproducibility
docker-deno *args:
    docker run --rm --interactive --tty --volume $PWD/.cache/deno:/deno-dir --volume $PWD:/app --workdir /app denoland/deno:{{DENO_VERSION}} {{args}}

# Script: Create Markdown files for each Collected Note
script-retrieve-collected-notes *args:
    @just docker-deno deno run --allow-read --allow-write --allow-net scripts/retrieve-collected-notes.ts {{args}}

# Script: Create Markdown files from an HTML export of a Google Doc
script-convert-gdoc html_file:
    @just docker-deno deno run --allow-read --allow-write scripts/convert-gdoc.ts {{html_file}}

# Lint any Deno scripts
script-lint:
    docker run --rm --volume $PWD/.cache/deno:/deno-dir --volume $PWD:/app --workdir /app denoland/deno:{{DENO_VERSION}} bash -c "cd scripts && deno lint && deno fmt && deno check *.ts"
