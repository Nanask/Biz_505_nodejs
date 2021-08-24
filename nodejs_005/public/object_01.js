const arr1 = [100, 200, 300, 400, 500];

const 백_01 = arr1[0];
const 이백_01 = arr1[0];
const 삼백_01 = arr1[2];

//js에서는 배열의 요소를 각각 변수에 복사할 때 
// 다음과 같ㅌ은 코드로 작성이 가능하다.
const [백, 이백, 삼백, 사백, 오백] = arr1;

// 해당하는 배열의 값을 알 수 있음
console.log(백, 이백, 삼백);

// 연산 가능
const 합계 = 백 + 이백 + 삼백 + 사백 + 오백;

// obj JSON 객체에서 각 요소값을 추출하여 사용하고자 할 때
const obj = { name: "홍길동", tel: "010-111-1111" }

// 이전에 각각의 변수로 사용하기 위해 만들었던 코드
let 이름 = obj.name;
이름 = obj["name"];
let 전화 = obj.tel;
전화 = obj["tel"];

// obj 객체로 부터 각각 name, tel 값을 추출하여 
// 개별 변수로 사용할 수 있도록 복제하기
const { name, tel } = obj;
console.log(name, tel);