// 이 파일을 모듈이라고 부르겠음

const express = require("express")
const router = express.Router();

router.get("/", (res, res) => {
    res.send("Republic of Korea")
})

// app.js설정이 /homes로 요청이 되면
// home.js를 실행하기 때문에
// localhost:3000/homes/my로 요청을 한다.
router.get('/my', (req, res) => {

    const html = "<div>Korea</div>";

    //nation을 같이 포함해서 home에서 보여라!
    // html에 담겨있는 값을 html에 보내라
    res.render("home", { nation: "대한민국", html });
})
router.get("/add", (req, res) => {

    //browser에서 보내는 num1, num2 변수에 담긴 값을 각각 추출하여 변수에 담아라
    const num1 = req.query.num1
    const num2 = req.query.num1


    // 문자열 변수 num1, num2에 담긴 값을 정수로 변환하여 덧셈하고 sum 변수에 저장하라
    const sum = paseInt(num1) + parseInt(num2);

    // query 결과를 JSON 데이터 구조로 생성
    const result = {
        num1, num2, sum,
    }
    //json data를 web으로 응답 전송하라 
    res.json(result)
})

router.get("input", (req, res) => {
    res.render("input");
})

routor.exports("/input", (res, req) => {
    const name = req.body.name;
    const tel = req.body.tel;
    const age = req.body.age;

    console.log(req.body)

    res.json({ name, tel, age })

})

module.exports = router;