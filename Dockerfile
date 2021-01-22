#Stage 1
FROM node:13-alpine as builder
RUN npm cache clean --force
RUN npm install -g @angular/cli
WORKDIR /ng-app
COPY . . 
RUN npm install
RUN ng build --prod

#Stage 2
FROM nginx:latest
COPY ./nginx/config/default.conf /etc/nginx/conf.d/
COPY --from=builder /ng-app/dist /usr/share/nginx/html/
EXPOSE 80


