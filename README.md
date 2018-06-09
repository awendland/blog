# Personal Website

## Setup

Run `docker run --rm --volume="$PWD:/srv/jekyll" --volume="$PWD/.vendor/bundle:/usr/local/bundle" -it -p "4000:4000" jekyll/jekyll:3.7 jekyll serve` to auto build and serve the site locally.

To update the stylesheets, use `lessc main.less main.css`. `lessc` can be installed w/ `npm i -g less`.