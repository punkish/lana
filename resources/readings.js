const path = require('path');
const dir = path.join(__dirname, '..', '..', 'data', 'readings');
const dbfile = path.join(dir, 'readings.db');
const Datastore = require('nedb');
//var PouchDB = require('pouchdb');
//var db = new PouchDB(dbfile);
const db = new Datastore({
     filename: dbfile,
     timestampData: true
});

const readings = {
    method: ['GET', 'PUT'],
    path: '/readings',
    handler : function (request, reply) {
        //let context = {};
        if (request.method === 'get') {
            const action = request.query.action;
            const id = request.query.id || 'all';
            console.log(`id: ${id}`);

            if (id === 'all') {
                // db.allDocs({include_docs: true}, function (err, result) {
                //     reply.view(
                //         'readings',
                //         {data: result.rows},
                //         { layout : 'main' }
                //     );
                // });
                db.find({}, function (err, docs) {
                  if (err) {
                    console.log(err);
                  }
                  console.log('found all documents');
                  console.log(docs);
                  // reply.view(
                  //     'readings',
                  //     { data: docs },
                  //     { layout : 'main' }
                  // );
                });
            }
            else {
                db.get(id, function (err, result) {
                    reply.view(
                        'readings',
                        {data: [
                            {doc: {
                                id: id,
                                timestamp: new Date(Number.parseInt(id.split('_')[0])),
                                humidity: result.humidity,
                                temperature: result.temperature
                            }}
                        ]},
                        { layout : 'main' }
                    );
                });
            }
        }
        else if (request.method === 'put') {

            db.put(request.payload, function (err, newDoc) {
                reply('created /readings?id=' + newDoc.id)
                    .code(201)
                    .header("Content-Location", "/readings?id=" + newDoc.id);
            });
        }
    },

    config : {
        description: 'Readings from sensors',
        notes: 'some notes',
        tags: ['api', 'readings']
    }
};

module.exports = readings;
