# Operam fullstack engineer interview task
Result [visualisation](https://jcobbsk.github.io/elastic-visualisation/)

## Task
Task was to fetch xml dataset from s3 bucket, transform it to linear form and store it in database. Than create api endpoint for retrieval of the data in JSON structure and write SPA in react to visualize it.

## Solution
I am very interested in serverless movement lately, so I decided to use aws serverless stack with [serverless framework](https://serverless.com/).

I created a lambda function to fetch, transform and save dataset, and one lambda to retrieve data from database and transform it to JSON object, this lambda is also publicly exposed via http request and enabled cors.

As data storage I've decided to use Elasticsearch hosted on aws. Elasticsearch was basically created for full text storage and search and as our data had to be linearized to text form it was imho perfect fit (I also really wanted to put my hands on elasticsearch for a long time and never got chance ;) ).

For visualisation I went for [react-static-boilerplate](https://github.com/koistya/react-static-boilerplate) with heavy modifications (meaning: I've deleted a LOT of useless things). I've used react + redux and for styling and layout I've used react-bootstrap.