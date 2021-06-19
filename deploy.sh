#!/bin/bash
# Deploy script

echo "Starting build..."

cd /opt/squash

git pull

docker-compose down

docker-compose build

docker-compose up -d
