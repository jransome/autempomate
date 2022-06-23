const fetch = require('node-fetch')
const https = require('https')
const agent = new https.Agent({ rejectUnauthorized: false })

const { TEMPO_BASE_URL, TOKEN } = require('./config')

const MAX_RETRIES = 5

const postWorklog = async (worklog, attemptNumber = 0) => {
  const res = await fetch(`${TEMPO_BASE_URL}/worklogs`, {
    agent,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(worklog)
  })

  if (res.status === 429 && attemptNumber < MAX_RETRIES) {
    return postWorklog(worklog, attemptNumber + 1)
  }
}

module.exports = {
  postWorklog,
}
