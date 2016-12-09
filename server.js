'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Vision = require('vision');
const Mustache = require('mustache');

const inert = require('./resources/inert.js');
const static_pages = require('./resources/static-pages.js');
//const lessons = require('./resources/lessons.js');
//const users = require('./resources/users.js');
const budget = require('./resources/budget.js');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
});

server.route([
    inert,
    //users,
    budget,
    static_pages
]);

server.register({
    register: Good,
    options: {
        reporters: {
            console: [
                {
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [
                        {
                            //response: '*',
                            log: '*'
                        }
                    ]
                },
                {
                    module: 'good-console'
                },
                'stdout'
            ]
        }
    }
}, (err) => {
    if (err) {
        throw err;
    }
});

server.register(Vision, (err) => {
    if (err) {
        throw err;
    }

    const partials = {};

    server.views({
        engines: {
            html: {
                compile: function (template) {
                    Mustache.parse(template);

                    return function (context) {
                        return Mustache.render(
                            template,
                            context,
                            partials
                        );
                    };
                },

                registerPartial: function (name, src) {
                    partials[name] = src;
                }
            }
        },
        defaultExtension: 'html',
        relativeTo: __dirname,
        path: 'views',
        partialsPath: 'views/partials',
        layoutPath: 'views/layouts'
    });
});

server.register(
    [require('vision'), require('inert'), { register: require('lout') }],
    (err) => {}
);

server.start((err) => {
    if (err) {
        throw err;
    }

    server.log('info', 'Server running at: ' + server.info.uri);
});
