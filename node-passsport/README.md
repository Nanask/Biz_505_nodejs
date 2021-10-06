# nodejs + express + mongoDB를 사용하여 인증서버 만들기

- passport 모듈을 사용하여 oAuth2.0 방식으로 인증서버 구현하기
- open API 방식으로 인증을 수행하는 표준 모델
- 카카오, 구글, 페이스북, 트위터 등에서 로그인을 공통으로 사용하는 표준방식

## 인증구조

- 로그인 시도 : 정상사용자인지 검사하는 과정(id, password)

- 정상적인 사용자 : passport 발행, accessToken 발생

## Dependency

- npm install mongoose
- npm install passport
- npm install passport-local
- npm install express-session
- npm install cors
- 여기까지는 이용하기 위한 기본항목들

- npm install passport-kakao
- npm install passport-google
- npm install passport-facebook
- 여기서부터는 원하는 것에 따라 설치여부가 나뉜다
