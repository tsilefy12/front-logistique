start_dev_container:
	docker-compose up --build

start_dev_container_detach:
	docker-compose up --build -d

start_pord_container:
	docker-compose -f docker-compose.production.yaml up --build

start_pord_container_detach:
	docker-compose -f docker-compose.production.yaml up --build -d

stop_pord_container:
	docker-compose down

stop_dev_container:
	docker-compose -f docker-compose.production.yaml down