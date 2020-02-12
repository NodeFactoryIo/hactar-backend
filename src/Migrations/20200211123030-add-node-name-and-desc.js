var sequelize = require("sequelize");

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Nodes', 'name',
                    {type: sequelize.STRING},
                    {transaction: t}
                ),
                queryInterface.addColumn('Nodes', 'description',
                    {type: sequelize.STRING},
                    {transaction: t}
                ),
            ]);
        });
    },

    down: async (queryInterface) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Nodes', 'name', {transaction: t}),
                queryInterface.removeColumn('Nodes', 'description', {transaction: t}),
            ])
        })
    }
};
