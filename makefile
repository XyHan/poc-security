#!make
include .env
export $(shell sed 's/=.*//' .env)

DOCKER = docker-compose -f ./docker-compose.yml -p poc-security

.PHONY: start
start: erase build up

.PHONY: stop
stop:
	$(DOCKER) stop

.PHONY: erase
erase:
	$(DOCKER) stop
	$(DOCKER) rm -v -f

.PHONY: build
build:
	$(DOCKER) build

.PHONY: up
up:
	$(DOCKER) up -d

.PHONY: run
run:
	npm run start

.PHONY: run-dev
run-dev:
	npm run start:dev

.PHONY: build-db
build-db:
	docker exec -i poc-security-mysql mysql -u root -ptoor -e "CREATE DATABASE IF NOT EXISTS security"
	docker exec -i poc-security-mysql mysql -u root -ptoor -D security < ./docker/mysql/security.sql

.PHONY: create-user
create-user:
	curl -H "Content-Type: application/json" \
      -X POST \
      -d '{"email":"dev@dev.com","password":"12345","roles":["SUPER_ADMIN"]}' \
      http://127.0.0.1:3000/users
