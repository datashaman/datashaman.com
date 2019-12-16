import express from 'express'
import webhooks from 'datashaman-webhooks'

const app = express()
webhooks.boot(app, process.env.GITHUB_TOKEN)

app.post('/', webhooks.router(function (req, res, event) {
  switch (event) {
    case 'deployment':
    case 'deployment_status':
      console.log(req)
    default:
      console.error('Unhandled event: ' + event)
  }
}))
