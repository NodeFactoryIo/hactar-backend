var sequelize = require("sequelize");

module.exports = {
    up: function (queryInterface) {
        return queryInterface.createTable('MiningRewards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER
            },
            minerRewards: {
                type: sequelize.ARRAY(sequelize.JSON)
            },
            rewardAmount: {
                type: sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: sequelize.DATE
            }
        })
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('MiningRewards');
    }
};
