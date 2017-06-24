FROM node:argon

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY server.js /usr/src/app/
COPY package.json /usr/src/app/
COPY credentials.js /usr/src/app/
COPY arrayOfTopics.js /usr/src/app/
RUN npm install

# Bundle app source
# COPY . /usr/src/app

# EXPOSE 8080
CMD [ "npm", "start" ]
