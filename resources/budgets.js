const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const dir = path.join(__dirname, '..', 'data','buxheti');

const budget = {
    method: 'GET',

    path: '/budgets',

    handler : function (request, reply) {
        if (request.headers["content-type"] === "application/json") {

            // REST request
            // $ curl -s -H "Content-Type: application/json" -X GET http://localhost:3000/budget
            if (request.query.name) {

                let data = [];

                // send back the specific budget called name
                fs.createReadStream(path.join(dir, request.query.name + '.csv'))
                    .pipe(csv())
                    .on('data', function(row) {
                        data.push(row);
                    })
                    .on('end', function () {

                        // We are done
                        reply({
                            budget_name: request.query.name.replace(/_/g, ' '),
                            budgets: data,
                            aBudget: true
                        });
                    });
            }
            else {

                // send back a list of all available budgets
                const budget_files = fs.readdirSync(dir);
                const budgets = budget_files.map(function(elem) {
                    var name  = elem.replace(/\.csv$/, '');
                    name = name.replace(/_/g, ' ');
                    return {
                        uri: "/budgets?name=" + elem.replace(/\.csv$/, ''),
                        name: name
                    }
                });

                reply({
                    budget_name: null,
                    budgets : budgets,
                    aBudget: false
                });
            }
        }
        else {

            // Not REST
            if (request.query.name) {

                let data = [];

                // send back the specific budget called name
                fs.createReadStream(path.join(dir, request.query.name + '.csv'))
                    .pipe(csv())
                    .on('data', function(row) {
                        data.push(row);
                    })
                    .on('end', function () {

                        // We are done
                        reply.view(
                            'budgets',
                            {
                                budget_name: request.query.name.replace(/_/g, ' '),
                                budgets: JSON.stringify(data),
                                aBudget: true
                            },
                            { layout : 'main' }
                        );
                    });
            }
            else {

                // send back a list of all available budgets
                const budget_files = fs.readdirSync(dir);
                const budgets = budget_files.map(function(elem){
                    return elem.replace(/\.csv$/, '');
                });

                reply.view(
                    'budgets',
                    {
                        budget_name: null,
                        budgets : JSON.stringify(budgets),
                        aBudget: false
                    },
                    { layout : 'main' }
                );
            }
        }
        
    },

    config : {
        description: 'Static pages',
        notes: 'name of the file',
        tags: ['api', 'budget']
    }
};

module.exports = budget;
