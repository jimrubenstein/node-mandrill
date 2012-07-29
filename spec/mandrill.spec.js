/* EDIT THE FOLLOWING LINES IN ORDER TO RUN TESTS */
var MANDRILL_API_KEY = 'YOUR_API_KEY';
var testEmail = 'git@jimsc.com';
/* DO NOT EDIT PAST HERE */

var Mandrill = require('../mandrill.js');
describe('node-mandrill', function()
{
    var mandrill = Mandrill(MANDRILL_API_KEY); 

    describe("GET requests", function()
    {
        it('Parses JSON responses', function()
        {
            var returned = false,
                response = null,
                error = null;

            runs(function()
            {
                mandrill('/users/info', function(err, resp)
                {
                    response = resp;
                    error = err;
                    returned = true;
                });
            });

            waitsFor(function()
            {
                return returned;
            }, 'Async request to complete', 1500);

            runs(function()
            {
                expect(typeof response).toEqual('object');
            });
        });

        it("Gets PHP responses", function()
        {
            var returned = false,
                response = null,
                error = null;

            runs(function()
            {
                mandrill('/users/info.php', function(err, resp)
                {
                    response = resp;
                    error = err;
                    returned = true;
                });
            });

            waitsFor(function()
            {
                return returned;
            }, 'Async request to complete', 1500);

            runs(function()
            {
                expect(typeof response).toEqual('string');
            });
        });

        it("Gets XML responses", function()
        {
            var returned = false,
                response = null,
                error = null;

            runs(function()
            {
                mandrill('/users/info.xml', function(err, resp)
                {
                    response = resp;
                    error = err;
                    returned = true;
                });
            });

            waitsFor(function()
            {
                return returned;
            }, 'Async request to complete', 1500);

            runs(function()
            {
                expect(typeof response).toEqual('string');
                expect(response.indexOf('<?xml')).toEqual(0);
            });
        });

        it("Gets YAML responses", function()
        {
            var returned = false,
                response = null,
                error = null;

            runs(function()
            {
                mandrill('/users/info.yaml', function(err, resp)
                {
                    response = resp;
                    error = err;
                    returned = true;
                });
            });

            waitsFor(function()
            {
                return returned;
            }, 'Async request to complete', 1500);

            runs(function()
            {
                expect(typeof response).toEqual('string');
            });
        });
    });

    describe('Error handling', function()
    {
        it('Returns error on invalid key', function()
        {
            var returned = false,
                response = null,
                error = null;

            runs(function()
            {
                mandrill('/users/info', { key: '1111' }, function(err, resp)
                {
                    response = resp;
                    error = err;
                    returned = true;
                });
            });

            waitsFor(function()
            {
                return returned;
            }, 'Async request to complete', 1500);

            runs(function()
            {
                expect(typeof error).toEqual('object');
                expect(error['name']).toEqual('Invalid_Key');
                expect(response).toBeFalsy();
            });
        });

        it('Returns error on invalid method call', function()
        {
            var returned = false,
                response = null,
                error = null;

            runs(function()
            {
                mandrill('/users/info222', function(err, resp)
                {
                    response = resp;
                    error = err;
                    returned = true;
                });
            });

            waitsFor(function()
            {
                return returned;
            }, 'Async request to complete', 1500);

            runs(function()
            {
                expect(typeof error).toEqual('object');
                expect(response).toBeFalsy();
            });
        });
    });

    describe('Post Requests', function()
    {
        it('Sends e-mail', function()
        {
            var returned = false,
                response = null,
                error = null;

            runs(function()
            {
                mandrill('/messages/send', {
                    message: {
                        to: [{ email: testEmail, name: 'Jim Rubenstein' }],
                        from_name: 'Node-Mandrill Tests',
                        from_email: 'git@jimsc.com',
                        subject: 'Node-Mandrill Test Suite',
                        text: 'Testing sending email via node-mandrill test suite.'
                    }
                }
                , function(err, resp)
                {
                    response = resp;
                    error = err;
                    returned = true;
                });
            });

            waitsFor(function()
            {
                return returned;
            }, 'Async request to complete', 1500);

            runs(function()
            {
                expect(response).toBeTruthy();
                expect(response[0]['status']).toEqual('sent');
            });
        });
    });
})
