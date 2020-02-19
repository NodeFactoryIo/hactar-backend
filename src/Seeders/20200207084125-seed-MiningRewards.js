module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('MiningRewards', [{
            cid: 's9a8ghw3pegq57jiwoew35te',
            rewardAmount: 598095274278474,
            nodeId: 1,
            createdAt: new Date('2019-01-27T12:39:01').toLocaleString(),
            updatedAt: new Date('2019-01-27T12:39:01').toLocaleString()
        },
            {
                cid: 'an93fw40gona8sfb7qifo',
                rewardAmount: 679194967572963429,
                nodeId: 1,
                createdAt: new Date('2019-10-19T23:56:40').toLocaleString(),
                updatedAt: new Date('2019-10-19T23:56:40').toLocaleString()
            },
            {
                cid: 'o3pd0fs9na4s0dkasefd83r74',
                rewardAmount: 7255926457276155,
                nodeId: 2,
                createdAt: new Date('2018-03-23T16:09:01').toLocaleString(),
                updatedAt: new Date('2018-03-23T16:09:01').toLocaleString()
            },
            {
                cid: 'n2a03ra4s83rngj43nsa82rbif',
                rewardAmount: 8421919245093,
                nodeId: 2,
                createdAt: new Date('2018-06-03T23:01:48').toLocaleString(),
                updatedAt: new Date('2018-06-03T23:01:48').toLocaleString()
            }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('MiningRewards', null, {});
    }
};
