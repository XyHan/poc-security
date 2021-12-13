<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Poc Security API

## Installation

```bash
$ npm install
```

## Env var

```bash
$ export DB_HOST=0.0.0.0
$ export DB_PORT=3306
$ export DB_USER=root
$ export DB_PASSWORD=toor
$ export DB_DATABASE=security
```

## Running the app

```bash
# build docker image
$ make start

# if needed, import the database
$ make build-db

# development mode
$ make run-dev

# production mode
$ npm run start:prod
```

## Get a token

```bash
# credentials auth
$ curl -H "Content-Type: application/json" -X POST -d '{"email":"dev@dev.com","password":"12345"}' http://127.0.0.1:3000/login
```

## Basic user management
```bash
# create a user (change credentials to yours)
$ curl -H "Content-Type: application/json" -X POST -d '{"email":"dev@dev.com","password":"12345","roles":["SUPER_ADMIN"]}' http://127.0.0.1:3000/users
  
# update a user (change bearer for a working one)
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjIyMzlhZTMtZDI2Mi00NTJkLTljZDktNTc0MTg5MGZiYTliIiwiZW1haWwiOiJkZXZAZGV2LmNvbSIsImlhdCI6MTYzOTMwNDUzNywiZXhwIjoxNjM5MzkwOTM3fQ.YdZWcP6eJLKRwcA_LtditysS9cC9R7VrVQ8w-Duh0EI" -X PUT -d '{"email":"dev@dev.com","status":0,"roles":["SUPER_ADMIN"]}' http://127.0.0.1:3000/users/f2239ae3-d262-452d-9cd9-5741890fba9b

# delete a user (change bearer for a working one)
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjIyMzlhZTMtZDI2Mi00NTJkLTljZDktNTc0MTg5MGZiYTliIiwiZW1haWwiOiJkZXZAZGV2LmNvbSIsImlhdCI6MTYzOTMwNDUzNywiZXhwIjoxNjM5MzkwOTM3fQ.YdZWcP6eJLKRwcA_LtditysS9cC9R7VrVQ8w-Duh0EI" -X DELETE http://127.0.0.1:3000/users/f2239ae3-d262-452d-9cd9-5741890fba9b
```

## Basic space management
```bash
# create a space (change bearer for a working one)
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjIyMzlhZTMtZDI2Mi00NTJkLTljZDktNTc0MTg5MGZiYTliIiwiZW1haWwiOiJkZXZAZGV2LmNvbSIsImlhdCI6MTYzOTMwNDUzNywiZXhwIjoxNjM5MzkwOTM3fQ.YdZWcP6eJLKRwcA_LtditysS9cC9R7VrVQ8w-Duh0EI" -X POST -d '{"objectableType":3,"objectableUuid":"9999c07c-06c5-453e-bf67-5fa09b9eb480"}' http://127.0.0.1:3000/spaces
  
# delete a space (change bearer for a working one)
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjIyMzlhZTMtZDI2Mi00NTJkLTljZDktNTc0MTg5MGZiYTliIiwiZW1haWwiOiJkZXZAZGV2LmNvbSIsImlhdCI6MTYzOTMwNDUzNywiZXhwIjoxNjM5MzkwOTM3fQ.YdZWcP6eJLKRwcA_LtditysS9cC9R7VrVQ8w-Duh0EI" -X DELETE http://127.0.0.1:3000/spaces/fb2f1bba-3d0e-4f8d-a6a8-fdad2219ce1e
```

## Bind and unbind a user to a space
```bash
# bind a user to a space (change bearer for a working one)
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjIyMzlhZTMtZDI2Mi00NTJkLTljZDktNTc0MTg5MGZiYTliIiwiZW1haWwiOiJkZXZAZGV2LmNvbSIsImlhdCI6MTYzOTMwNDUzNywiZXhwIjoxNjM5MzkwOTM3fQ.YdZWcP6eJLKRwcA_LtditysS9cC9R7VrVQ8w-Duh0EI" -X POST -d '{"permissions":["USER"]}' http://127.0.0.1:3000/user/f2239ae3-d262-452d-9cd9-5741890fba9b/space/fb2f1bba-3d0e-4f8d-a6a8-fdad2219ce1e
  
# unbind a user to a space (change bearer for a working one)
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjIyMzlhZTMtZDI2Mi00NTJkLTljZDktNTc0MTg5MGZiYTliIiwiZW1haWwiOiJkZXZAZGV2LmNvbSIsImlhdCI6MTYzOTMwNDUzNywiZXhwIjoxNjM5MzkwOTM3fQ.YdZWcP6eJLKRwcA_LtditysS9cC9R7VrVQ8w-Duh0EI" -X DELETE http://127.0.0.1:3000/user/f2239ae3-d262-452d-9cd9-5741890fba9b/space/83ae7ade-42db-4cd8-8f0f-2a1c15ab9a1d
```

## Get user with spaces
```bash
# get one user by uuid (change bearer for a working one)
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjIyMzlhZTMtZDI2Mi00NTJkLTljZDktNTc0MTg5MGZiYTliIiwiZW1haWwiOiJkZXZAZGV2LmNvbSIsImlhdCI6MTYzOTMwNDUzNywiZXhwIjoxNjM5MzkwOTM3fQ.YdZWcP6eJLKRwcA_LtditysS9cC9R7VrVQ8w-Duh0EI" -X GET http://127.0.0.1:3000/users/f2239ae3-d262-452d-9cd9-5741890fba9b

{
    "email": "dev@dev.com",
    "createdAt": "2021-12-11T16:47:07.000Z",
    "createdBy": "f2239ae3-d262-452d-9cd9-5741890fba9b",
    "updatedAt": "2021-12-11T16:47:07.000Z",
    "updatedBy": "f2239ae3-d262-452d-9cd9-5741890fba9b",
    "uuid": "f2239ae3-d262-452d-9cd9-5741890fba9b",
    "status": 1,
    "roles": [
        "SUPER_ADMIN"
    ],
    "userSpaces": [
        {
            "space": {
                "uuid": "83ae7ade-42db-4cd8-8f0f-2a1c15ab9a1d",
                "createdAt": "2021-12-11T16:59:07.000Z",
                "createdBy": "f2239ae3-d262-452d-9cd9-5741890fba9b",
                "updatedAt": "2021-12-11T16:59:07.000Z",
                "updatedBy": "f2239ae3-d262-452d-9cd9-5741890fba9b",
                "status": 1,
                "objectableType": 2,
                "objectableUuid": "799e3ce3-645a-4097-a58d-a6638dd83840"
            },
            "createdAt": "2021-12-11T19:52:52.000Z",
            "createdBy": "f2239ae3-d262-452d-9cd9-5741890fba9b",
            "permissions": [
                "ADMIN"
            ]
        }
    ]
}

# get my user (change bearer for a working one)
$ curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjIyMzlhZTMtZDI2Mi00NTJkLTljZDktNTc0MTg5MGZiYTliIiwiZW1haWwiOiJkZXZAZGV2LmNvbSIsImlhdCI6MTYzOTMwNDUzNywiZXhwIjoxNjM5MzkwOTM3fQ.YdZWcP6eJLKRwcA_LtditysS9cC9R7VrVQ8w-Duh0EI" -X GET http://127.0.0.1:3000/users
```

## Test

```bash
# unit tests
$ npm run test
```

## License

Nest and this POC are [MIT licensed](LICENSE).
