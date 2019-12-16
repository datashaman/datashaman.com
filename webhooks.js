require('dotenv').config()

const exec = require('child_process').exec
const express = require('express')
const webhooks = require('datashaman-webhooks')

const app = express()
webhooks.boot(app, process.env.GITHUB_SECRET)

app.post('/', webhooks.router(function (req, res, event) {
  switch (event) {
    case 'deployment':
      const deployment = req.body.deployment
      if (deployment.task == 'deploy' && deployment.environment == 'github-pages') {
        exec('cd .. && git pull && git checkout ' + deployment.ref)
	res.send('OK')
	break
      }
    default:
      console.error('Unhandled event: ' + event)
  }
}))

app.listen(process.env.PORT || 8080)
