module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodeBalance', [{
            balance: 5238,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            balance: 725,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            balance: 4937,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            balance: 1248,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodeBalance', null, {});
    }
};
