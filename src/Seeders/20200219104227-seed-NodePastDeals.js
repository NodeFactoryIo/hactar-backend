module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodePastDeals', [
            {
                cid: 'mof2iin023finm23imfp',
                state: 7,
                size: 35236547456,
                provider: 'v913nrhvs08',
                price: 82,
                duration: 16,
                nodeId: 1,
                createdAt: new Date('2020-01-03T14:17:53').toLocaleString(),
                updatedAt: new Date('2020-01-03T14:17:53').toLocaleString()
            },
            {
                cid: 'inef2iefn02f84f9uwbqd',
                state: 2,
                size: 345235424366,
                provider: 'fm139fh91',
                price: 5,
                duration: 10,
                nodeId: 2,
                createdAt: new Date('2019-01-15T10:10:44').toLocaleString(),
                updatedAt: new Date('2019-01-15T10:10:44').toLocaleString()
            },
            {
                cid: 'mdi023nf8b2cdion2',
                state: 1,
                size: 213532724,
                provider: 'f03n19fho2uh',
                price: 211,
                duration: 32,
                nodeId: 3,
                createdAt: new Date('2020-02-10T11:03:00').toLocaleString(),
                updatedAt: new Date('2020-02-10T11:03:00').toLocaleString()
            },
            {
                cid: '029fjf9p23hidj23ldk',
                state: 5,
                size: 13743434632,
                provider: '10d3j1pod',
                price: 24,
                duration: 26,
                nodeId: 4,
                createdAt: new Date('2018-01-02T09:23:11').toLocaleString(),
                updatedAt: new Date('2018-01-02T09:23:11').toLocaleString()
            },
            {
                cid: '0923fjhihsouahd8hf4334g',
                state: 3,
                size: 542787123444,
                provider: '0n1824b',
                price: 9,
                duration: 7,
                nodeId: 5,
                createdAt: new Date('2020-02-13T05:02:58').toLocaleString(),
                updatedAt: new Date('2020-02-13T05:02:58').toLocaleString()
            },
            {
                cid: 'mjkdn092fn03n49j3pf',
                state: 4,
                size: 1347658567536314,
                provider: 'g462h2h46',
                price: 7,
                duration: 4,
                nodeId: 6,
                createdAt: new Date('2020-01-25T20:48:12').toLocaleString(),
                updatedAt: new Date('2020-01-25T20:48:12').toLocaleString()
            }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodePastDeals', null, {});
    }
};
