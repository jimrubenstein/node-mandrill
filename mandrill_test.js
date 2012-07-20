var Mandrill = require('./mandrill.js');
var MANDRILL_API_KEY = '<your mandrill api key>';

md = Mandrill(MANDRILL_API_KEY);

md('/messages/send', { message: {
    to: [{ email: '<your email>' }],
    from_email: '<your email>',
    subject: 'test',
    text: 'hello world'
    }
}, function(error, response)
{
    console.log(error, response);
});
