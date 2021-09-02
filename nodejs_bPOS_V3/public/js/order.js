// json객체 추가하기
// const total_pay = {
//   title: "합계",
//   count: 0,
//   qty: 0,
//   b1: "",
//   total: 0,
//   b2: "",
// };

// 위에 있는 코드를
// 다른곳에서도 공유할 수 있도록 비어있는 배열, 전역변수로 선언하기
const total_pay = {};

// fetch를 통해서 되돌려 받은 주문리스트를 왼쪽의 주문 리스트에 표시하기
const add_order_list = (order_list) => {
  // 배열로 되어있음
  const order_box = document.querySelector("table.order_list tbody");

  // 리스트가 중복되어 표시되는 것을 방지하기 위하여
  // 기존에 div.order_list가 있는지 확인하고
  // div.order_list를 가져와서, 전체를 article.order_list로 부터 삭제하기
  let order_tr_list = document.querySelectorAll("table.order_list tbody tr"); //querySelector로는 removeChild를 사용할 수 없음
  //   새로추가된 리스트만 삭제하겠다.
  if (order_tr_list) {
    // 있다면
    order_tr_list.forEach((tr) => {
      //order_tag 는 그냥 변수 이름, order_list에 있는 데이터에서 클릭된 배열들의 하나씩 보여주는 것
      // removeChild를 이용해서 삭제해주기
      order_box.removeChild(tr);
    });
  }
  // 비어있는 tatal_pay에 각 item을 추가하면서 값을 저장
  total_pay.title = "합계";
  total_pay.count = 0;
  total_pay.qty = 0;
  total_pay.b1 = "";
  total_pay.total = 0;
  total_pay.b2 = "";

  //   menu_list.forEach((menu, index) => {
  // div박스 만들어주기
  // map을 이용해서 orders의 배열 만들어주기
  const orders = order_list.map((order, index) => {
    const order_item = [
      order.to_pcode, // 메뉴 ID
      order.tbl_product.p_name, // JOIN한 상품테이블의 메뉴 이름
      order.to_qty, // 수량
      order.to_price, // 단가
      order.to_qty * order.to_price, // 금액
      "X", // 삭제 버튼
    ];

    // 금액합계와 수량합계를 지정해주기
    total_pay.count++;
    total_pay.qty += order.to_qty;
    total_pay.total += order.to_qty * order.to_price;

    const order_tds = order_item.map((item) => {
      const td = document.createElement("TD");
      td.innerText = item;

      td.dataset.order_seq = order.to_seq;
      return td;
    });

    const order_tr = document.createElement("TR");
    order_tr.append(...order_tds);

    return order_tr;
  });
  // 여기까지 order list완성
  document.querySelector("table.order_list tbody").append(...orders);

  // 금액,수량합계 만들어 놓은것을 표현
  // object.keys(JSON객체)
  // JSON 객체의 key값만 추출하여 Object 배열로 만들어 준다.
  const pay_tds = Object.keys(total_pay).map((key) => {
    const td = document.createElement("TD");
    td.innerText = total_pay[key];
    td.style.backgroundColor = "#bbb";
    return td;
  });

  const pay_tr = document.createElement("TR");
  pay_tr.append(...pay_tds);

  order_box.appendChild(pay_tr);
};

// return order_div_list;
// // article.order_list에 넣어주기
// // order_box.appendChild(order_list); 주석처리 하는 이유는 배열로 되어있기 때문에 위에서 지워도 지워지지 않기 때문?
//   });

//   const total_html = `
//   				<div class='order_list'>
//   					<div>합계</div>
//   					<div class='order_pay_count'>${total_pay.count}</div>
// 					<div class='order_pay_total'>${total_pay.total}</div>
// 				</div>`;

//   order_box.innerHTML += total_html;

//   const pay_button_html =
//   	`<div class='order_list pay_box'>
//   		<button class='btn_cash'>현금결제</button>
// 		<button class='btn_card'>카드결제</button>
// 	</div>`;

// 	order_box.innerHTML += pay_button_html;
// };

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
    });
  // add_order_list(result.order_list));
  // order_list를 menu_list에서 변경해주기
};

const getOrders = (table_id) => {
  fetch(`/pos/order/${table_id}/getlist`)
    .then((res) => res.json())
    .then((result) => add_order_list(result));
};

