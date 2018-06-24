const ElasticsearchService = require('./elasticsearchService');

async function getAllItems() {
    const elasticService = new ElasticsearchService();

    let allItems = [];
    let actualData = await elasticService.getScrollableItems();
    const allItemsCount = actualData.hits.total;

    while (allItems.length < allItemsCount) {
        allItems = [...allItems, ...actualData.hits.hits];
        actualData = await elasticService.getScrolledItems(actualData._scroll_id);
    }

    return allItems.map(({ _source }) => ({
        name: _source.name,
        size: _source.size,
    }));
}

function insertObject(name, size, result) {
    if (!name) return;
    const [first, ...rest] = name.split(' > ');
    let foundNode = result.find(({ name }) => name === first);
    if (!foundNode) {
        foundNode = {
            name: first,
            children: [],
        };
        result.push(foundNode);
    }

    if (rest.length && rest[0] !== '') {
        insertObject(rest.join(' > '), size, foundNode.children);
        return;
    }

    foundNode.size = size;
}

function transformData(itemsArray) {
    const result = [];
    itemsArray.forEach(({ name, size }) => insertObject(name, size, result));
    return result;
}

exports.transformData = transformData;
exports.api = async function api(event, context, callback) {
    const allItems = await getAllItems();
    const transformedItems = transformData(allItems);

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify(transformedItems),
    };

    callback(null, response);
}