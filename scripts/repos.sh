#!/usr/bin/env node

require('dotenv').config()

const async = require('async')
const Octokit = require('@octokit/rest')

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

const blacklist = ['taskrabbit/elasticsearch-dump']

octokit.repos
    .list({
        affiliation: 'owner,collaborator',
        sort: 'updated',
        visibility: 'public',
    })
    .then(({data}) => {
        const repos = data.filter(repo => {
            return !repo.archived && blacklist.indexOf(repo.full_name) == -1
        })

        async.eachOf(
            repos,
            (repo, key, cb) => {
                octokit.repos
                    .get({
                        owner: repo.owner.login,
                        repo: repo.name,
                    })
                    .then(({data}) => {
                        repos[key] = data
                        cb()
                    })
            },
            err => {
                if (err) {
                    console.error(err)
                } else {
                    console.log(JSON.stringify(repos, null, 2))
                }
            }
        )
    })
    .catch(console.error)
