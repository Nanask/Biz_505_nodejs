// fetch를 통해서 되돌려 받은 주문리스트를 왼쪽의 주문 리스트에 표시하기
const add_order_list = (order_list) => {
  // 배열로 되어있음
  const order_box = document.querySelector("article.order_list");

  // 리스트가 중복되어 표시되는 것을 방지하기 위하여
  // 기존에 div.order_list가 있는지 확인하고
  // div.order_list를 가져와서, 전체를 article.order_list로 부터 삭제하기
  let order_div_list = document.querySelectorAll("div.order_list"); //querySelector로는 removeChild를 사용할 수 없음
  if (order_div_list) {
    // 있다면
    order_div_list.forEach((order_tag) => {
      //order_tag 는 그냥 변수 이름, order_list에 있는 데이터에서 클릭된 배열들의 하나씩 보여주는 것
      // removeChild를 이용해서 삭제해주기
      order_box.removeChild(order_tag);
    });
  }

  const total_pay = {count:0, total: 0};

  //   menu_list.forEach((menu, index) => {
  // div박스 만들어주기
  // map을 이용해서 orders의 배열 만들어주기
  const orders = order_list.map((order, index) => {
    order_div_list = document.createElement("div");
    order_div_list.classList.add("order_list");

    // div.menu_id tag를 만들어라
    const menu_id = document.createElement("div");
    menu_id.classList.add("menu_id");
    // menu_id.innerText = menu.p_code;
    menu_id.innerText = order.to_pcode;

    // div.menu_name tag를 만들어라
    const menu_name = document.createElement("div");
    menu_name.classList.add("menu_name");
    // menu_name.innerText = menu.p_name;
    menu_name.innerText = order.tbl_product.p_name;

    const menu_qty = document.createElement("div");
    menu_qty.classList.add("menu_qty");
    menu_qty.innerText = 1;

    const menu_price = document.createElement("div");
    menu_price.classList.add("menu_price");
    // menu_price.innerText = menu.p_price;
    menu_price.innerText = order.to_price;

	// 주문 상품에 대한 합계
	const to_total = order.to_qty * order.to_price;
    const menu_total = document.createElement("div");
    menu_total.classList.add("menu_total");
    menu_total.innerText = to_total;

	// 합계와 가지에 대한 값을 구하는 코드?
	total_pay.count ++;
	total_pay.total += to_total;

	const menu_delete = document.createElement("div")
	menu_delete.classList.add("menu_delete")
	menu_delete.innerText = "X"
	// 주문한 메뉴를 삭제하기 위함, seq값을 가져와서 삭제할 코드
	menu_delete.dataset.order_seq = order.to_seq

    // 각자 div로 생성해 놓은 것들을
    order_div_list.appendChild(menu_id);
    order_div_list.appendChild(menu_name);
    order_div_list.appendChild(menu_qty);
    order_div_list.appendChild(menu_price);
	order_div_list.appendChild(menu_total);
	order_div_list.appendChild(menu_delete);

    return order_div_list;
    // article.order_list에 넣어주기
    // order_box.appendChild(order_list); 주석처리 하는 이유는 배열로 되어있기 때문에 위에서 지워도 지워지지 않기 때문?
  });
  order_box.append(...orders);

  const total_html = `
  				<div class='order_list'>
  					<div>합계</div>
  					<div class='order_pay_count'>${total_pay.count}</div>
					<div class='order_pay_total'>${total_pay.total}</div>
				</div>`;

  order_box.innerHTML += total_html;

  const pay_button_html = 
  	`<div class='order_list pay_box'>
  		<button class='btn_cash'>현금결제</button>
		<button class='btn_card'>카드결제</button>
	</div>`;

	order_box.innerHTML += pay_button_html;
};

// fetch를 사용하여 서버에 데이터를 요청하기 위해 별도의 함수를 선언하기
const order_input = (table_id, menu_id) => {
  // path Varriable 방식으로 menu_id 값을 URL에 포함하여 getter 요청하기
  // fetch를 쓸 때는 then이 두개 나온다!!!!

  /**
   * fetch로 보낸 데이터를 여기서 받는다?
   * 만약 3번 테이블에 5번 메뉴를 추가하려고 Request를 한다면
   * localhost:3000/order/3/input/5 와 같은 URL을 만들어 서버로 Request라고 한다.
   * 이런식으로 만드는 URL 방식을 RESTfull 요청이라고 한다.
   */
  fetch(`/pos/order/${table_id}/input/${menu_id}`)
    .then((res) => res.json())
    .then((result) => {
		getOrders(table_id);
	})
	// add_order_list(result.order_list));
  // order_list를 menu_list에서 변경해주기
};

const getOrders = (table_id)=> {
	fetch(`/pos/getorder/${table_id}`)
    .then((res) => res.json())
    .then((result) => add_order_list(result));
}

