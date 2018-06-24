const { transformData } = require('../api');

describe('api', () => {
    describe('#transformData()', () => {
        it('should return correct structure', () => {
            const mockedItems = [{
                name: 'A > B',
                size: 2,
            }, {
                name: 'A > B > C',
                size: 0,
            }, {
                name: 'A > B > D',
                size: 0,
            }, {
                name: 'A',
                size: 4,
            }];

            const sut = transformData(mockedItems);

            expect(sut).toEqual([{
                name: 'A',
                size: 4,
                children: [{
                    name: 'B',
                    size: 2,
                    children: [{
                        name: 'C',
                        size: 0,
                        children: [],
                    }, {
                        name: 'D',
                        size: 0,
                        children: [],
                    }],
                }],
            }]);
        });
    });
});