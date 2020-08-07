/**
 * Step to query Jira Cloud for a user by email address and returns their Jira Account ID and Display Name
 */

switch (input['Continue On Error'].toLowerCase().trim()) { 
    case "true": case "yes": case "1": contOnError = true; break;
    default: contOnError = false; 
}

try {
    var queryUser = http.request({
        endpoint: 'Jira Cloud',
        method: 'GET',
        path: '/rest/api/3/user/search?query=' + undefinedIfEmptyString(input['User Email'].trim())
    });

    var response = queryUser.write();
    var respBody;
    var cannotParseMsg = 'Unable to parse errors, see logs for details.';

    if (response.statusCode >= 200 && response.statusCode < 300) {
        try {
            respBody = JSON.parse(response.body);
        } catch (e) {
            throw new Error(cannotParseMsg);
        }
        console.log('Found the following users:');
        for (user in respBody) {
            console.log(respBody[user].displayName);
        }
        if (respBody.length == 1) {
            output['Jira User Account ID'] = respBody[0].accountId;
            output['Jira User Display Name'] = respBody[0].displayName;
        } else if (respBody.length > 1) {
            throw new Error('More than one Jira account matched email ' + input['User Email']);
        } else if (respBody.length == 0) {
            throw new Error('No Jira accounts matched email ' + input['User Email']);
        } else {
            throw new Error(
                'Failed to find user with email "' + input['User Email'] + '", '
                + (parseableRespBody ? 'Jira Cloud returned ' : '')
                + 'error code [' + response.statusCode + '] '
                + (parseableRespBody ? 'and the following messages: ' : '')
                + error
            );
        }
    } else {
        var error;
        var parseableRespBody = true;
        try {
            respBody = JSON.parse(response.body);
            error = respBody.errorMessages.length > 0 ? respBody.errorMessages.join(' ') : bundleErrors(respBody.errors);
        } catch (e) {
            parseableRespBody = false;
            error = cannotParseMsg;
        }
        throw new Error(
            'Failed to find user with email "' + input['User Email'] + '", '
            + (parseableRespBody ? 'Jira Cloud returned ' : '')
            + 'error code [' + response.statusCode + '] '
            + (parseableRespBody ? 'and the following messages: ' : '')
            + error
        );
    }
} catch (err) {
    if (contOnError == true) {
        output['Jira User Account ID'] = '';
        output['Jira User Display Name'] = '';
        console.log(err.message);
    } else {
        throw new Error(err);
    }
}

function bundleErrors(errors) {
    var errorArray = [];
    for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
            errorArray.push(key + ': ' + errors[key]);
        }
    }
    return errorArray.join(' ');
}
    
function undefinedIfEmptyString(input) {
    return input === '' ? undefined : input;
}