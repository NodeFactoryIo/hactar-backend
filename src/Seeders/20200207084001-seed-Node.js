module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Nodes', [{
            url: 'https://mynode.com/213',
            token: 'eRDbSVfo5z7WsTQVXQpQZm4i4a3qqGz6',
            address: 'r2d205',
            userId: 1,
            createdAt: new Date('2018-10-24T12:33:21').toLocaleString(),
            updatedAt: new Date('2018-10-24T12:33:21').toLocaleString()
        },
        {
            url: 'https://mynode.com/9834',
            token: '0cBDSwbCeF56tdkyK3SL7AxG4H0CzkiM',
            address: 'k0fr82',
            userId: 1,
            createdAt: new Date('2019-05-20T20:34:33').toLocaleString(),
            updatedAt: new Date('2019-05-20T20:34:33').toLocaleString()
        },
        {
            url: 'https://mynode.com/7843',
            token: '3yPlLa5E8Ni8WNiVAgRFPhvbA9JRqkI3',
            address: 'c4los84',
            userId: 2,
            createdAt: new Date('2018-01-04T12:51:35').toLocaleString(),
            updatedAt: new Date('2018-01-04T12:51:35').toLocaleString()
        },
        {
            url: 'https://mynode.com/483234',
            token: 'czRsr3eKHRUR2107rCIhSg7LUCAa5xoh',
            address: 's04mf65',
            userId: 2,
            createdAt: new Date('2019-06-27T20:17:45').toLocaleString(),
            updatedAt: new Date('2019-06-27T20:17:45').toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Nodes', null, {});
    }
};
