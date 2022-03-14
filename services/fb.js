const FB = require('fb');

const ACCESS_TOKEN = 'EAATFEWkoSk4BAF7lWMEZCVSgODPO8zXSoOTaOoqQBbMO2HcEzimr2XLGPl2fwZAuBou4cPNpTRHIsENTq5rBMCtZABnZBQ29w9kFsIrJsTnynCm8dThdbBHbDBx4DaycJLKAoZBG3ZAP5MHErIh87L8EBbpBt4pHucV4zUZADJK6wbDObi4sAziqox5leow169t4Lei2D2zY1CDEBzpOxj8';

FB.setAccessToken(ACCESS_TOKEN);
FB.api(
    '/positiveThoughts/feed',
    'POST',
    { "message": "Testing with api" },
    function (response) {
        if (response.error) {
            console.log('error occurred: ' + JSON.stringify(response.error))
            return;
        }
        console.log('successfully posted to page!');
    }
);