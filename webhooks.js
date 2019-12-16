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
        console.log('received deployment event for ref ' + deployment.ref)
        exec('cd .. && git pull && git checkout ' + deployment.ref, (error, stdout, stderr) => {
          if (error) {
            console.error(`error: ${error}`)
            return
          }

          if (stdout) {
            console.log(`stdout: ${stdout}`)
          }

          if (stderr) {
            console.error(`stderr: ${stderr}`)
          }
        })
        res.send('OK')
        break
      }
    default:
      console.error('Unhandled event: ' + event)
      res.send('ERR')
  }
}))

app.listen(process.env.PORT || 8080)
