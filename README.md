# AUTEMPOMATE

GET READY TO AUTEMPOMATE

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

To create an access token, follow the steps outlined here under [Using the REST API as an individual user](https://apidocs.tempo.io/v4/#section/Authentication)
