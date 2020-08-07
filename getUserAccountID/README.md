# Jira Cloud - Get User Account ID
Step to query Jira Cloud for a user by email address and returns their Jira Account ID and Display Name

#### :blue_book: NOTE
> The Jira Account ID is the unique ID for a Jira account not the login ID.

### :scroll: DISCLAIMER
<kbd>
  <img src="https://github.com/xmatters/xMatters-Labs/raw/master/media/disclaimer.png">
</kbd>

---
# Files
* **Workflows**
    * [JiraCloudGetUserAccountID.zip](getUserAccountID/workflows/JiraCloudGetUserAccountID.zip) - workflow to import step
* **Step Source**
    * [GetUserAccountID.js](getUserAccountID/src/GetUserAccountID.js) - source code for step

# How It Works
Using the email address passed into the input this step will query Jira Cloud for a user with a matching email address.  If it finds a user account it will output the user's Jira Account ID and Display Name.

#### :blue_book: NOTE
> The Jira Account ID is the unique ID for a Jira account not the login ID.

---
# Installation
## Jira Cloud
#### :blue_book: NOTE
> If you already have a Jira endpoint setup in your xMatters workflow you can skip this section
1. Login to Jira with the account you want the integration to use for authenticate to the Jira API
2. Create an API Token [here](https://id.atlassian.com/manage-profile/security/api-tokens) and save it for later when you configure xMatters

## xMatters

### Import Step
1. Download the workflow file [JiraCloudGetUserAccountID.zip](workflows/JiraCloudGetUserAccountID.zip)
2. Log into your xMatters instance and navigate to Workflows
3. Click **Import** and then select the [JiraCloudGetUserAccountID.zip](workflows/JiraCloudGetUserAccountID.zip) you just downloaded
4. Click **Import**
#### :blue_book: NOTE
> Once the import is complete if you are not going to use the workflow that was imported you can delete it. The imported steps will remain.

### Create Jira Endpoint
#### :blue_book: NOTE
> If you already have a Jira endpoint setup in your xMatters workflow you can skip these steps
1. Create an endpoint in the workflow you want to use this step
    * **Name** - Jira Cloud
    * **Base URL** - your Jira Cloud instance URL https://example.atlassian.net
    * **Trusted self-signed certificate** - disabled
    * **Endpoint Type** - Basic
    * **Username** - Jira username under which you created the API Token earlier
    * **Password** - Jira API Token you created earlier
    * **Preemptive** - enabled
2. Save the endpoint

### Add Step to Workflow
1. Now open the Flow you want to add the step too
2. Under **CUSTOM** tab in the pallet on the right find the step called **Jira Cloud - Get User Account ID**
3. Drag it on to the canvas
4. For the email input enter an output of a previous step that returns an email address or enter an email address for testing
5. **Continue On Error** can be set to **true** if you want the flow to continue if this step gets an error

---
# Usage
The **Jira Cloud - Get User Account ID** step allows you to find a user's Jira Account ID using their email address.  This can be useful if you want to update Jira issue fields like Reporter or Assignee where you need the user's Jira Account ID.

### Step External Endpoint
Jira Cloud - Find Users - [GET /rest/api/3/user/search](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search/#api-rest-api-3-user-search-get)

### Inputs
| Name  | Required? | Min | Max | Help Text | Default Value | Multiline |
| ----- | ----------| --- | --- | --------- | ------------- | --------- |
| User Email | Yes | 0 | 2000 | Email address used to search for Jira user account | None | No |
| Continue On Error | No | 0 | 5 | (true \| false) Continue flow if step has an error. Outputs will be empty | false | No |

### Outputs
| Name | Description |
| ---- | ----------- |
| Jira User Account ID | The user's Jira Account ID |
| Jira User Desplay Name | The user's Jira Display Name |