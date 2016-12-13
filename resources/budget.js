const node_cj = require("node-csv-json");
const path = require('path');
const budget_file = path.join(__dirname, '..', 'data/buxheti/buxheti.csv');

const budget = {
    method: 'GET',

    path: '/budget',

    handler : function (request, reply) {

      const node_cj = require("node-csv-json");

      node_cj(
          {
              input: budget_file,
              output: null
          },
          function(err, result){
              if(err) {
                  console.error(err);
              }
              else {
                reply.view(
                    'budget',
                    { data : result },
                    { layout : 'main' }
                );
              }
        }
      );



    },

    config : {
        description: 'Static pages',
        notes: 'name of the file',
        tags: ['api', 'budget']
    }
};

module.exports = budget;
