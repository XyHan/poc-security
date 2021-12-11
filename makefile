DOCKER = docker-compose -f ./docker-compose.yml -p tellmewhat

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

.PHONY: create-user
create-user:
	curl -H "Content-Type: application/json" \
      -X POST \
      -d '{"email":"dev@dev.com","password":"12345","roles":["SUPER_ADMIN"]}' \
      http://127.0.0.1:3000/users
