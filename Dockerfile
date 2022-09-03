FROM node:16

RUN apt-get update
RUN apt-get install lsof
ENTRYPOINT [ "npm install" ]