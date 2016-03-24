# Select Image
FROM ubuntu:15.10

# Installing mean.io pre-requisites
# Reference: http://learn.mean.io/#mean-stack-prerequisite-technologies-linux and
# 
https://github.com/nodejs/docker-node/blob/12b7be1a82f2366a798c618f40c0a2402dd5b509/4.4/Dockerfile 
# Template for new version:
# curl -SLO "https://nodejs.org/dist/v4.4.0/node-v4.4.0-linux-x64.tar.xz" \
#  && curl -SLO "https://nodejs.org/dist/v4.4.0/SHASUMS256.txt.asc" \
#  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
#  && grep " node-v4.4.0-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
#  && mkdir js \
#  && tar -xJf "node-v4.4.0-linux-x64.tar.xz" -C js --strip-components=1 \
# && rm "node-v4.4.0-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt
# --- Node.js --- #
# To make sure I'm using a node.js that contains io.js (4.4.1), I'll install from source
# Source folder is ./js
COPY ["./js/", "/usr/local/"]
ENV NODE_VERSION 4.4.1
# node-gyp dependencies
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install python2.7 make gcc g++ libkrb5-dev apt-utils
ENV PYTHON /usr/bin/python2.7
# --- gulp and bower --- #
# Ignore warnings: 
http://stackoverflow.com/questions/35491905/npm-warn-deprecated-graceful-fs3-0-8-graceful-fs-version-3
RUN npm install -g gulp
RUN npm install -g bower --allow-root
# --- mean.io --- #
RUN npm install -g mean-cli node-gyp
RUN touch /root/.mean

# From this point on, I'm using https://github.com/linnovate/replay/blob/master/Dockerfile
# replay should be in ./replay

# Preparing app directory and cd to that directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy replay
COPY ./replay/ /usr/src/app/

# Post install
RUN mean-postinstall

# Env vars
ENV PORT 3100  
ENV MONGODB_URI mongodb://db/icu

# Start the server
CMD [ "npm", "start" ]

# Expose the port
EXPOSE 3100
