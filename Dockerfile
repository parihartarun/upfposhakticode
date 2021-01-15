FROM nginx

RUN ["apt-get","update"]

RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN npm install -g yarn -y
RUN npm install -g @angular/cli -y

WORKDIR /app

COPY . .

RUN npm install

RUN ng build --prod

RUN cp -R ./dist/ /usr/share/nginx/html/
#COPY ./dist/ /usr/share/nginx/html/

EXPOSE 4200
