const { exec } = require('child_process')

const tempoUiURL = 'https://comparethemarket.atlassian.net/plugins/servlet/ac/io.tempo.jira/tempo-app#!/my-work/timesheet'

const openTempoUi = () => exec(`open -a "Google Chrome" ${tempoUiURL}`, (err, stdout, stderr) => {
  if (err) console.error('failed to open chrome', err)
})

module.exports = {
  openTempoUi,
}
