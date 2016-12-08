const Bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');

const validate = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};

server.register(Basic, (err) => {

    if (err) {
        throw err;
    }

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });
});

const users = {
    method: ['GET', 'POST'],
    path: '/users',
    handler : function (request, reply) {
        let context = {};
        if (request.method === 'get') {
            const action = request.query.action;
            const user_id = request.query.user_id || 'all';

            context.add = action ? true : false;
            context.data = getUser(user_id);
        }
        else if (request.method === 'post') {
            addUser(request.payload.name, request.payload.password);

            context.add = false;
            context.data = getUser('all');
        }

        reply.view(
            'users', 
            context, 
            { layout : 'main' }
        );
    },

    config : {
        description: 'Users are happy',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'users']
    }
};

var data = [];

function getUser(user_id) {
    if (user_id === 'all') {
        return data;
    }
    else {
        for (var i=0, j=data.length; i<j; i++) {
            if (data[i]['_id'] == user_id) {
                return [ data[i] ];
            }
        }
    }
}

function addUser(name, password) {
    data.push({
        _id : data.length,
        name : name,
        password : password
    })
}

module.exports = users;