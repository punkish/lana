const budget = {
    method: 'GET',

    path: '/budget',

    handler : function (request, reply) {

        reply.view(
            'budget', 
            { data : [] }, 
            { layout : 'main' }
        );
    },

    config : {
        description: 'Static pages',
        notes: 'name of the file',
        tags: ['api', 'budget']
    }
};

module.exports = budget;