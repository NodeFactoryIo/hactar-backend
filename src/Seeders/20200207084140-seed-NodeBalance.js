module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodeBalance', [{
            balance: 6926520399982608,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            balance: 78974914234696,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            balance: 8537124947501041,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            balance: 832375843963591,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodeBalance', null, {});
    }
};
