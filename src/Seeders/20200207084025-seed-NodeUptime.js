module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodeUptime', [
            {// NODE_1
                isWorking: true,
                nodeId: 1,
                createdAt: new Date('2019-06-11T17:59:40').toLocaleString(),
                updatedAt: new Date('2019-06-11T17:59:40').toLocaleString()
            },
            {
                isWorking: false,
                nodeId: 1,
                createdAt: new Date('2019-06-11T18:59:42').toLocaleString(),
                updatedAt: new Date('2019-06-11T18:59:42').toLocaleString()
            },
            {
                isWorking: true,
                nodeId: 1,
                createdAt: new Date('2019-06-11T19:59:40').toLocaleString(),
                updatedAt: new Date('2019-06-11T19:59:40').toLocaleString()
            },
            {// NODE_2
                isWorking: false,
                nodeId: 2,
                createdAt: new Date('2019-03-08T13:58:12').toLocaleString(),
                updatedAt: new Date('2019-03-08T13:58:12').toLocaleString()
            },
            {
                isWorking: true,
                nodeId: 2,
                createdAt: new Date('2018-10-14T12:54:00').toLocaleString(),
                updatedAt: new Date('2018-10-14T12:54:00').toLocaleString()
            },
            {// NODE_3
                isWorking: true,
                nodeId: 3,
                createdAt: new Date('2019-06-12T19:59:40').toLocaleString(),
                updatedAt: new Date('2019-06-12T19:59:40').toLocaleString()
            },
            {// NODE_4
                isWorking: false,
                nodeId: 4,
                createdAt: new Date('2019-06-12T19:59:40').toLocaleString(),
                updatedAt: new Date('2019-06-12T19:59:40').toLocaleString()
            },
            {// NODE_5
                isWorking: true,
                nodeId: 5,
                createdAt: new Date('2019-06-13T19:59:40').toLocaleString(),
                updatedAt: new Date('2019-06-13T19:59:40').toLocaleString()
            },
            {// NODE_6
                isWorking: false,
                nodeId: 6,
                createdAt: new Date('2019-06-13T19:59:40').toLocaleString(),
                updatedAt: new Date('2019-06-13T19:59:40').toLocaleString()
            },
            {// NODE_7
                isWorking: true,
                nodeId: 7,
                createdAt: new Date('2019-06-13T19:59:40').toLocaleString(),
                updatedAt: new Date('2019-06-13T19:59:40').toLocaleString()
            },
            {// NODE_8
                isWorking: false,
                nodeId: 8,
                createdAt: new Date('2019-06-13T19:59:40').toLocaleString(),
                updatedAt: new Date('2019-06-13T19:59:40').toLocaleString()
            },], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodeUptime', null, {});
    }
};
