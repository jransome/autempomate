const fetch = require('node-fetch')
const https = require('https')
const agent = new https.Agent({ rejectUnauthorized: false }) // Thanks netskope

const { TEMPO_BASE_URL, TOKEN, JIRA_ACCOUNT_ID } = require('../src/config')

const getAllWorklogsForPeriod = (from, to) => fetch(`${TEMPO_BASE_URL}/worklogs/user/${JIRA_ACCOUNT_ID}?from=${from}&to=${to}`, {
  agent,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  }
})
  .then(res => res.json())
  .then(res => res.results)

const deleteWorklogById = (id) => fetch(`${TEMPO_BASE_URL}/worklogs/${id}`, {
  agent,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  }
})

const cleanTimesheetPeriod = async () => {
  const allWorklogsForPeriod = await getAllWorklogsForPeriod('2022-06-01', '2022-06-30')
  await Promise.all(allWorklogsForPeriod.map(w => deleteWorklogById(w.tempoWorklogId)))
  console.log(allWorklogsForPeriod.length, 'deleted')
}

cleanTimesheetPeriod()