// DOMContentedLoaded event를 설정하면
// JS 코드가 HTML의 어떤 부분에 있어도 상관없이 작동이 된다.
document.addEventListener("DOMContentLoaded", () => {
  // 현재 화면이 열리면 (주문화면이 열리면)
  // table id값을 추출하기 위하여
  // article.order_list에서 dataset을 추출하여 변수에 담기
  const product_article = document.querySelector("article.product_list");
  const order_article = document.querySelector("article.order_list");

  // article.product_list의 div.menu가 클릭되면 할 일 지정
  const table_id = order_article.dataset.table_id;

  const pay_box = document.querySelector("div.pay_box")

  // const main_section = document.querySelector("section.main");

  // section.main이 없는 page에서 script 오류가 나는 것을 방지하기 위하여
  if (product_article) {
    product_article.addEventListener("click", (e) => {
      const target = e.target;

      // index.pug의 table layout click 설정
      if (target.tagName === "DIV" && target.className.includes("menu")) {
        const menu_id = target.dataset.menu_id;
        // alert(menu_id + "가 선택됨")
        // document.location.href = `/pos/order/input${menu_id}`;

        // fetch 전송을 위한 함수 호출
        // fetch로 두가지를 같이 전송하고
        order_input(table_id, menu_id); // 서버에 메뉴를 저장하는 부분
		// getOrders(table_id)  서버에 메뉴를 불러오는 부분
      }
    });
  }

  // 주문서 화면이 열릴 때 fetch를 실행해서 서버로부터 table에 주문내용이 있으면 가져와서 리스트를 보여주기


	if(order_article) {
		order_article.addEventListener("click", (e)=> {
			const target = e.target
			if(target.tagName === "DIV" && target.className.includes("menu_delete")) {
				const order_seq = target.dataset.order_seq

				// alert(order_seq)
				if(confirm("주문 메뉴를 삭제합니다")) {
					fetch(`/pos/order/${order_seq}/delete`)
					// router에서 res.send()로 문자열을 보냈기 때문에 
					// res.text() 함수를 사용한다.
					.then((res)=> res.text())
					.then((result)=> {
						if( result === "OK") {
							getOrders(table_id);
						}
					})
				}
			}
		})
	}
	// 화면이 열릴때 자동으로 실행될 코드
	getOrders(table_id)

	// button box에 click event를 설정하고
	// button 클릭되었을 때 결제 처리를 수행하려고 했다.
	// button box를 포함하여 button을 동적으로 생성을 했다.
	// 동적으로 생성된 tag들은 자체적으로 event를 수신한다.
	// 아래의 event 핸들러는 button box가 만들어지기 전에
	// 선언되고 OS에게 알려진 코드이다.
	// div.button_box가 아직 만들어지지 않은 상태에서
	// 선언된 event 핸들러는 OS가 무시해 버린다.
	if(pay_box) {
		pay_box.addEventListener("click", (e) => {
			const button = e.target;

			if(button.className.includes("btn_cash")) {
			alert("현금결제")


			}else {
				alert("카드결제")
			}
		})
	}
	// 동적으로 생성된 tag에 event 핸들링을 하기 위해서
	// 처음에 아예 전체 HTML 문서 자체에 click evnet를 설정해 둔다.
	// document에 click event를 설정하고
	// 실제 tag가 생성한 후에 event를 버블링 할 수 있도록 설정하는 방법

	document.addEventListener("click",(e)=> {
		const button = e.target;
		const modal = document.querySelector("div.modal");

		if(button.tagName === "BUTTON") {
			if(button.className.includes("btn_cash")) {
				// alert("현금결제")
				document.querySelector("span.pay_qty")
				.innerText = "현금 결제"
				modal.style.display="flex";
			} else if(button.className.includes("btn_card")) {
				// alert("카드결제")
				document.querySelector("span.pay_qty")
				.innerText = "카드 결제"
				modal.style.display="flex"
			}
			const order_pay_total =
				document.querySelector("div.order_pay_total").innerText
			document.querySelector("span.pay_total")
			.innerText = order_pay_total

				
		}
	})
	// x버튼을 클릭하여 modal 창 닫기
	document.querySelector("div.close span")
		.addEventListener("click", (e)=> {
	document.querySelector("div.modal").style.display= "none";
	})
	
	document.querySelector("button.btn_pay_complete")
		.addEventListener("click", () => {
			if(confirm("결제를 진행할까요?")) {
				alert("결제 완료")

				// 현재 table_id 값을 getter
				const article_order = document.querySelector("article.order_list")
				const table_id = article_order.dataset.table_id;

				// fetch로 서버에 결제완료 요청
				fetch(`/pos/paycomplete/${table_id}`)
				.then((res)=>res.text())
				.then((result)=> {
					if(result === "OK") {
						document.querySelector("div.modal")
						.style.display = "none";
						getOrders(table_id);
					}
				})

				// document.querySelector("div.modal").style.display= "none";

				//server로 현재 orderList에 담긴 데이터를 결제완료로 처리하도록 요청하기

			}
		})
});


