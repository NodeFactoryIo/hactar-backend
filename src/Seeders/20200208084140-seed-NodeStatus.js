module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodeStatus', [
        {
            isUp: true,
            isReported: true,
            nodeId: 1,
            createdAt: new Date('2018-05-05T17:59:53').toLocaleString(),
            updatedAt: new Date('2018-05-05T17:59:53').toLocaleString()
        },
        {
            isUp: true,
            isReported: true,
            nodeId: 2,
            createdAt: new Date('2018-05-05T17:59:53').toLocaleString(),
            updatedAt: new Date('2018-05-05T17:59:53').toLocaleString()
        },
        {
            isUp: false,
            isReported: true,
            nodeId: 3,
            createdAt: new Date('2018-05-05T17:59:53').toLocaleString(),
            updatedAt: new Date('2018-05-05T17:59:53').toLocaleString()
        },
        {
            isUp: false,
            isReported: true,
            nodeId: 4,
            createdAt: new Date('2018-05-05T17:59:53').toLocaleString(),
            updatedAt: new Date('2018-05-05T17:59:53').toLocaleString()
        },
        {
            isUp: false,
            isReported: false,
            nodeId: 5,
            createdAt: new Date('2018-05-05T17:59:53').toLocaleString(),
            updatedAt: new Date('2018-05-05T17:59:53').toLocaleString()
        },
        {
            isUp: false,
            isReported: false,
            nodeId: 6,
            createdAt: new Date('2018-05-05T17:59:53').toLocaleString(),
            updatedAt: new Date('2018-05-05T17:59:53').toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodeBalance', null, {});
    }
};
