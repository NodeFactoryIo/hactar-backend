module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodeDiskInformation', [{
            freeSpace: 60979790489,
            takenSpace: 13461441722,
            nodeId: 1,
            createdAt: new Date('2019-08-06T14:05:49').toLocaleString(),
            updatedAt: new Date('2019-08-06T14:05:49').toLocaleString()
        },
        {
            freeSpace: 252125334364,
            takenSpace: 234464127878,
            nodeId: 1,
            createdAt: new Date('2019-07-10T13:35:56').toLocaleString(),
            updatedAt: new Date('2019-07-10T13:35:56').toLocaleString()
        },
        {
            freeSpace: 4338609729367,
            takenSpace: 254324525262,
            nodeId: 2,
            createdAt: new Date('2018-03-26T16:37:55').toLocaleString(),
            updatedAt: new Date('2018-03-26T16:37:55').toLocaleString()
        },
        {
            freeSpace: 5184150281876,
            takenSpace: 954334217064,
            nodeId: 2,
            createdAt: new Date('2019-07-26T19:51:46').toLocaleString(),
            updatedAt: new Date('2019-07-26T19:51:46').toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodeDiskInformation', null, {});
    }
};
