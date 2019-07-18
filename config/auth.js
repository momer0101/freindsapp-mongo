module.exports = {

    'facebookAuth' : {
        'clientID'        : '1701170290190795', // your App ID
        'clientSecret'    : '751323df82ca5bd5a3955185f581aaec', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },
    'sendgrid':{
        auth: {
            api_key: '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'
        }
    }
};