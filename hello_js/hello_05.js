
/** JS에서의 배열 만들기
 * 배열요소의 타입이 고정이 아니다.
 * 다른 type의 요소를 같은 배열에 저장할 수 있다.
 */

// 검색해보자 배열과 array의 다른점?!
// blank 배열
let 배열1 = []
// 초기값이 있는 배열
let 배열2 = [1, 2, 3, 4, 5, 6, 7, 8]
let 배열3 = [1, 2, "우리나라", "대한민국"];
let 배열4 = Array(1, 2, 3, 4, 5, 6);
let 배열5 = Array();

// 기존의 배열에 새로운 요소(item)을 추가하는 방법
배열1.push(10, 20);
배열1.push("대한민국");
배열1.push(1, 2, 3, 4, 5, 6);
console.log(배열1);

배열3.push(100, 200, 300);
console.log(배열3);

// 배열.length 속성으로 통해서 배열의 크기를 알 수 있다.
let 배열크기 = 배열3.length
console.log(배열크기);

// 특정한 위치(index)를 지정하여 배열요소를 저장
// 기존의 값이 있으면 삭제되고 새로운 값으로 대체된다
배열3[3] = "Republic of Korea";
console.log("배열3", 배열3);

// 특정한 위치(index)에 저장된 값을 읽어서 다른 변수에 저장하기
let 요소1 = 배열3[3];
console.log("요소1", 요소1);

// 배열의 맨 끝에 저장된 요소를 읽기
// 배열의 요소는 0 ~ (크기 -1)
let 요소2 = 배열3[배열3.length - 1];

// 배열과 반복문
// 동기방식으로 사용되는 일반적인 코드
// for 시작 출력되고
// 배열요소들이 출력되고
// for 종료가 출력된다.
console.log("for 시작");
for (let i = 0; i < 배열3.length; i++) {
    console.log(배열3[i]);
}
// 비동기 callback 방식으로 사용하기
// 비동기 시작
// 요소들 출력
// 비동기 종료
// 와 같이 순서대로 작동된다는 보장이 없다.
console.log("비동기 시작")
배열3.forEach(function (요소) {
    console.log(요소);
});
console.log("비동기 종료");

// 화살표 함수를 사용한 forEach 반복문
// 권장방식이기도 하고 더 많이 사용
배열3.forEach(요소 => {
    console.log(요소);
})

// 내부적으로 forEach() 실행되면서 내부의 함수에서 배열요소를 기준으로
// 연산이 이루어지고 그 결과를 통째로 다른 변수에 담을 수 있다.
/**
 * 만약 배열3의 요소가 5개 라면?
 * 1. map() 함수내의 화살표 함수는 5번 실행이 될 것이다.
 * 2. 화살표 함수의 코드에서 마지막에 return 이 있으므로 
 *      return문이 5번 실행될 것이다.
 * 3. 또다른배열.push(return 된 결과)의 코드가 5번 실행된다.
 * 
 * 이 결과는 배열3에 담긴 모든 요소의 끝에 문자열 A가 부착되고
 * 문자열 A가 부착된 요소들이 또 다른 배열에 push되어
 * 새로운 배열이 만들어진다.
 * 
 */

let 또다른배열 = 배열3.map((요소) => {
    console.log(요소);
    return 요소 + "A";
})
console.log(또다른배열);

배열3.map((요소) => {
    console.log(요소);
    return 요소 + "A";
})

let 숫자배열 = [2, 3, 4, 5, 6, 1, 2, 3, 5];
console.log("숫자배열", 숫자배열);

// 밑에 코드 두가지는 같은 값을 나타냄!!
let 제곱한배열 = 숫자배열.map((숫자) => {
    return 숫자 * 숫자;
})

제곱한배열 = 숫자배열.map((숫자) => 숫자 * 숫자);
console.log("제곱한배열", 제곱한배열);

// map은 내부의 함수에 요소와 배열의 index 값을 매개변수로 전달할 수 있고
// 내부 코드에서는 전달받은 요소와 index를 활용하여 코드를 작성할 수 있다.
숫자배열.map((숫자, index) => {
    console.log(index, "번째:", 숫자);
})

console.log("제곱한배열", 제곱한배열);

// 자기자신도 매개변수로 사용할 수 있다?
// 배열의 요소, index, 자기자신의 복제배열을
// 매개변수로 전달하여 다양한 코드에서 활용할 수 있다.
제곱한배열.map((요소, index, 원래배열) => {
    console.log(원래배열, "의", index, "번째 요소", 요소);
})

// 원 배열에서 특정한 조건에 맞는 요소에서 추출하여
// 다른 배열로 만들고 싶을 때
// 내부 코드에서 특정 요소가 연산될 때
// 마지막에 return true 인 경우만 해당요소를 다른 배열에
// push 한다.

// return 문이 true 일때 해당하는 요소값이 짝수 배열에 push 된다.
// return 결과가 짝수배열에 저장되는 것이 아니다
let 짝수배열 = 숫자배열.filter(요소 => {
    return 요소 % 2 == 0;
});

let 문자열배열 = ["aaa", "bbb", "ccc"];

// 문자열 내에 영문자 a 또는 b가 있으면 /[ab]+/
// !!OR연산 = 조건식 !!~요소.search/[ab]+/
let 새로운배열 = 문자열배열.filter((요소, index, 배열) => {
    // 요소에 ab가 포함되어 있으면
    return !!~요소.search(/[ab]+/);
})

console.log(새로운배열);

