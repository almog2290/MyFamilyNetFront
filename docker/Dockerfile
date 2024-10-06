FROM node:20.17-alpine AS builder

## Define build arguments
ARG FAMLIYNET_APP_API_IP
ARG FAMLIYNET_KEYCLOAK_URL
ARG FAMLIYNET_KEYCLOAK_REALM
ARG FAMLIYNET_KEYCLOAK_CLIENT_ID

## Create app directory
WORKDIR /usr/src/app

## Copy package.json and package-lock.json
COPY ./package.json ./
COPY ./package-lock.json ./

## Install dependencies
RUN npm install 

## Copy all files
COPY . .

## Set environment variables
ENV VITE_APP_API_URL="/api"
ENV VITE_KEYCLOAK_URL=${FAMLIYNET_KEYCLOAK_URL}
ENV VITE_KEYCLOAK_REALM=${FAMLIYNET_KEYCLOAK_REALM}
ENV VITE_KEYCLOAK_CLIENT_ID=${FAMLIYNET_KEYCLOAK_CLIENT_ID}


## Build the app
RUN npm run build

## move build folder to caddy server
FROM caddy:latest

## Copy Caddyfile
COPY ./docker/Caddyfile /etc/caddy/Caddyfile

## Copy build folder to Caddy's web root
COPY --from=builder /usr/src/app/dist /usr/share/caddy

## Expose port 3000
EXPOSE 3000