from ubuntu:focal

env NVM_DIR /usr/lib/nvm
ENV DEBIAN_FRONTEND noninteractive
run \
    git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR" \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm \
    nvm install 12
    

workdir /app

copy ./package.json .
copy ./yarn.lock .

run yarn

copy . .
entrypoint yarn start