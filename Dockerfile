from ubuntu:focal


RUN rm /bin/sh && ln -s /bin/bash /bin/sh

env NVM_DIR /usr/lib/nvm
ENV DEBIAN_FRONTEND noninteractive
env NODE_VERSION v12.18.1

COPY ./util.sh ./
RUN bash ./util.sh install

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

workdir /app

copy ./package.json ./
copy ./yarn.lock ./
COPY ./util.sh ./

run bash ./util.sh npm_install

copy . ./
entrypoint bash ./util.sh run