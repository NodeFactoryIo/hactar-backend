module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('MiningRewards', [{
            cid: 's9a8ghw3pegq57jiwoew35te',
            rewardAmount: 598095274278474,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            cid: 'an93fw40gona8sfb7qifo',
            rewardAmount: 679194967572963429,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            cid: 'o3pd0fs9na4s0dkasefd83r74',
            rewardAmount: 7255926457276155,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            cid: 'n2a03ra4s83rngj43nsa82rbif',
            rewardAmount: 8421919245093,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('MiningRewards', null, {});
    }
};
