// Load Chance
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

const path = require('path');
const dir = path.join(__dirname, 'data', 'readings');
const dbfile = path.join(dir, 'readings.db');

const Datastore = require('nedb');
const db = new Datastore({
     filename: dbfile,
     autoload: true
});

var docs = [];
for (let i=0, j=1000; i<j; i++) {
    let doc = {
        program: chance.word({length: 5}),
        personnel: chance.natural(),
        operations: chance.natural(),
        investment: chance.natural()
    };

    docs.push(doc);
}

//console.log(docs);

db.insert(docs);

db.find({}, function (err, docs) {
    if (err) {
        console.log(err);
    }
    console.log('found all documents');
    console.log(docs);
});