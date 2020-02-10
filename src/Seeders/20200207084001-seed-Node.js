module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Nodes', [{
            url: 'https://mynode.com/213',
            token: 'eRDbSVfo5z7WsTQVXQpQZm4i4a3qqGz6',
            address: 'r2d205',
            userId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            url: 'https://mynode.com/9834',
            token: '0cBDSwbCeF56tdkyK3SL7AxG4H0CzkiM',
            address: 'k0fr82',
            userId: 1,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            url: 'https://mynode.com/7843',
            token: '3yPlLa5E8Ni8WNiVAgRFPhvbA9JRqkI3',
            address: 'c4los84',
            userId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        },
        {
            url: 'https://mynode.com/483234',
            token: 'czRsr3eKHRUR2107rCIhSg7LUCAa5xoh',
            address: 's04mf65',
            userId: 2,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Nodes', null, {});
    }
};
