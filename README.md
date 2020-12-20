# [12-C] 겁나 빠른 슬랙 프로젝트


<p align="middle">
  <a>
    <img src="https://user-images.githubusercontent.com/56837413/102706599-95e24280-42d6-11eb-8063-2825377da990.png" width="500px"/>
  </a>
</p>



<br>

## 프로젝트 소개
- Slack web 버전의 워크스페이스, 실시간 채팅 등의 주요 기능 구현을 목표로 합니다.

<br>
<p align="middle">
<img src="https://user-images.githubusercontent.com/56837413/102718222-65c48f00-432a-11eb-9dcf-27a5e630fbdc.gif" width="600px"/>
</p>
<br>

### 배포 주소
- https://slack-clone.kro.kr
- api docs: https://api.slack-clone.kro.kr/docs

<br>

### 주요 기능
<br>
<p align="middle">
<img src="https://user-images.githubusercontent.com/56837413/102716836-b97eaa80-4321-11eb-9413-3c31777f7084.png" width="700px"/>
</p>
<br>


## Tech Stack

|         Frontend         |      Backend      |         etc          |
| :----------------------: | :---------------: | :------------------: |
| ![react](https://img.shields.io/badge/react-v17.0.1-9cf?logo=react) ![Javascript](https://img.shields.io/badge/javascript-ES6+-yellow?logo=javascript) ![Recoil](https://img.shields.io/badge/recoil-v0.1.2-blue?logo=recoil) ![Styled-components](https://img.shields.io/badge/styled_components-v5.2.1-DB7093?logo=styled-components) ![socket.io](https://img.shields.io/badge/socketio_Client-v3.0.3-white?logo=socket.io)| ![NodeJS](https://img.shields.io/badge/node.js-v14.13.1-green?logo=node.js) ![Express](https://img.shields.io/badge/Express-v4.16.4-9cf?logo=express) ![JWT](https://img.shields.io/badge/JWT-v8.5.1-white?logo=json-web-tokens) ![MongoDB](https://img.shields.io/badge/mongodb-v4.2.11-darkgreen?logo=mongodb) ![socket.io](https://img.shields.io/badge/socketio-v3.0.3-white?logo=socket.io) | ![github](https://img.shields.io/badge/github-gray?logo=github) ![VScode](https://img.shields.io/badge/VScode-v11.7-blue?logo=visual-studio-code) ![Babel](https://img.shields.io/badge/babel-v7.12.9-yellow?logo=babel) ![Webpack](https://img.shields.io/badge/webpack-v4.44.2-skyblue?logo=webpack) ![Naver Cloud Platform](https://img.shields.io/badge/Naver_Cloud_Platform-compact_server-9cf&color=brightgreen) ![Docker](https://img.shields.io/badge/docker-v19.03.11-blue?logo=docker) ![Nginx](https://img.shields.io/badge/Nginx-v1.14.0-brightgreen?logo=nginx) |

<br>

## 기술 특장점

### ❤️ 겁나 빠른 대응을 위한 **Mongo DB** 사용 ❤️

- 사용자의 채팅 메시지 조회와 채팅 입력에 빠르게 대응하기 위해 MongoDB를 사용하였습니다.
- ODM으로는 Mongoose를 사용해 모델 관리와 CRUD 그리고 개발의 편의를 도모했습니다.
- references 타입의 데이터를 활용하여 중복된 데이터를 업데이트 하는 과정을 최소화하였습니다.

<br>

### 💚 겁나 빠른 채팅을 위한 **Socket** 사용 💚

- 채팅, 리액션, 댓글 등 실시간으로 사용자에게 반영되어야 하는 기능들을 socket을 통해 구현했습니다. 

<br>

### 💙 겁나 빠른 학습과 적용을 위한 **Recoil** 사용 💙

- React의 hook과 유사한 방식으로 동작하여 낮은 러닝커브를 갖기 때문에 빠르게 학습하고 서비스에 적용할 수 있었습니다.
- Recoil atom을 사용해 워크스페이스, 채널, 채팅 메시지 등의 data들을 global state로 관리합니다.
- Custom hook을 사용해 Recoil state를 비동기적으로 업데이트 할 수 있습니다.

<br>

### 💜 겁나 빠른 인수인계를 위한 **Swagger API** 명세 💜

- 사용되는 API들의 명세를 작성하여 Swagger 명세만 읽어도 협업, 유지 보수가 가능합니다.
- 별도의 문서 공유 없이 API서버에 Swagger를 배포하여 언제든 명세를 확인 할 수 있습니다.

<br>

### 💛 겁나 빠른 배포 환경 설정을 위한 **Docker, Nginx** 사용 💛

- Docker를 사용하여 배포 환경 설정이 순식간에 가능합니다.
- NGINX는 프론트서버, 백엔드 서버 각각 설정 파일 하나와 ssl 적용으로 웹서버 구축이 가능합니다.

<br>

### 🧡 겁나 빠른 초기 로딩을 위한 **infinite scroll** 구현 🧡

- 초기에는 메시지를 일부분만 가져오며 스크롤이 특정 위치에 도달하면 다른 메시지를 가져옵니다.
- 스크롤의 위치가 특정 위치에 도달했을 때 reflow를 방지하며 관찰하기 위해 intersection observer를 이용해 infinite scroll을 구현하였습니다.

<br>

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


### .env 파일 예시

```
PORT=
CHAT_PORT=
MONGOURI=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=
JWT_SECRET=
FRONTEND_HOST=
COOKIE_SECRET=
NODE_ENV=
ENCRYPTION_KEY=
S3_ENDPOINT=
S3_REGION=
S3_ACCESSKEY=
S3_SECRETKEY=
S3_BUCKETNAME=
```
<br>

## Teammate 👨‍👩‍👦‍👦
|                                 <span style="font-size:20px">김종원_J052</span>                                  |                                 <span style="font-size:20px">류찬규_J065</span>                                  |                                 <span style="font-size:20px">임채욱_J171</span>                                 |
|:----------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------:|
| ![Image](https://avatars0.githubusercontent.com/u/26921508?s=350&u=3bd5e08ac086212ee3219297d4e02e10a5e275a5&v=4) | ![Image](https://avatars3.githubusercontent.com/u/56837413?s=350&u=c5f423e652d0e9bd1e7aff1a1d3dbd4ab8ae3b67&v=4) | ![Image](https://avatars1.githubusercontent.com/u/8137615?s=350&u=3cbc84a925ac49ae3603adbcff8b24b444e478da&v=4) |
| <b>FE/BE 개발</b> <br> (FE 지원) | <b>FE/BE 개발</b> <br> (FE 지원) | <b>FE/BE 개발</b> <br> (BE 지원) |
| - 항상 본질을 생각합니다. <br> - 의견 충돌을 즐깁니다 \^\-\^ 🤦‍♂️| - 지속 성장 가능한 개발자 👨‍💻 <br> - pro 어그로꾼 😎 | - 딴길로 새는거 너무 재밌습니다. 🤣|
