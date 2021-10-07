// DB를 사용하지 않고 임의 데이터를 만들어서
// role확인하기?

const admin = {
  userid: "admin",
  password: "12345",
  role: "ADMIN",
  email: "admin@naver.net",
};

const user = {
  userid: "user",
  password: "12345",
  role: "user",
  email: "user@naver.net",
};

const guest = {
  userid: "guest",
  password: "12345",
  role: "guest",
  email: "guest@naver.net",
};

const nana = {
  userid: "nana",
  password: "12345",
  role: "user",
  email: "nana@naver.net",
};

const hong = {
  userid: "hong",
  password: "12345",
  role: "guest",
  email: "hong@naver.net",
};

export const members = [admin, user, guest, nana, hong];
