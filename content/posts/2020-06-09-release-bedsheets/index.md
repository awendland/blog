---
layout: post
title: 'Release: bedsheets - use Google Sheets as a RESTful DB'
emoji: 🎉
date: 2020-06-09T15:34:09-0700
visibility: public
---

Google Sheets has a bunch of wonderful database features: [built-in version control](https://support.google.com/docs/answer/190843), [collaborative management](https://support.google.com/docs/answer/9331169), [a great table browser](https://itnext.io/using-google-sheets-as-a-database-for-react-apps-6c15b4481680), [powerful data processing functions](https://support.google.com/docs/answer/9330962), and [basic visualization tools](https://developers.google.com/chart/interactive/docs/spreadsheets).

There are a few libraries and SaaS offerings that let you use it as a serverless DB, but they either 1.) cost money, 2.) require you to depend on a 3rd-party service without encryption, 3.) expect you to have a VPS to deploy to.

I wanted a simple option that I could run on Google Cloud Run and pay next-to-nothing will still providing robust features. So I created [bedsheets](https://github.com/awendland/bedsheets#bedsheets): a Node.js proxy that lets you turn Google Sheets into a quick and dirty RESTful database.

It's intended to be:

- _your simplest database_, if you need something more complex look at our [awesome-serverless's list of databases](https://github.com/anaibol/awesome-serverless#databases)
- _no-maintenance_, so that you can deploy it once and forget about things
- _self-hosted_, so that you don't have to risk unreliable or insecure 3rd-party services (plus, you can usually host it for free on most cloud providers!)
  - checkout my [step-by-step instructions](https://github.com/awendland/bedsheets/blob/master/README.md#deploy) on how to host it's 54 MB Docker image with Google Cloud Run

By following simple conventions Bedsheets lets you introduce table schemas ([see docs](https://github.com/awendland/bedsheets#sheet-schema)) and expose them over HTTP(S) with REST endpoints and JSON payloads.

Bedsheets is not trying to compete with real databases. Instead, it's trying to provide a database with a lower barrier to entry for small projects that you think _"wow, it would be nice if this had a database, but I don't want to go through the hassle of deploying/configuring/maintaining the infrastructure for one"_.

---

#### March 2021 Update

So far it's been great. I've used it to store temperature data recorded by a Raspberry Pi and keep track of articles and other content that I really enjoyed reading.
