# Stage 1 - Build React App inside temporary Node container
# FROM node:carbon-alpine as react-build
FROM node:10-alpine as builder
RUN npm install -g @angular/cli
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN ng build --prod

# Stage 2 - Deploy with NGNIX
FROM nginx:1.15.2-alpine

RUN sudo apt-get install vim

COPY ./nginx/config/default.conf /etc/nginx/nginx.conf
COPY ./nginx/config/default.conf /etc/nginx/conf.d/

COPY --from=builder /usr/src/app/dist /var/www

EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]