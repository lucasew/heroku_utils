do_setup() {
    . $NVM_DIR/nvm.sh 
}

do_run() {
    do_setup
    yarn start
}

do_npm_install() {
    do_setup
    yarn
}

do_install() {
    mkdir -p $NVM_DIR

    # update repos
    apt update 

    # some basic packages
    apt install -y git curl ca-certificates gnupg --no-install-recommends 

    # puppeteer 
    apt install -y gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libcairo-gobject2 libxinerama1 libgtk2.0-0 libpangoft2-1.0-0 libthai0 libpixman-1-0 libxcb-render0 libharfbuzz0b libdatrie1 libgraphite2-3 libgbm1
    # nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    . $NVM_DIR/nvm.sh 
    nvm install $NODE_VERSION 
    nvm alias default $NODE_VERSION 
    nvm use default 
    do_setup
    # yarn
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
    apt update && apt install yarn --no-install-recommends

    # cleanup
    apt autoremove -y 
    apt clean -y 
    rm -rf /var/lib/apt/lists/*
}

case "$1" in
install)
    do_install
    ;;
setup)
    do_setup
    ;;
npm_install)
    do_setup
    do_npm_install
    ;;
run)
    do_run
    ;;
*)
    echo Invalid command
    exit 1
    ;;
esac

