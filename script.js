//랜덤 번호 지정

//유저가 번호 입력, go버튼 click
//유저가 번호 맞추면 맞췄습니다
//랜덤 번호 < 유저번호 --> down
//랜덤번호 < 유저번호 --> up

//reset 버튼 click--> 게임 리셋

//go버튼-->3번의 기회를 다 쓰면 게임 끝(더이상 추측불가/버튼이 disabled)

//go버튼 -->유저가 1~100밖의 숫자를 입력하면 알려주고 기회 깎지 않음
//go버튼 -->유저가 이미 입력한 숫자를 입력하면 알려주고, 기회를 깎지 않음

//focus기능
//답 맞췄을때 go버튼 disabled

let computerNumber = 0;
let userInput = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){
    userInput.value = "";
})

//랜덤번호 만드는 함수
function pickRandomNum() {
    computerNumber = Math.floor(Math.random() * 100) + 1;
    console.log("정답",computerNumber);
}
pickRandomNum();
//go 클릭시 실행될 함수
function play(){
    let userValue = userInput.value;

    //값의 유효성 검사
    if(userValue < 1 || userValue >100) {
        resultArea.textContent = "1과 100사이의 숫자 입력";
        return;
    } 

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 값";
        return;
    }


    chances --;
    chanceArea.textContent = `남은 기회는 ${chances}번`;

    if(userValue < computerNumber) {
        resultArea.textContent = "up up !!!"
    } else if (userValue > computerNumber) {
        resultArea.textContent = "down down!!!"
    } else {
        resultArea.textContent = "정답!!!";
        gameOver = true;
    }

    history.push(userValue);
    console.log(history);

    if (chances < 1) {
        gameOver =true;
    }
    if(gameOver) {
        playButton.disabled = true;
    }
}

//reset 클릭시 실행될 함수
function reset(){
    userInput.value = ""; //input 창 정리
    pickRandomNum(); //새로운 번호 지정
    resultArea.textContent = "결과 보여주는 곳";
    playButton.disabled = false; //playButton 활성화
    gameOver = false; //게임 시작
    chances = 5; //기회 다시 5번
    chanceArea.textContent = "남은기회는 5번";
    history = []; //history reset
};