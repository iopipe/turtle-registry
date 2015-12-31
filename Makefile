all:
	build
	run

build:
	docker-compose build

run-ssl:
	docker-compose run letsencrypt
	docker-compose up -d web ssl

run-dev:
	docker-compose build
	docker-compose up web

run:
	docker-compose up -d web
