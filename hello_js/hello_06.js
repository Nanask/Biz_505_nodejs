let 배열1 = ["aaa", "bbb", "ccc"];

배열1.forEach(요소 => {
    console.log(요소.search(/[ab]+/));
})
/**
 * 문자열.search(찾는문자열)
 * 문자열 내에 찾는 문자열이 있으면
 * 위치값을 return(-1 보다 큰값)
 * 없으면 -1을 return
 */
let 새로운배열 = 배열1.filter(요소 => {
    return 요소.search(/[ab]+/) > -1
})
// return !!~요소.search(/[ab]+/)의 연산 결과
// 요소.search() 의 값이 0 미만이면 false
// 0 이상이면 true로 바꾸는 논리 비트 연산식
// !!~ 블린연산식으로 바꿔주기 위한 식
// 0이상이면 true 리턴
// 0이하면 false
// 논리비트 연산자?
새로운배열 = 배열1.filter(요소 => {
    // a나 b가 포함되어 있으면 새로운 연산식을 만들어달라?
    return !!~요소.search(/[ab]+/)
})
console.log(새로운배열);


// 배열1의 요소에 한개라도 "영문 a 또는 b가 포함된 것이 있나?"
// 이 함수는 있는지 없는지 파악만 하는 것이고
// 배열이 무엇인지 알고 싶다면 filter를 사용해야 한다.
// some 함수는 filter와 비슷한 성질을 가지고 있는데
// return 되는 최종 결과물이 배열이 아닌 boolean타입
let yesNo = 배열1.some(요소 => {
    return !!~요소.search(/[ab]+/)
})

if (yesNo) {
    console.log("배열1에는 영문자 a나 b가 있음")
} else {
    console.log("배열1에는 영문자 a나 b가 없음")
}