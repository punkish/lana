const inert = {
    method: 'GET',

    path: '/{param*}',

    handler : {
        directory: {
            path: ['public', 'data/static-pages'],
            listing: false
        }
    },

    config : {
        description: 'Static files',
        notes: 'name of the file',
        tags: ['static']
    }
};

module.exports = inert;