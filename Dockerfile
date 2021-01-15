FROM nginx

RUN npm install -g yarn -y
RUN npm install -g @angular/cli -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y

WORKDIR /app

COPY . .

RUN ["apt-get","update"]

RUN ng build --prod

COPY ./dist/ /usr/share/nginx/html/

EXPOSE 4200
