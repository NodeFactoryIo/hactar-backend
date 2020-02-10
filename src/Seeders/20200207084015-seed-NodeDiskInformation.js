module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodeDiskInformation', [{
            freeSpace: 1203214536,
            takenSpace: 453463,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            freeSpace: 43980345823,
            takenSpace: 32509235,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            freeSpace: 684562576,
            takenSpace: 536527,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            freeSpace: 3278470912,
            takenSpace: 6275754,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodeDiskInformation', null, {});
    }
};
