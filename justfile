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

# Run a command inside an ephemeral Docker container
run *args:
    #!/usr/bin/env bash
    set -euxo pipefail
    docker_build_hash=$(docker build -q .)
    docker run --rm -it -v $(PWD)/content:/blog/content -v $(PWD)/package.json:/blog/package.json -v $(PWD)/yarn.lock:/blog/yarn.lock $docker_build_hash {{args}}

# Generate google docs auth
google-docs-auth:
    npx --package=gatsby-source-google-docs gatsby-source-google-docs-token
