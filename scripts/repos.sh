#!/usr/bin/env node

require('dotenv').config()

const Octokit = require('@octokit/rest')

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

octokit.repos.list({
  type: 'owner',
  sort: 'updated',
}).then(({ data }) => {
  const filtered = data.filter((repo) => {
      return !repo.archived
  })

  console.log(JSON.stringify(filtered, null, 2))
})
