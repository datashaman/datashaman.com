const express = require('express')
const webhooks = require('datashaman-webhooks')

const app = express()
webhooks.boot(app, process.env.GITHUB_SECRET)

app.post('/', webhooks.router(function (req, res, event) {
  switch (event) {
    case 'deployment':
    case 'deployment_status':
      console.log(req)
    default:
      console.error('Unhandled event: ' + event)
  }
}))

app.listen(process.env.PORT || 8080)
