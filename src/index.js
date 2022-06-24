const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const { postWorklog } = require('./tempo')
const { JIRA_ACCOUNT_ID } = require('./config')
const { openTempoUi } = require('./ui')

dayjs.extend(utc)
/*
Useful worklog IDs:
'OPB-42': 'target platform',
'OPB-128': 'confluent kafka migration',
'INT-20': 'BCE',
'INT-17': 'incident',
'INT-23': 'recruitment',
'INT-2': 'learning and development',
'INT-10': 'holiday',
'INT-3': 'sick',
'INT-15': 'sprint rituals',
*/

const WORKLOG_HOURS = {
  'OPB-42': 4,
  'OPB-128': 3.5,
}

const BANK_HOLIDAYS = [ // hardcoded for now
  2,
  3,
  // 13,
]

const sickDays = [] // TODO
const holidays = [] // TODO

const utcDayJs = () => dayjs().utc()

const createDailyWorklogs = (dayjsInstance, worklogHours) =>
  Object.entries(worklogHours).map(([issueKey, hoursWorked]) => ({
    issueKey,
    timeSpentSeconds: 3600 * hoursWorked,
    startDate: dayjsInstance.format('YYYY-MM-DD'),
    startTime: '08:00:00',
    description: `Working on issue ${issueKey}`,
    authorAccountId: JIRA_ACCOUNT_ID,
  }))

async function run() {
  const daysInCurrentMonth = utcDayJs().daysInMonth()

  const worklogs = []

  for (let i = 0; i < daysInCurrentMonth; i++) {
    const dayjsDate = utcDayJs().startOf('month').add(i, 'days')
    const dayOfWeek = dayjsDate.day()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue
    }

    if (BANK_HOLIDAYS.includes(i + 1)) {
      continue
    }

    worklogs.push(createDailyWorklogs(dayjsDate, WORKLOG_HOURS))
  }

  const flattened = worklogs.flat()
  console.log(`posting ${flattened.length} worklogs...`)
  const responses = await Promise.all(flattened.map(w => postWorklog(w))) // TODO: maybe throttle these requests to avoid 429s
  console.log(`Posted ${responses.filter(r => !!r).length}/${flattened.length} successfully`)
  openTempoUi()
}

run()
