#!/bin/bash

set -e;
set +x;

IMAGE_NAME="backend-api"
CONTAINER_NAME="${IMAGE_NAME}-container"
MONGO_IMAGE_NAME="mongo"
MONGO_CONTAINER_NAME="${MONGO_IMAGE_NAME}-container"
DOCKER_NETWORK_NAME=todolist-network

# user and password from args
MONGO_USER=$1
MONGO_PWD=$2

# split into dev and prod configurations and import them as a source
MONGO_CONTAINER_IP="127.0.0.1"
MONGO_CONTAINER_PORT="27017"
MONGO_CONNECTION_URL="mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_CONTAINER_IP}:${MONGO_CONTAINER_PORT}/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2"

IS_RUNNING_SERVER=$(docker ps -qa --filter name=$CONTAINER_NAME)
IS_RUNNING_MONGO=$(docker ps -qa --filter name=$MONGO_CONTAINER_NAME)
IS_NETWORK_CREATED=$(docker network ls -q --filter name=$DOCKER_NETWORK_NAME)

if [[ -n $IS_RUNNING_SERVER ]]; then
    echo -e "\033[1;31m Cleanup docker container...\033[0m";
    docker stop $CONTAINER_NAME;
fi

if [[ -n $IS_RUNNING_MONGO ]]; then
    echo -e "\033[1;31m Cleanup docker Mongo container...\033[0m";
    docker stop $MONGO_CONTAINER_NAME;
fi

if [[ -n $IS_NETWORK_CREATED ]]; then
    echo -e "\033[1;31m Cleanup docker network...\033[0m";
    docker network rm $DOCKER_NETWORK_NAME;
fi

echo -e "\033[1;31m Creating docker network...\033[0m"
docker network create $DOCKER_NETWORK_NAME;

################################################################################
# Consider using Docker-managed volumes instead of the bind-mount              #
################################################################################
echo -e "\033[1;31m Starting ${MONGO_CONTAINER_NAME}...\033[0m";
docker \
    run \
    --name $MONGO_CONTAINER_NAME \
    --rm \
    -p $MONGO_CONTAINER_PORT:$MONGO_CONTAINER_PORT \
    --network $DOCKER_NETWORK_NAME \
    -d \
    -v /$(pwd)/db/data/volume:/data/db \
    $MONGO_IMAGE_NAME:latest \
    ;

echo -e "\033[1;31m Starting build...\033[0m";
cd server/app && bun dev;
echo -e "\033[1;31m Starting ${CONTAINER_NAME}...\033[0m";
docker \
    run \
    --name $CONTAINER_NAME \
    --rm \
    -p 3001:80 \
    --network $DOCKER_NETWORK_NAME \
    --env MONGO_CONNECTION_URL=$MONGO_CONNECTION_URL \
    -d \
    -v /$(pwd)/app:/app/build \
    $IMAGE_NAME:latest \
    ;
echo -e "\033[1;31m Starting watch...\033[0m";
bun run --watch /app/src/index.ts;

exit 0