// DOMContentedLoaded event를 설정하면
// JS 코드가 HTML의 어떤 부분에 있어도 상관없이 작동이 된다.
document.addEventListener("DOMContentLoaded", () => {
  // 현재 화면이 열리면 (주문화면이 열리면)
  // table id값을 추출하기 위하여
  // article.order_list에서 dataset을 추출하여 변수에 담기
  const menu_article = document.querySelector("article.menu_list");
  const order_article = document.querySelector("article.order_list");

  // article.product_list의 div.menu가 클릭되면 할 일 지정
  const table_id = order_article.dataset.table_id;

  const order_table = document.querySelector("table.order_list");

  const pay_box = document.querySelector("div.pay_box");

  // const main_section = document.querySelector("section.main");

  // section.main이 없는 page에서 script 오류가 나는 것을 방지하기 위하여
  if (menu_article) {
    menu_article.addEventListener("click", (e) => {
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

  if (order_table) {
    order_table.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "TD" && target.innerText === "X") {
        //   if (target.tagName === "DIV" && target.className.includes("menu_delete")) {
        const order_seq = target.dataset.order_seq;

        // alert(order_seq)
        if (confirm("주문 메뉴를 삭제합니다")) {
          fetch(`/pos/order/${order_seq}/delete`)
            // router에서 res.send()로 문자열을 보냈기 때문에
            // res.text() 함수를 사용한다.
            .then((res) => res.text())
            .then((result) => {
              if (result === "OK") {
                getOrders(table_id);
              }
            });
        }
      }
    });
  }
  // 화면이 열릴때 자동으로 실행될 코드
  getOrders(table_id);

  // button box에 click event를 설정하고
  // button 클릭되었을 때 결제 처리를 수행하려고 했다.
  // button box를 포함하여 button을 동적으로 생성을 했다.
  // 동적으로 생성된 tag들은 자체적으로 event를 수신한다.
  // 아래의 event 핸들러는 button box가 만들어지기 전에
  // 선언되고 OS에게 알려진 코드이다.
  // div.button_box가 아직 만들어지지 않은 상태에서
  // 선언된 event 핸들러는 OS가 무시해 버린다.
  if (pay_box) {
    pay_box.addEventListener("click", (e) => {
      const button = e.target;

      let pay_text = "";

      if (button.className.includes("btn_pay_cash")) {
        pay_text = "현금결제";
        // alert("현금결제")
        //   document.querySelector("span.pay_qty").innerText = "현금 결제";
      } else if (button.className.includes("btn_pay_card")) {
        pay_text = "카드결제";
        // alert("카드결제")
        // document.querySelector("span.pay_qty").innerText = "카드 결제";
      } else if (button.className.includes("btn_table_layout")) document.location.href = "/";
      // const order_pay_total =

      if (button.tagName === "BUTTON") {
        const modal = document.querySelector("div.modal");
        modal.style.display = "flex";
        document.querySelector("span.pay_qty").innerText = pay_text;
        document.querySelector("span.pay_total").innerText = total_pay.total;
      }

      //   const button = e.target;

      //   if (button.className.includes("btn_cash")) {
      //     alert("현금결제");
      //   } else {
      //     alert("카드결제");
      //   }
    });
  }
  // 동적으로 생성된 tag에 event 핸들링을 하기 위해서
  // 처음에 아예 전체 HTML 문서 자체에 click evnet를 설정해 둔다.
  // document에 click event를 설정하고
  // 실제 tag가 생성한 후에 event를 버블링 할 수 있도록 설정하는 방법

  document.addEventListener("click", (e) => {});
  // x버튼을 클릭하여 modal 창 닫기
  document.querySelector("div.close span").addEventListener("click", (e) => {
    document.querySelector("div.modal").style.display = "none";
  });

  document.querySelector("button.btn_pay_complete").addEventListener("click", () => {
    if (confirm("결제를 진행할까요?")) {
      alert("결제 완료");

      // 현재 table_id 값을 getter
      const article_order = document.querySelector("article.order_list");
      const table_id = article_order.dataset.table_id;

      // fetch로 서버에 결제완료 요청
      fetch(`/pos/paycomplete/${table_id}`)
        .then((res) => res.text())
        .then((result) => {
          if (result === "OK") {
            document.querySelector("div.modal").style.display = "none";
            getOrders(table_id);
          }
        });

      // document.querySelector("div.modal").style.display= "none";

      //server로 현재 orderList에 담긴 데이터를 결제완료로 처리하도록 요청하기
    }
  });
});
