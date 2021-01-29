#Stage 1
FROM nginx:latest AS builder
RUN ["apt-get","update"]
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN npm install -g yarn -y
RUN npm cache clean --force
RUN npm install -g @angular/cli
WORKDIR /ng-app
COPY . . 
RUN npm install
RUN ng build --prod
COPY ./nginx/config/default.conf /etc/nginx/conf.d/
COPY --from=builder /ng-app/dist /usr/share/nginx/html/
EXPOSE 80


