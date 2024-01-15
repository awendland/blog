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

HUGO_VERSION := "0.121.2"

# Run Hugo, isolated via Docker for reproducibility
run *args:
    docker run --rm -it -v $(PWD):/src hugomods/hugo:base-{{HUGO_VERSION}} {{args}}

# Serve the site locally for development
serve-dev:
    docker run --rm -it -p 3113:3113 -v $(PWD):/src hugomods/hugo:base-{{HUGO_VERSION}} hugo server --bind 0.0.0.0 --buildDrafts --port 3113

