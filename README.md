# 원티드 프리온보딩 백엔드 인턴십 - 선발 과제
<br></br>

## 1. 지원자의 성명

안녕하세요. 지원자 김용기 입니다.

<br></br>

## 2. 애플리케이션의 실행 방법

- **2-1. `docker-compose.yml 파일`을 생성해주세요.**

  ```yml
  version: "3"
  services:
    db:
      image: mysql:8.0.32
      container_name: db
      ports:
        - 3306:3306
      volumes:
        - ./db/data:/var/lib/mysql
      env_file:
        - ./.env
    app:
      image: yongki150/wanted-pre-onboarding-backend:latest
      container_name: app
      ports:
        - 3000:3000
      env_file:
        - ./.env
      depends_on:
        - db
  ```

- **2-2. 배포된 애플리케이션 docker 이미지를 다운받아주세요.**  

  ```bash
  sudo service docker start
  docker pull yongki150/wanted-pre-onboarding-backend
  ```  

- **2-3. `.env 파일`을 생성하고 누락된 환경변수를 기입해주세요.**  
  
  ```env
  MYSQL_ROOT_PASSWORD=
  MYSQL_ALLOW_EMPTY_PASSWORD=
  MYSQL_RANDOM_ROOT_PASSWORD=
  TZ=Asia/Seoul

  PORT=3000
  DB_HOST=db
  DB_USER=root
  DB_PORT=3306
  DB_PASSWORD=
  DB_DATABASE=wanted_pre_onboarding

  JWT_SECRET=secret!12
  ```

- **2-4. 실행**

  ```bash
  docker-compose up
  ```

- **[2-4. 엔드포인트 호출 방법 (링크)](https://documenter.getpostman.com/view/11900791/2s9XxtzGEj)**

  링크를 확인해주세요. (6. API 명세와 링크가 동일합니다.)

<br></br>

## [3. 데이터베이스 테이블 구조 (링크)](https://www.erdcloud.com/p/4ouaNgGNEtBu4Zd7y)

링크를 확인해주세요.

<br></br>

## 4. 구현한 API의 동작을 촬영한 데모 영상 링크

<br></br>

## 5. 구현 방법 및 이유에 대한 간략한 설명

- **과제 1. 사용자 회원가입 엔드포인트**
  
  a. 사용자에서 이메일과 비밀번호를 입력하여 POST 요청을 보냅니다.
  - 이메일과 비밀번호는 간단한 텍스트이기 때문에 x-www-form-urlencoded 방식의 전송을 허용하였습니다.
    
  b. 서버에서는 사용자로부터 받은 이메일과 비밀번호를 검증합니다.
  
  c. 이메일과 비밀번호가 유효한 경우, 새로운 사용자를 데이터베이스에 저장합니다.
  
  d. 회원가입이 성공적으로 완료되면, 서버는 새로운 사용자를 인증하고 JWT 토큰을 발급합니다.
  - 인증과 검증을 하나의 서버에서 수행하기 때문에 개인키 암호화 기법을 사용하였습니다.
    
  e. 사용자에게 JWT 토큰과 204 상태코드를 응답으로 전달합니다.
  - 사용자와 서버 간에 토큰이 JWT임을 인식하기 위해 Bearer 토큰과 함께 사용하였습니다.

- **과제 2. 사용자 로그인 엔드포인트**

  a. 사용자에서 이메일과 비밀번호를 입력하여 PATCH 요청을 보냅니다.
  - 로그인 요청은 이메일과 비밀번호의 수정 없이 토큰만 수정 됩니다. 자원의 일부분만 수정하였기 때문에 PATCH 메소드를 사용하였습니다.

  b. 서버에서는 사용자로부터 받은 이메일과 비밀번호를 검증합니다.
  
  c. 이메일과 비밀번호가 유효한 경우, 서버는 사용자를 인증하고 JWT 토큰을 발급합니다.
  
  d. 사용자에게 JWT 토큰과 200 상태코드를 응답으로 전달합니다.

- **과제 3. 새로운 게시글을 생성하는 엔드포인트**

  a. 사용자에서 게시글제목과 게시글내용을 입력하여 POST 요청을 보냅니다. 
  
  - 게시글작성자를 식별하기 위한 사용자일련번호를 토큰에서 확인합니다.

  b. 새로운 게시글을 데이터베이스에 저장합니다.

  c. 사용자에게 200 상태코드를 응답으로 전달합니다.

- **과제 4. 게시글 목록을 조회하는 엔드포인트**

  a. 사용자에서 페이징임계값과 페이지일련번호를 입력하여 GET 요청을 보냅니다. 

  b. 서버에서는 게시글총갯수에서 페이징임계값을 나눈값보다 페이지일련번호가 작은지 검증합니다.

  c. 게시글 목록을 데이터베이스에서 조회합니다. 
  
  d. 사용자에게 게시글 목록과 200 상태코드를 응답으로 전달합니다.

- **과제 5. 특정 게시글을 조회하는 엔드포인트**
  
  a. 사용자에서 게시글일련번호를 URL Path로 입력하여 GET 요청을 보냅니다.

  - 게시글일련번호는 게시글의 식별자이기 때문입니다.

  b. 게시글을 데이터베이스에서 조회합니다. 
  
  c. 사용자에게 게시글 목록과 200 상태코드를 응답으로 전달합니다.
  
- **과제 6. 특정 게시글을 수정하는 엔드포인트**

  a. 사용자에서 게시글일련번호를 URL Path로, 게시글을 Body로 입력하여 PUT 요청을 보냅니다.

  - 특정 게시글 자원의 전체가 수정될 수 있기 때문에 PUT 메소드를 사용하였습니다.

  b. 특정 게시글을 데이터베이스에서 수정합니다.

  c. 사용자에게 게시글 수정이 있다면 201 상태코드를, 없다면 204 상태코드를 응답으로 전달합니다.
  
- **과제 7. 특정 게시글을 삭제하는 엔드포인트**

  a. 사용자에서 게시글일련번호를 URL Path로 입력하여 DELETE 요청을 보냅니다.

  b. 특정 게시글을 데이터베이스에서 삭제합니다.

  c. 사용자에게 204 상태코드를 응답으로 전달합니다.

<br></br>

## [6. API 명세 (링크)](https://documenter.getpostman.com/view/11900791/2s9XxtzGEj)

링크를 확인해주세요.

<br></br>

## (선택) 클라우드 환경에 배포 환경을 설계하고 애플리케이션을 배포한 경우

- **배포된 API 주소**

  ec2-54-180-103-14.ap-northeast-2.compute.amazonaws.com

<br/>

- **설계한 AWS 환경 그림으로 첨부**

  ![프리온보딩 drawio](https://github.com/yongki150/wanted-pre-onboarding-backend/assets/53007747/ee082569-36b3-4f67-8017-d446b8eef138)