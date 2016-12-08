const lessons = {
    method: 'GET',

    path: '/{page?}',

    handler : function (request, reply) {
        const page = request.params.page || 'index';

        const path = require('path');
        const yaml = require('yaml-front-matter');
        const showdown = require('showdown');
        const converter = new showdown.Converter({
            parseImgDimensions: true
        });

        const metadata = yaml.loadFront(
            path.join(__dirname, '..', 'public', page + '.md')
        );

        const text = converter.makeHtml(metadata["__content"]);

        reply.view(
            'static-page', 
            { text : text }, 
            { layout : 'main' }
        );
    },

    config : {
        description: 'Static pages',
        notes: 'name of the file',
        tags: ['static']
    }
};

module.exports = lessons;