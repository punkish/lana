const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', '..', 'data', 'lessons');
const index = fs.readdirSync(dir)
    .filter(function(file) {
    
        // remove entries that start with "."
        if (file.substr(0, 1) !== ".") {
            return file;
        }
    });
const yaml = require('yaml-front-matter');
const showdown = require('showdown');
const converter = new showdown.Converter({
    parseImgDimensions: true
});
let context;
let text;

const lessons = {
    method: 'GET',

    path: '/lessons',

    handler : function (request, reply) {
        if (request.query.q) {
            const lesson = request.query.q;
            const file = path.join(dir, lesson, 'index.md');
            const metadata = yaml.loadFront(file);
            text = metadata["__content"];
            context = {
                lesson : lesson,
                uri : metadata["uri"],
                tags : metadata["tags"],
                stars : metadata["stars"]
            };
        }
        else {
            context = { lessons : index };
        }

        if (request.headers["content-type"] === "application/json") {
            context.text = text;
            reply(context);
        }
        else {
            context.text = converter.makeHtml(text);
            reply.view(
                'lessons',
                context,
                { layout : 'main' }
            );
        }
    },

    config : {
        description: 'Static pages',
        notes: 'name of the file',
        tags: ['static']
    }
};

module.exports = lessons;