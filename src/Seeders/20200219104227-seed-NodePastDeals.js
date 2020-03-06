module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('NodePastDeals', [
            {
                cid: 'mof2iin023finm23imfp',
                state: 7,
                size: 35236547456,
                provider: 't01440',
                price: 200000000,
                duration: 16,
                nodeId: 1,
                createdAt: new Date('2020-01-03T14:17:53').toLocaleString(),
                updatedAt: new Date('2020-01-03T14:17:53').toLocaleString()
            },
            {
                cid: 'inef2iefn02f84f9uwbqd',
                state: 2,
                size: 345235424366,
                provider: 't01440',
                price: 500000000,
                duration: 10,
                nodeId: 2,
                createdAt: new Date('2019-01-15T10:10:44').toLocaleString(),
                updatedAt: new Date('2019-01-15T10:10:44').toLocaleString()
            },
            {
                cid: 'mdi023nf8b2cdion2',
                state: 1,
                size: 213532724,
                provider: 't0101',
                price: 211000000000,
                duration: 32,
                nodeId: 3,
                createdAt: new Date('2020-02-10T11:03:00').toLocaleString(),
                updatedAt: new Date('2020-02-10T11:03:00').toLocaleString()
            },
            {
                cid: '029fjf9p23hidj23ldk',
                state: 5,
                size: 13743434632,
                provider: 't01440',
                price: 2400000,
                duration: 26,
                nodeId: 4,
                createdAt: new Date('2018-01-02T09:23:11').toLocaleString(),
                updatedAt: new Date('2018-01-02T09:23:11').toLocaleString()
            },
            {
                cid: '0923fjhihsouahd8hf4334g',
                state: 3,
                size: 542787123444,
                provider: 't01440',
                price: 900000000,
                duration: 7,
                nodeId: 5,
                createdAt: new Date('2020-02-13T05:02:58').toLocaleString(),
                updatedAt: new Date('2020-02-13T05:02:58').toLocaleString()
            },
            {
                cid: 'mjkdn092fn03n49j3pf',
                state: 4,
                size: 1347658567536314,
                provider: 't01441',
                price: 700000000,
                duration: 4,
                nodeId: 6,
                createdAt: new Date('2020-01-25T20:48:12').toLocaleString(),
                updatedAt: new Date('2020-01-25T20:48:12').toLocaleString()
            },
            {
                cid: 'mjkdn092fn03n49j3pf',
                state: 1,
                size: 1347658567536314,
                provider: 't01441',
                price: 654000000,
                duration: 44,
                nodeId: 1,
                createdAt: new Date('2020-01-25T20:48:12').toLocaleString(),
                updatedAt: new Date('2020-01-25T20:48:12').toLocaleString()
            },
          {
            cid: 'aca092fn03n49j3pf',
            state: 1,
            size: 1237658567536314,
            provider: 't01441',
            price: 6034000000,
            duration: 44,
            nodeId: 1,
            createdAt: new Date('2020-01-25T23:48:12').toLocaleString(),
            updatedAt: new Date('2020-01-25T20:48:12').toLocaleString()
          },
          {
            cid: 'bafyreiaxl446wlnu6t6dpq4ivrjf4gda4gvsoi4rr6mpxau7z25xvk5pl4',
            state: 1,
            size: 9968567536314,
            provider: 't01441',
            price: 654000000,
            duration: 44,
            nodeId: 1,
            createdAt: new Date('2020-01-25T20:48:12').toLocaleString(),
            updatedAt: new Date('2020-01-25T20:48:12').toLocaleString()
          },
          {
            cid: '4p2DKKHYLP5EjWS88EjZ8e54ucptYbEbljRm2GGeWGs4vb',
            state: 1,
            size: 4668567536314,
            provider: 't01441',
            price: 6540000000,
            duration: 200,
            nodeId: 1,
            createdAt: new Date('2020-01-26T10:18:12').toLocaleString(),
            updatedAt: new Date('2020-01-26T10:18:12').toLocaleString()
          },
          {
            cid: 'toDAGvSk55SixZ3SYTweS5T09D7xwAFx8xoKGPFf069xwD',
            state: 0,
            size: 918368567536314,
            provider: 't01441',
            price: 6540000000,
            duration: 200,
            nodeId: 1,
            createdAt: new Date('2020-01-26T13:48:12').toLocaleString(),
            updatedAt: new Date('2020-01-26T13:48:12').toLocaleString()
          },
          {
            cid: 'RPqOrbqmnGYorMSUXgKc5HU5BpejiPVBOlTlxLxJ3wcBt6',
            state: 7,
            size: 918368567536314,
            provider: 't01441',
            price: 6000000000,
            duration: 3000,
            nodeId: 1,
            createdAt: new Date('2020-01-26T13:48:12').toLocaleString(),
            updatedAt: new Date('2020-01-26T13:48:12').toLocaleString()
          },
          {
            cid: 'D4IQcleqMcKIa9oPTclqqztXEnSfnRDR17FGHMQYDnyz6z',
            state: 6,
            size: 68567536314,
            provider: 't01441',
            price: 6000000000,
            duration: 30,
            nodeId: 1,
            createdAt: new Date('2020-01-26T19:22:12').toLocaleString(),
            updatedAt: new Date('2020-01-26T19:22:12').toLocaleString()
          },
          {
            cid: 'ygguRf45UTIAGv7Z7iK0MHKticIx8ZRtfeUy1WHQQguVxW',
            state: 5,
            size: 1856753631400,
            provider: 't01441',
            price: 40000000000,
            duration: 50,
            nodeId: 1,
            createdAt: new Date('2020-01-26T23:20:12').toLocaleString(),
            updatedAt: new Date('2020-01-26T23:20:12').toLocaleString()
          }
        ], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('NodePastDeals', null, {});
    }
};
