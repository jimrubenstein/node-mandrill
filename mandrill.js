var request = require('request'),
    _ = require('underscore');

var MANDRILL_API_ROOT = 'https://mandrillapp.com/api/1.0/'; 

function makeMandrill(key)
{
    function mandrill(path, opts, callback)
    {
        var format = path.split('.');

        path = format[0];

        if (format.length == 1) format = 'json';
        else format = format[1].toLowerCase();

        if (typeof opts == 'function')
        {
            var callback = opts;
            opts = { key: key };
        }

        var requestOptions = {
            method: 'POST',
            url: MANDRILL_API_ROOT + path + '.' + format,
        };

        requestOptions['body'] = JSON.stringify( _.extend({ key: key }, opts) );
        
        request(requestOptions, function(error, response, body)
        {
            if (typeof callback == 'function')
            {
                if (!error)
                {
                    //everything is good!
                    if (format == 'json')
                    {
                        try {
                            body = JSON.parse(body);
                        } catch (e) {
                            callback(e);
                        }
                    }

                    if (response['statusCode'] >= 200 && response['statusCode'] < 300)
                    {
                        callback(null, body);
                    }
                    else
                    {
                        callback(body);
                    }
                }
                else
                {
                    callback(error);
                }
            }
        });
    }
    
    return mandrill;
}

module.exports = makeMandrill;
