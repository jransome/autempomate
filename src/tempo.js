const fetch = require('node-fetch')
const https = require('https')
const agent = new https.Agent({ rejectUnauthorized: false })

const { TEMPO_BASE_URL, TOKEN } = require('./config')

const postWorklog = (worklog) => fetch(`${TEMPO_BASE_URL}/worklogs`, {
  agent,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(worklog)
})

module.exports = {
  postWorklog,
}
