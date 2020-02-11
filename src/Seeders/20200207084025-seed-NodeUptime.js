module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodeUptime', [{
            isWorking: true,
            nodeId: 1,
            createdAt: new Date('2018-06-11T17:59:40').toLocaleString(),
            updatedAt: new Date('2018-06-11T17:59:40').toLocaleString()
        },
        {
            isWorking: false,
            nodeId: 1,
            createdAt: new Date('2018-09-23T21:39:44').toLocaleString(),
            updatedAt: new Date('2018-09-23T21:39:44').toLocaleString()
        },
        {
            isWorking: true,
            nodeId: 2,
            createdAt: new Date('2019-03-08T13:58:12').toLocaleString(),
            updatedAt: new Date('2019-03-08T13:58:12').toLocaleString()
        },
        {
            isWorking: false,
            nodeId: 2,
            createdAt: new Date('2018-10-14T12:54:00').toLocaleString(),
            updatedAt: new Date('2018-10-14T12:54:00').toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodeUptime', null, {});
    }
};
