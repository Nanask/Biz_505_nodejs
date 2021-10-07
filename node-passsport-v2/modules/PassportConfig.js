import passport from "passport";
import passportLocal from "passport-local";
import { members } from "../models/Member.js";
import User from "../models/User.js";

// local login 정책을 수행하는 모듈
const LocalStratege = passportLocal.Strategy;

export default () => {
  //  로그인이 성공했을 때 (내부에서) 호출되는 함수
  passport.serializeUser((user, done) => {
    console.log("로그인 성공");
    done(null, user);
  });

  // 로그인이 정상적으로 수행된 후 client에서 세션이 유효한지
  // 문의가 들어왔을 때 실행되는 함수
  passport.deserializeUser((user, done) => {
    console.log("DES", user);
    done(null, user);
  });

  // 로그인을 실제 수행하는 함수
  passport.use(
    new LocalStratege(
      {
        // login을 수행할 때 전달될 변수명 설정
        usernameField: "userid",
        passwordField: "password",
        session: true, // 세션저장하기
      },
      (userid, password, done) => {
        members.map((member) => {
          // memeber에 있는 id가 같으면 바로 코드 종료
          if (member.userid === userid && member.password === password) {
            return done(null, member);
          }
        });

        // members.forEach((member) => {
        //   if (member.userid === userid && member.password === password) {
        //     // done = 콜백함수
        //     // 값이 일치하는 것이 있으면 즉시 멈추는 특징이 있다.
        //     return done(null, member);
        //   }
        // });
        return done(null, false, { messege: "login fail" });
        // // member.js에 선언된 사용자 리스트를 이용해 인증하기

        // // id와 password가 일치하는 것만 findMember에 담기
        // const findMember = members.filter((member) => {
        //   return member.userid === userid && member.password === password;
        // });

        // if (findMember && findMember.length > 0) {
        // // 전체 데이터를 넘기면 문제가 생기기 때문에 데이터 0번째만 넘기기
        //   return done(null, findMember[0]);
        // } else {

        //   return done(null, false, { massage: "login fail" });
        // }
        // return done(null, findMember);

        // console.log(userid, password);
        // User.findOne({ userid: userid, password: password }, (err, data) => {
        //   if (err) {
        //     return done(err); // 시스템오류
        //   }
        //   console.log(data);
        //   if (!data) {
        //     return done(null, false, { massage: "존재하지 않는 아이디입니다" });
        //   }
        //   if (data.password != password) {
        //     return done(null, false, { message: "비밀번호오류" });
        //   }
        //   return done(null, data);
        // });
        // return done(null, { userid: "root", password: "12345" });
      }
    )
  );
};
