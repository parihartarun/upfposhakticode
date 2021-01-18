# Stage 1 - Build React App inside temporary Node container
# FROM node:carbon-alpine as react-build
#FROM node:10-alpine as builder
FROM nginx:latest

#RUN ["apt-get","update"]

#RUN sudo apt-get install nodejs -y
#RUN apt-get install npm -y
#RUN npm install -g yarn -y

#RUN npm install -g @angular/cli
#WORKDIR /usr/src/app
#COPY . ./
#RUN npm install
#RUN ng build --prod

#COPY ./nginx/public/ /usr/share/nginx/html/
COPY ./nginx/config/default.conf /etc/nginx/conf.d/
#COPY ./nginx/cert /etc/ssl/admin/
COPY ./dist /usr/share/nginx/html/

EXPOSE 3000
EXPOSE 4200

