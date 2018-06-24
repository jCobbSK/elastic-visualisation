const https = require('https');
const { parseString } = require('xml2js');

const ElasticsearchService = require('./elasticsearchService');

const CATEGORY_JOIN_CHAR = ' > ';
const BULK_SIZE = 100;

function fetchXML() {
    return new Promise((resolve, reject) => {
        console.time('FetchXML');
        https.request({
            hostname: 's3.amazonaws.com',
            path: '/static.operam.com/assignment/structure_released.xml',
            method: 'GET'
        }, (result) => {
            let xmlData = '';
            result.on('data', (chunk) => {
                xmlData += chunk;
            });
            result.on('end', () => {
                console.timeEnd('FetchXML');
                resolve(xmlData);
            });
        }).end();
    });
}

function parseXMLData(data) {
    return new Promise((resolve, reject) => {
        parseString(data, (error, result) => {
            if (error) {
                return reject(error);
            }

            resolve(result);
        });
    });
}

function traverseObject(xmlObject, name, result) {
    const namePrefix = name ? `${name}${CATEGORY_JOIN_CHAR}` : '';
    if (!xmlObject.synset || xmlObject.synset.length === 0) {
        result.unshift({
            name: `${namePrefix}${xmlObject.$.words}`,
            size: 0,
        });
        return 0;
    }

    const currentName = `${namePrefix}${xmlObject.$.words}`;
    const nestedCount = xmlObject.synset.reduce((counter, object) => {
        return counter += traverseObject(object, currentName, result);
    }, 0);
    const count = nestedCount + xmlObject.synset.length;

    result.unshift({
        name: currentName,
        size: count,
    });
    return count;
}

function linearizeXMLObject(xmlObject) {
    const result = [];
    console.time('Linearize');
    xmlObject.ImageNetStructure.synset.forEach((object) => {
        traverseObject(object, '', result);
    });
    console.timeEnd('Linearize');
    return result;
}

async function fetchAndTransformData() {
    const xmlString = await fetchXML();
    const xmlObject = await parseXMLData(xmlString);
    return linearizeXMLObject(xmlObject);
}

function storeData(data) {
    const elasticService = new ElasticsearchService();

    // we need to split data into chunks as we are getting Request Entity Too Large if push alltogether
    const bulkRequests = [];
    let index = 0;
    for (let i=0, len = data.length; i < len; i += BULK_SIZE) {
        const partialArray = data.slice(i, i + BULK_SIZE);
        bulkRequests.push(
            elasticService.pushItems(partialArray),
        );
    }

    return Promise.all(bulkRequests);
}

exports.parseXMLData = parseXMLData;
exports.linearizeXMLObject = linearizeXMLObject;

exports.fetchAndStoreLambda = async function fetchAndStoreLambda(event, context, callback) {
    const elasticService = new ElasticsearchService();
    try {
        // just clear elastic before we fill it up again
        console.time('Delete index');
        await elasticService.deleteIndex();
        console.timeEnd('Delete index');
        console.time('Init index');
        await elasticService.initIndex();
        console.timeEnd('Init index');
        console.time('Fetch and transform');
        const data = await fetchAndTransformData();
        console.timeEnd('Fetch and transform');
        console.time('Store');
        const result = await storeData(data);
        console.timeEnd('Store');
        callback(null, 'Successfully stored in elastic search');
    } catch(err) {
        callback(err);
    }
}