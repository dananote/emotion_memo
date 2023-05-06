
//todo 로컬 스토리지 전
//* 1. 입력할 수 있는 기능
//*  1-1 콘텐츠의 글자수 제한
//*  1-2 둘중 하나라도 입력을 안했을시 alert 을 띄움
//* 2. 저장을 누를수 있는 기능
//   2-1 '현재 입력된 todo가 없습니다' 텍스트 사라짐
//*   2-2 저장한 값을 화면에 불러옴
//*   2-3 저장과 동시에 인풋창이 초기화
//*   2-4 저장을 누른 시점의 날짜 기록
//   2-5 삭제버튼을 누르면 다시 '현재 입력된 todo가 없습니다' 텍스트가 돌아와야함
//   2-6 새로 추가 되는 메모가 제일 위로 올라와야함

//* 3. 삭제 기능
//*   3-1 삭제하면 화면에서 사라짐
//* 4. 입력한 데이터 웹 스토리지에 저장
//*  4-1. 입력한 타겟 메모 지울시 웰 스토리지에서도 삭제
//*  4-2.  로컬스토리지에 있는 데이터를 기반으로 화면에 리스트 띄움
//* 5. 마음비우기 누르면 모달창 뜸
//*  5-1. 모달창 닫으면 메모 지워짐
//  5-2. 멘트 랜덤으로 나옴

//todo 모달창 기능
//* 1. 마음비우기 누르면 모달창 뜸
//*    1-1 모달창 닫으면 메모 지워짐
// 2. 멘트 랜덤으로 나옴

// 오늘 날짜 생성

let date = new Date();

let totalMemos = [];


// 로컬스토리지 데이터 가져오기
const save = (totalMemos) => {
  localStorage.setItem("totalMemos", JSON.stringify(totalMemos));
};

// 변수 모음
const inputTitle = document.querySelector(".memo-title");
const inputContent = document.querySelector(".memo-content");
const submitBtn = document.querySelector("form > .main-button");
const memoBox = document.querySelector(".list-box");
const emptyText = document.querySelector(".empty-text");
const count = document.querySelector(".count");

//  텍스트 길이 제한
inputContent.addEventListener("input", () => {
  let content = inputContent.value;
  if (content.length > 150) {
    content = content.slice(0, 150);
    inputContent.value = content;
  }

  count.textContent = `${content.length} / 150`;
});

// 요소 생성
const addItem = (memo) => {
  if (memo.title != "" && memo.content != "") {

    const memoList = document.createElement("li");
    memoList.classList.add("memos-item");

    const memoTitle = document.createElement("h2");
    memoTitle.classList.add("memos-title");
    memoTitle.textContent = memo.title;

    const memoDate = document.createElement("p");
    memoDate.classList.add("date");
    memoDate.textContent = memo.date;

    const memoContent = document.createElement("p");
    memoContent.classList.add("memos-content");
    memoContent.textContent = memo.content;

    const delBtn = document.createElement("button");
    delBtn.classList.add("memos-button");
    delBtn.textContent = "마음 비우기";

    memoList.append(memoTitle, memoDate, memoContent, delBtn);
    memoBox.append(memoList);
    memoList.id = memo.id;
  }
};

// 핸들러 이벤트
const handler = (event) => {
  event.preventDefault();

  const memo = {
    id: Date.now(),
    title: inputTitle.value,
    content: inputContent.value,
    date: date.toLocaleDateString(),
  };

  totalMemos.push(memo);

  addItem(memo);
  save(totalMemos);
  init();

  animation();

  inputTitle.value = "";
  inputContent.value = "";
  count.textContent = "0 / 150";
};

//!메모 애니메이션
// 새로 생성되는 애를 하면 되는데 그 대상을 메모 박스 추가되는 가장 마지막 자식으로 하면될듯
const animation = () => {
  memoBox.lastChild.classList.add("addanimation")
}


const init = () => {
  const userMemo = JSON.parse(localStorage.getItem("totalMemos")) ?? [];

  if (userMemo) {
    memoBox.innerHTML = "";
    userMemo.forEach((todo) => {
      addItem(todo);
    });
  }

  totalMemos = userMemo;
};

// function empty() {
//     if (memoBox.childElementCount > 1) {
//         emptyText.style.display = "none";
//         memoBox.style.display = "block";
//     } else if(memoBox.childElementCount = 1) {
//         emptyText.style.display = "block";
//         memoBox.style.display = "flex";
//     }
// }

init();

// 이벤트 생성
submitBtn.addEventListener("click", handler);

//! 위로의말 랜덤으로 뜨게하기 TIP
// 배열에 여러가지 문구  만들어놓고 showModal() 하기전에 dialog에 배열에서 Math.random()으로 index 해서 createElement('p') 해준다음에 textContent='배열값' 넣어주면 문구 랜덤으로 뜰거에요~  짜장짬뽕이랑 비슷해요ㅋㅋ

// 삭제 이벤트

memoBox.addEventListener("click", (event) => {
  // console.log(event.target.getAttribute('class'))
  if (event.target.getAttribute("class") == "memos-button") {
    const modal = document.querySelector("dialog");
    modal.showModal();

    totalMemos = totalMemos.filter(
      (memo) => memo.id != event.target.parentElement.id
    );
    save(totalMemos);

    event.target.parentElement.remove();

  }
});