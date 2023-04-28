FROM node:18.12.0-alpine as build

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY . .

RUN npm run build
CMD npm run serve

FROM nginx:latest as nginx

COPY --from=build /app/dist /usr/share/nginx/html