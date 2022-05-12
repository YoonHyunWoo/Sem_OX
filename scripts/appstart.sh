#!/bin/bash
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 593634833876.dkr.ecr.ap-northeast-2.amazonaws.com
docker run -p 3000:3000 -d 593634833876.dkr.ecr.ap-northeast-2.amazonaws.com/semox_repo:latest