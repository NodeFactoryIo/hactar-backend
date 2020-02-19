module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodeBalance', [{
            balance: 6926520399982608,
            nodeId: 1,
            createdAt: new Date('2018-05-05T17:59:53').toLocaleString(),
            updatedAt: new Date('2018-05-05T17:59:53').toLocaleString()
        },
            {
                balance: 78974914234696,
                nodeId: 1,
                createdAt: new Date('2020-01-14T07:51:19').toLocaleString(),
                updatedAt: new Date('2020-01-14T07:51:19').toLocaleString()
            },
            {
                balance: 8537124947501041,
                nodeId: 2,
                createdAt: new Date('2020-01-11T06:41:48').toLocaleString(),
                updatedAt: new Date('2020-01-11T06:41:48').toLocaleString()
            },
            {
                balance: 832375843963591,
                nodeId: 2,
                createdAt: new Date('2018-07-09T09:37:34').toLocaleString(),
                updatedAt: new Date('2018-07-09T09:37:34').toLocaleString()
            }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodeBalance', null, {});
    }
};
