### Setup

## Deploy
```
npm install
npm install -g serverless
sls deploy
```

## Invoke fetch
On deployed lambda:
`serverless invoke --function fetchAndStoreLambda` - tricky at the moment because
of lambda limitations

From local machine:
`elasticURL="url of elasticsearch cluster" serverless invoke local --function fetchAndStoreLambda`

## Get normalized API
On deployed lambda:
Request generated lambda /api

From local machine:
`elasticURL="url of elasticsearch cluster" serverless invoke local --function api`

## Run tests
`npm run test`