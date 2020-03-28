# clothing-price-comparator-api
API to compare plus-size clothing prices

## Prerequisites

* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* Docker - [Download & Install Docker](https://docs.docker.com/install/)

## Usage

Clone the repository then:

```bash
npm install
```

* `npm start` (start the server)

* `npm build` (build the code)

* `npm run watch:server` (start the server and automatic build the code)

* `npm run watch:build` (automatic build the code)

## Run
```console
docker-compose up
```

## Endpoints

|Method | 	Url		| 	Description |
|-------| ------- | ----------- |
|GET|/api/products?category=| 	get 3 products, from 3 different stores, in descending order by price|
