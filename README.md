# node-mandrill

node-mandrill is a node.js module designed to allow you to access MailChimp's
Mandrill API with minimal overhead.

I designed node-mandrill so the only documentation you need, in addition to the
Mandrill API specification, is how to install node, how to install the module,
and how to make a call.

## Installation

Using [npm](http://npmjs.org):

    npm install node-mandrill

If you don't have or don't want to use npm:

    cd ~/.node_modules
    git clone git://github.com/jimrubenstein/node-mandrill.git 

## Usage

Usage is super simple.  To require the mandrill library and initialize it with
your account API key:

    var mandrill = require('node-mandrill')('<Your Api Key Here>');

To make a call to the API, call the `mandrill` function.  For example:

    //send an e-mail to jim rubenstein
    mandrill('/messages/send', {
        message: {
            to: [{email: 'git@jimsc.com', name: 'Jim Rubenstein'}],
            from_email: 'you@domain.com',
            subject: "Hey, what's up?",
            text: "Hello, I sent this message using mandrill."
        }
    }, function(error, response)
    {
        //uh oh, there was an error
        if (error) console.log( JSON.stringify(error) );

        //everything's good, lets see what mandrill said
        else console.log(response);
    });

> ### Arguments
> **mandrill(*string: api-endpoint*, *object: options*, *[function: callback]*)**
>
> **mandrill(*string: api-endpiont*, *function: callback]*)**
>
> **Api Endpoint**: The REST url for the API you want to access.  By default,
> all requests are made requesting JSON as the response format.  If you'd like
> to utilize a different format, you cann append `.yaml`, `.php`, or `.xml` to
> the endpoint uri.  Node-mandrill will parse json responses and pass them to
> the callback, but the other formats will be passed back as a string.
>
> **Options**: A javascript object defining the options as needed for the
> requested API endpoint.  *note*: your API key is not required here, as the
> module will automatically append it to your request.  However, you can
> override your configured key by passing a value for a new key, using the
> `key` index of the options object.
>
> **Callback**: A function reference for a function to call upon completion of
> the request.  It should accept 2 arguments.
>
> > **error**: if an error occurred (either with the HTTP request, or within
> > the Mandrill API) the error will be passed back in this argument.  If there
> > was no error, the value of error will be null.
> >
> > **response**: the response from Mandrill in the requested format.  JSON is
> > requested by default, and is parsed into a native javascript object upon
> > completion of the request.  If you choose to use one of the other formats
> > (xml, yaml, php) the response will be passed back as a string to be used
> > with your favorite parsers.
> >

## Requirements

- A [Mandrill](http://mandrill.com/) account w/API key.
- node.js v0.8.2+ (0.8.2 is the version I used to develop this module.  I'm
  unsure if it will work with previous ones.  If you run a previous version, and
  it works, let me know and I'll update this)
- [request](https://github.com/mikeal/request/) 2.9.100+
- [underscore](https://github.com/documentcloud/underscore/) 1.3.3+

## Running Tests

Tests are written using [Jasmine](https://www.github.com/pivotal/jasmine), using
the [jasmine-node](https://github.com/mhevery/jasmine-node) binaries.  You'll
need to install jasmine-node to run the tests.

Once jasmine is installed, you will need to edit the `spec/mandrill.spec.js`
file to reflect your Mandrill API key, and an email address to receive your
test e-mail on.  These two settings are at the top of the file.  Once they're
in place, run your tests by doing:

    $ ./test.sh

On your command line.  If you're running windows, well, sorry. ):

## Question? Problems?

If you run into problems, have questions, or whatever else you can open an
issue on this repository, or tweet me
[@jim_rubenstein](http://twitter.com/jim_rubenstein).  If you'd like to submit
a patch, shoot me a pull request.  I'd like to keep this module simple, so if
you want to add all kinds of crazy functionality - you might want to fork.
When in doubt, send a pull request - the worst that can happen is that I won't
merge it (:

