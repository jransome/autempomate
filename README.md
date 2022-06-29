# AUTEMPOMATE

GET READY TO AUTEMPOMATE

## Usage

First you will need to create a Tempo access token. Follow the steps outlined here under [Using the REST API as an individual user](https://apidocs.tempo.io/v4/#section/Authentication)

Next get your Jira account Id. To do this, navigate to your Jira profile, and grab the Id from the url:

> https://comparethemarket.atlassian.net/jira/people/**yourAccountId**

Create a `.env` file at the root of the project and populate it as follows:
```
JIRA_ACCOUNT_ID=<your account id>
TOKEN=<your token>
```

To populate your timesheet run `npm run update-timesheet`. This will update it with the worklogs currently hardcoded in `src/index.js`

To clear your timesheet run `npm run delete-timesheet`

---
## Example manual requests

To use example requests you need the vscode rest client. Create the `.vscode/settings.json` file (if it doesn't already exist) and paste the following to populate the variables in the .http file(s):

```json
{
  "rest-client.environmentVariables": {
    "$shared": {
      "accountId": "<YOUR JIRA ACCOUNT ID>",
      "token": "<YOOUR TEMPO ACCESS TOKEN>",
      "reviewerAccountId": "< LINH'S ACCOUNT ID :) >",
    }
  }
}
```

