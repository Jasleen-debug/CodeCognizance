# I will use the official Node.js image with version 20 on Alpine Linux
FROM node:20-alpine

# Install Python 3 and create a symbolic link for `python`
RUN apk add --no-cache python3 && ln -sf python3 /usr/bin/python
# Install Java
RUN apk add --no-cache openjdk11
# Install C++
RUN apk update && apk add --no-cache g++

# Here, I will create and change to the backend app directory
WORKDIR /usr/src/backendApp

# Next, lets copy the entire code from backend folder to working directory location
COPY package*.json .
# Install dependencies
RUN npm install
COPY . .

EXPOSE 8000
# verify
RUN node -v
RUN npm -v

# Start the application
CMD ["node", "server.js"]