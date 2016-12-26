const node_cj = require("node-csv-json");
const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, '..', 'data','buxheti');

const budget = {
    method: 'GET',

    path: '/budget',

    handler : function (request, reply) {
      if (request.query.name) {

        // send back the specific budget called name

        node_cj(
            {
                input: path.join(dir, request.query.name + '.csv'),
                output: null
            },
            function(err, result){
                if(err) {
                    console.error(err);
                }
                else {
                  reply.view(
                      'budget',
                      {
                        data: JSON.stringify(result),
                        aBudget: true
                      },
                      { layout : 'main' }
                  );
                }
          }
        );
      }
      else {

        // send back a list of all available budgets
        const budget_files = fs.readdirSync(dir);
        const budgets = budget_files.map(function(elem){
          return elem.replace(/\.csv$/, '');
        });

        reply.view(
          'budget',
          {
            data : JSON.stringify(budgets),
            aBudget: false
          },
          { layout : 'main' }
        );
      }





    },

    config : {
        description: 'Static pages',
        notes: 'name of the file',
        tags: ['api', 'budget']
    }
};

module.exports = budget;
