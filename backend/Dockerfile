FROM rockpell/alpine-node:1

LABEL maintainer="rockpell"

RUN git clone https://github.com/boostcamp-2020/Project12-C-Slack-Web.git
WORKDIR /Project12-C-Slack-Web/backend
COPY ./.env.prod ./
RUN npm install

CMD npm start
EXPOSE 4000 5000
