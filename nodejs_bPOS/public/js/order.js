
// fetch를 사용하여 서버에 데이터를 요청하기 위해 별도의 함수를 선언하기
const order_input = (table_id,menu_id) => {

	// path Varriable 방식으로 menu_id 값을 URL에 포함하여 getter 요청하기
	// fetch를 쓸 때는 then이 두개 나온다!!!! 

	/**
	 * fetch로 보낸 데이터를 여기서 받는다?
	 * 만약 3번 테이블에 5번 메뉴를 추가하려고 Request를 한다면
	 * localhost:3000/order/3/input/5 와 같은 URL을 만들어 서버로 Request라고 한다.
	 * 이런식으로 만드는 URL 방식을 RESTfull 요청이라고 한다.
	 */
	fetch(`/pos/order/${table_id}/input/${menu_id}`)
	.then(res=>res.json())
	.then((result)=> console.log(result));


}

// DOMContentedLoaded event를 설정하면
// JS 코드가 HTML의 어떤 부분에 있어도 상관없이 작동이 된다.
document.addEventListener("DOMContentLoaded", ()=> {

	// 현재 화면이 열리면 (주문화면이 열리면)
	// table id값을 추출하기 위하여
	// article.order_list에서 dataset을 추출하여 변수에 담기
	const product_article = document.querySelector("article.product_list");
	const order_article = document.querySelector("article.order_list");

	// article.product_list의 div.menu거ㅏ 클릭되면 할 일 지정
	const table_id = order_article.dataset.table_id

	// const main_section = document.querySelector("section.main");

	// section.main이 없는 page에서 script 오류가 나는 것을 방지하기 위하여
	if(product_article) {
		product_article.addEventListener("click", (e)=> {
			const target = e.target

			// index.pug의 table layout click 설정
			if(target.tagName === "DIV" && target.className.includes("menu")) {
				const menu_id = target.dataset.menu_id
				// alert(menu_id + "가 선택됨")
				// document.location.href = `/pos/order/input${menu_id}`;

				// fetch 전송을 위한 함수 호출
				// fetch로 두가지를 같이 전송하고
				order_input(table_id, menu_id);
			}
		})
	}

})