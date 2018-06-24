const AWS = require('aws-sdk');
const elasticsearchClient = require('elasticsearch');
const httpAwsEs = require('http-aws-es');
const uuidv1 = require('uuid/v1');

AWS.config.region = 'us-east-1';

const INDEX_NAME = 'category_item';
const INDEX_TYPE = 'category_item_type';

class Elasticsearch {
    constructor() {
        this.client = elasticsearchClient.Client({
            hosts: process.env.elasticURL,
            connectionClass: httpAwsEs,
            amazonES: {
                region: 'us-east-1',
                credentials: new AWS.EnvironmentCredentials('AWS'),
            },
        });
    }

    initIndex() {
        return this.client.indices.create({
            index: INDEX_NAME,
        });
    }

    deleteIndex() {
        return this.client.indices.delete({
            index: INDEX_NAME,
        });
    }

    pushItems(arrayOfItems) {
        let body = [];
        arrayOfItems.forEach(({ name, size}) => {
            body.push({
                create: {
                    _index: INDEX_NAME,
                    _type: INDEX_TYPE,
                    _id: uuidv1(),
                },
            });
            body.push({
                name,
                size,
            });
        });
        return this.client.bulk({
            body,
        });
    }

    getScrollableItems() {
        return this.client.search({
            index: INDEX_NAME,
            type: INDEX_TYPE,
            _source: ['name', 'size'],
            scroll: '1m', 
            size: 10000,
            body: {
                query: {
                    match_all: {},
                },
            },
        });
    }

    getScrolledItems(scrollId) {
        return this.client.scroll({
            scrollId,
            scroll: '1m',
        });
    }
}

module.exports = Elasticsearch;