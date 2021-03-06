module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('GeneralMinerInfo', [{
            version: '1.0.1',
            walletAddress: "t3cc7o3jzopnzh2rfivtuwbqn7xc3i34ng7sepmn2btfh4scod4a2ede3oiyhhwnlpqd2noxdasozwyh2wbjea",
            sectorSize: 5,
            numberOfSectors: 2,
            minerPower: 42534,
            totalPower: 23489324,
            nodeId: 1,
            createdAt: new Date('2018-11-27T13:59:17').toLocaleString(),
            updatedAt: new Date('2018-11-27T13:59:17').toLocaleString()
        },
        {
            version: '1.1.1',
            walletAddress: "t3cc7o3jzopnzh2rfivtuwbqn7xc3i34ng7sepmn2btfh4scod4a2ede3oiyhhwnlpqd2noxdasozwyh2wbjea",
            sectorSize: 5,
            numberOfSectors: 3,
            minerPower: 7685765,
            totalPower: 4898564835324,
            nodeId: 2,
            createdAt: new Date('2019-07-24T23:35:56').toLocaleString(),
            updatedAt: new Date('2019-07-24T23:35:56').toLocaleString()
        },
        {
            version: '2.0.1',
            walletAddress: "q2bc7o3jzopnzh2rfivtuwbqn7xc3i34ng7sepmn2btfh4scod4a2ede3oiyhhwnlpqd2noxdasozwyh2wbjea",
            sectorSize: 10,
            numberOfSectors: 1,
            minerPower: 45645745,
            totalPower: 78485637537,
            nodeId: 3,
            createdAt: new Date('2019-08-19T02:43:28').toLocaleString(),
            updatedAt: new Date('2019-08-19T02:43:28').toLocaleString()
        },
        {
            version: '2.1.1',
            walletAddress: "q2bc7o3jzopnzh2rfivtuwbqn7xc3i34ng7sepmn2btfh4scod4a2ede3oiyhhwnlpqd2noxdasozwyh2wbjea",
            sectorSize: 10,
            numberOfSectors: 6,
            minerPower: 345768568,
            totalPower: 834856848,
            nodeId: 4,
            createdAt: new Date('2019-03-09T21:18:16').toLocaleString(),
            updatedAt: new Date('2019-03-09T21:18:16').toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('GeneralMinerInfo', null, {});
    }
};
