#!/bin/bash
docker container rm -f $(docker container ls -aq)
docker image rm -f $(docker image ls -q)
