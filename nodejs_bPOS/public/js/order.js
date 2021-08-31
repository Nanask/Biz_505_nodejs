// fetch를 통해서 되돌려 받은 주문리스트를 왼쪽의 주문 리스트에 표시하기
const add_order_list = (menu_list) => {
  // 배열로 되어있음
  const order_box = document.querySelector("article.order_list");

  // 리스트가 중복되어 표시되는 것을 방지하기 위하여
  // 기존에 div.order_list가 있는지 확인하고
  // div.order_list를 가져와서, 전체를 article.order_list로 부터 삭제하기
  let order_list = document.querySelectorAll("div.order_list"); //querySelector로는 removeChild를 사용할 수 없음
  if (order_list) {
    // 있다면
    order_list.forEach((order_tag) => {
      //order_tag 는 그냥 변수 이름, order_list에 있는 데이터에서 클릭된 배열들의 하나씩 보여주는 것
      // removeChild를 이용해서 삭제해주기
      order_box.removeChild(order_tag);
    });
  }

  //   menu_list.forEach((menu, index) => {
  // div박스 만들어주기
  const orders = menu_list.map((menu, index) => {
    order_list = document.createElement("div");
    order_list.classList.add("order_list");

    // div.menu_id tag를 만들어라
    const menu_id = document.createElement("div");
    menu_id.classList.add("menu_id");
    // menu_id.innerText = menu.p_code;
    menu_id.innerText = menu.to_pcode;

    // div.menu_name tag를 만들어라
    const menu_name = document.createElement("div");
    menu_name.classList.add("menu_name");
    // menu_name.innerText = menu.p_name;
    // menu_name.innerText = menu.to_name;

    const menu_qty = document.createElement("div");
    menu_qty.classList.add("menu_qty");
    menu_qty.innerText = 1;

    const menu_price = document.createElement("div");
    menu_price.classList.add("menu_price");
    // menu_price.innerText = menu.p_price;
    menu_price.innerText = menu.to_price;

    // 각자 div로 생성해 놓은 것들을
    order_list.appendChild(menu_id);
    order_list.appendChild(menu_name);
    order_list.appendChild(menu_qty);
    order_list.appendChild(menu_price);

    return order_list;
    // article.order_list에 넣어주기
    // order_box.appendChild(order_list); 주석처리 하는 이유는 배열로 되어있기 때문에 위에서 지워도 지워지지 않기 때문?
  });
  order_box.append(...orders);
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
    .then((result) => add_order_list(result.order_list));
  // order_list를 menu_list에서 변경해주기
};

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
        order_input(table_id, menu_id);
      }
    });
  }

  // 주문서 화면이 열릴 때 fetch를 실행해서 서버로부터 table에 주문내용이 있으면 가져와서 리스트를 보여주기
  fetch(`/pos/getorder/${table_id}`)
    .then((res) => res.json())
    .then((result) => add_order_list(result));
});
