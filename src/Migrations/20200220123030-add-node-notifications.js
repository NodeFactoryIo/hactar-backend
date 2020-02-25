var sequelize = require("sequelize");

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.addColumn('Nodes', 'hasEnabledNotifications',
                    {
                        type: sequelize.BOOLEAN,
                        allowNull: false,
                        defaultValue: true
                    },
                    {transaction: t}
                )
            ]);
        });
    },

    down: async (queryInterface) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Nodes', 'hasEnabledNotifications', {transaction: t}),
            ])
        })
    }
};
