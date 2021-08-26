const fontNames = [
  "맑은 고딕",
  "궁서",
  "굴림",
  "바탕체",
  "돋움체",
  "Arial",
  "Arial Black",
  "Comic Sans MS",
  "Courier New",
];

const fontSizes = [
  "8",
  "9",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "25",
  "30",
  "40",
  "50",
  "65",
  "72",
  "81",
  "100",
  "121",
  "144",
];

const toolbar = [
  ["style", ["bold", "italic", "underline"]],
  ["font", ["fontname", "fontsize"]],
  ["design", ["height", "color"]],
  ["para", ["ul", "ol"]],
  ["view", ["fullscreen", "help", "codeview"]],
];
// 위치 바꾸기
// jquery를 사용하여 summernote 적용하기
$(function () {
  $("#b_text").summernote({
    lang: "ko-KR",
    toolbar,
    fontNames: fontNames,
    fontsize: fontSizes,
    placeholder: "내용을 입력해주세요",
    width: "60%",
    height: "300px",
    // summernote를 사용할 때 설정하는 event 핸들러
    callbacks: {
      /**
       * summernote 입력창에
       * 이미지를 drag-and-drop 할 때 발생하는 event
       *
       * summernote 입력창에
       * 이미지를 d&drop을 하면 입력창에 바로 이미지를 추가하면서
       * 글을 작성할 수 있다.
       *
       * 이런식으로 이미지를 추가하면 작성되는 글 내용에 이미지가 encoding된
       * 코드로 변경이 되고 글 내용의 크기가 어마어마하게 커져버린다.
       * DB에 해당 내용을 저장하면 BLOB,CLOB type으로 칼럼을 만들고
       * 저장하는 방법이 있다.
       * 하지만, 일반적으로 Web Server App에서는 한꺼번에 대량의 text를 업로드 하는 것을
       * 허용하지 않는다.
       * 또한 BLOB, CLOB
       * 집에서 주석 작성하자!
       *
       * onImageUpload 이벤트가 발생하면
       * drop 한 이미지들의 정보와,
       * summernote 자신(객체)의 정보를
       * 함수에 전달한다.
       *
       * 우리가 선언한 fileUpfetch() 함수에 drop한 파일 정보를 files에 담아 전달하면서 실행한다.
       *
       */
      //이미지를 업로드 할때
      onImageUpload: function (files) {
        fileUpfetch(files);
      },
    },
  });
});
// $("#b_text").summernote({
//   lang: "ko-KR",
//   toolbar,
//   fontNames: fontNames,
//   fontsize: fontSizes,
//   placeholder: "내용을 입력해주세요",
//   width: "60%",
//   height: "300px",
// });
