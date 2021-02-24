

# WebSocket component
docker-build-websocket:
	docker build -f server/src/ApiGateways/WebSocket/Web.Socket/Dockerfile -t waterball/allegro-websocket:latest server/src/

docker-push-websocket:
	docker push waterball/allegro-websocket:latest

# WebApi component
docker-build-webapi:
	docker build -f server/src/ApiGateways/Web/Web.API/Dockerfile -t waterball/allegro-webapi:latest server/src/

docker-push-webapi:
	docker push waterball/allegro-webapi:latest

# Quizzer component
docker-build-quizzer:
	docker build -f server/src/Services/Quizer/Quiz.API/Dockerfile -t waterball/allegro-quizzer:latest server/src/

docker-push-quizzer:
	docker push waterball/allegro-quizzer:latest

build-frontend-web:
	cd ./frontend && yarn && yarn run build:web