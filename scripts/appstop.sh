#!/bin/bash
docker container rm -f $(docker container ls -aq) > /dev/null 2>&1
docker image rm -f $(docker image ls -q) > /dev/null 2>&1
