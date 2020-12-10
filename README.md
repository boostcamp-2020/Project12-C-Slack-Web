# Project12-C-Slack-Web

Project 12 슬랙 웹버전 개발 C팀입니다.

<br>

## Teammate 👨‍👩‍👦‍👦

| J052   | J065   | J171   |
| ------ | ------ | ------ |
| 김종원 | 류찬규 | 임채욱 |

<br>

## Tech Stack

|                                                                                                                                                                                                            Frontend                                                                                                                                                                                                            |                                                                                                                                                                                           Backend                                                                                                                                                                                           |                                                                                                                                                                                                          etc                                                                                                                                                                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![react](https://img.shields.io/badge/react-v17.0.1-9cf?logo=react) ![Javascript](https://img.shields.io/badge/javascript-ES6+-yellow?logo=javascript) ![Recoil](https://img.shields.io/badge/recoil-v0.1.2-blue?logo=recoil) ![Styled-components](https://img.shields.io/badge/styled_components-v5.2.1-DB7093?logo=styled-components) ![socket.io](https://img.shields.io/badge/socketio_Client-v3.0.3-white?logo=socket.io) | ![NodeJS](https://img.shields.io/badge/node.js-v14.13.1-green?logo=node.js) ![Express](https://img.shields.io/badge/Express-v4.16.4-9cf?logo=express) ![JWT](https://img.shields.io/badge/JWT-v8.5.1-white?logo=json-web-tokens) ![MongoDB](https://img.shields.io/badge/mongodb-v4.2.11-blue?logo=mongodb) ![socket.io](https://img.shields.io/badge/socketio-v3.0.3-white?logo=socket.io) | ![github](https://img.shields.io/badge/github-gray?logo=github) ![VScode](https://img.shields.io/badge/VScode-v11.7-blue?logo=visual-studio-code) ![Babel](https://img.shields.io/badge/babel-v7.12.9-yellow?logo=babel) ![Webpack](https://img.shields.io/badge/webpack-v4.44.2-skyblue?logo=webpack) ![Naver Cloud Platform](https://img.shields.io/badge/Naver_Cloud_Platform-compact_server-9cf&color=brightgreen) |

<br>

## 프로젝트 목적

- slack web 버전을 클론하는 것을 목표로 합니다.
- 파일 공유가 가능한 실시간 웹 채팅 기능과 web push 기능을 통한 알림 기능을 구현합니다.

<br>

## 배포 주소

- https://slack-clone.kro.kr
- api docs: https://api.slack-clone.kro.kr/docs

## 설치 방법

- 개발버전으로 실행시킬시 backend 디렉토리에는 `.env.dev`가 배포 버전의 경우 `.env.prod`가 필요합니다.

```shell=bash
git pull https://github.com/boostcamp-2020/Project12-C-Slack-Web.git
cd Project12-C-Slack-Web/backend
sudo docker build -t backend .
sudo docker run -d -p 4000:4000 -p 5000:5000 backend
cd ../front && npm install
npm start
```
