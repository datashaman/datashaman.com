#!/usr/bin/env node

require('dotenv').config()

const async = require('async')

const Octokit = require('@octokit/rest').plugin(
    require('@octokit/plugin-throttling')
)

const octokit = new Octokit({
    auth: process.env.PERSONAL_TOKEN,
    throttle: {
        onRateLimit: (retryAfter, options) => {
            octokit.log.warn(
                `Request quota exhausted for request ${options.method} ${options.url}`
            )

            if (options.request.retryCount === 0) {
                console.error(`Retrying after ${retryAfter} seconds!`)

                return true
            }
        },
        onAbuseLimit: (retryAfter, options) => {
            octokit.log.warn(
                `Abuse detected for request ${options.method} ${options.url}`
            )
        },
    },
})

const blacklist = process.env.GITHUB_BLACKLIST
    ? process.env.GITHUB_BLACKLIST.split(',')
    : []

octokit
    .paginate('GET /user/repos', {
        affiliation: 'owner,collaborator',
        visibility: 'public',
    })
    .then(repos => {
        repos = repos.filter(repo => {
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
