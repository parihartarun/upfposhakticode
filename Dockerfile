FROM nginx:stable-alpine

RUN ["apt-get","update"]

RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN npm install -g yarn -y

COPY ./nginx/config/default.conf /etc/nginx/conf.d/

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

RUN cp -R ./dist/* /usr/share/nginx/html/