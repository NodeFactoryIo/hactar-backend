module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('MiningRewards', [{
            cid: 's9a8ghw3pegq57jiwoew35te',
            rewardAmount: 50,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            cid: 'an93fw40gona8sfb7qifo',
            rewardAmount: 37,
            nodeId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            cid: 'o3pd0fs9na4s0dkasefd83r74',
            rewardAmount: 82,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            cid: 'n2a03ra4s83rngj43nsa82rbif',
            rewardAmount: 14,
            nodeId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('MiningRewards', null, {});
    }
};
