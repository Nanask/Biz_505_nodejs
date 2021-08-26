# nodejs + express

npm install mysql2
npm install sequelize
npm install monent

## sequelize를 사용한 MySQL DB 생성하기

1. sequelize-cli를 global로 설치한다.
   npm install -g sequelize-cli 명령실행

2. sequelize 프로젝트 설정
   프로젝트폴더 > sequelize init 명령실행

3. config/config.json, models/index.js 파일이 생성되는지 확인

4. config/config.json 파일에 mysql 접속 정보 수정
5. models 폴더에 Table 구조 파일 생성
6. app 실행 >> table을 자동 생성

## sequlize를 사용하여 자동으로 table create 하기

sequelize("테이블이름", {테이블 칼럼 구조들})

테이블이름을 단수로 지정하면 실제 테이블 이름은 복수로 설정되어 만들어진다.

tbl_bbs : tbl_bbs로 테이블이 생성되었음
tbl_reply : tbl_replies로 테이블이 생성되었다.

## table과 table을 asscociate(연관)하여 SELECT를 했을 때

view에서 처리하는 방법

findOne()을 실행하면서 include로 연관된 list를 포함한다
view에서는 부모 table은 단수 구조로 vo.변수 형식으로 출력하고
include 된 list는 vo.실제테이블이름 list를 forEach로 반복하면서 값을 추출하여 사용해야 한다.

# pug view 만들기

## 보간법
* pug template를 사용하여 서버로부터 전달된 데이터를 rendering하도록 표현하는 문법

* 일반적으로 tag와 함께 : div= 변수명
* #{}를 사용하는 방법 : div #{변수명}
* !{}를 사용하는 방법 : div !{변수명}
   변수에 포함된 데이터(문자열)에 HTML tag가 포함되어 있고
   view 화면에서 HTML tag를 적용하여 보여주고 싶을때
   

