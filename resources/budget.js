const node_cj = require("node-csv-json");
const budget = {
    method: 'GET',

    path: '/budget',

    handler : function (request, reply) {

      const node_cj = require("node-csv-json");

      node_cj(
          {
              input: "/home/sidorela/Projects/lana/data/buxheti/buxheti.csv",
              output: null
          },
          function(err, result){
              if(err) {
                  console.error(err);
              }
              else {
                  //console.log(result)
                  /*
                  { 'Totali buxhetit': '5000',
          'Programi & Njesite shpenzuese': 'Aparati I Bashkise(Projekte per Mjedisin)',
          'Shpenzime personeli': '0',
          'Shpenzime operative': '5000',
          'Shpenzime per Investime': '0' }
              */
              /*
                let html = '<table>\n';
                html += '<tr>';

                result.forEach(function(elem, index) {

                  if (index) {
                    html += '<tr>';
                    for (let key in elem) {
                      html += '<td>';
                      html += elem[key];
                      html += '</td>';
                    }
                    html += '</tr>\n';
                  }
                  else {
                    html += '<tr>';
                    for (let key in elem) {
                      html += '<th>';
                      html += key;
                      html += '</th>';
                    }
                    html += '</tr>\n';
                    html += '<tr>';
                    for (let key in elem) {
                      html += '<td>';
                      html += elem[key];
                      html += '</td>';
                    }
                    html += '</tr>\n';
                  }

                });
                html += '</table>';
                */

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
