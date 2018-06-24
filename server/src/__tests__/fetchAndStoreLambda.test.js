const fs = require('fs');

const {
    parseXMLData,
    linearizeXMLObject,
    fetchAndStore,
} = require('../fetchAndStoreLambda');

async function readXML() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/mockStructure.xml', 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

async function getMockedXMLObject() {
    const xmlData = await readXML();
    const xmlObject = await parseXMLData(xmlData);
    return xmlObject;
}

describe('fetchAndStoreLambda', () => {
    describe('#parseXMLData()', async () => {
        
        it('returns object representation of mocked xml file', async () => {
            const xmlData = await readXML();

            const sut = await parseXMLData(xmlData);

            expect(sut.ImageNetStructure).toBeDefined();
            expect(sut.ImageNetStructure.releaseData).toEqual(['Release Data']);
            expect(sut.ImageNetStructure.synset.length).toEqual(1);
            expect(sut.ImageNetStructure.synset[0].$.wnid).toEqual('1');
            expect(sut.ImageNetStructure.synset[0].synset.length).toEqual(2);
            expect(sut.ImageNetStructure.synset[0].synset[0].synset.length).toEqual(3);
        });
    });

    describe('#linearizeXMLObject()', () => {
        it('returns correct name and size for root', async () => {
            const xmlObject = await getMockedXMLObject();

            const sut = linearizeXMLObject(xmlObject);

            expect(sut[0].name).toEqual('1st level');
            expect(sut[0].size).toEqual(8);
        });
        it('returns correct number of items', async () => {
            const xmlObject = await getMockedXMLObject();

            const sut = linearizeXMLObject(xmlObject);

            expect(sut.length).toEqual(9);
        });
        it('returns nested objects with joined names', async () => {
            const xmlObject = await getMockedXMLObject();

            const sut = linearizeXMLObject(xmlObject);

            const foundNestedItem = !!sut.find(({ name, size }) => {
                return name === '1st level > 2nd level 0 item > 3rd level 1st item' && size === 0;
            });

            const foundCorrectRootItem = !!sut.find(({ name, size }) => {
                return name === '1st level' && size === 8;
            });

            expect(foundNestedItem).toEqual(true);
            expect(foundCorrectRootItem).toEqual(true);
        });
    });
});