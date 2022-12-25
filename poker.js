alert("Welcome To Master Of Memory!!");
alert("You only have ten minutes!!");
alert("Lets Go!!");
$(document).ready(function(){
	
var checkArray = [];     // 檢查兩個點擊的字段是否是相同的撲克牌
var idCheck = [];                    // 用於存儲單擊字段 ID 的幫助器數組，因此如果它們不同，我可以刪除“翻轉”類
var counter = 0;
var end = 0;                         // 用於檢測是否所有字段都已完成
var fields = document.querySelectorAll(".card-back");
var natureSound = new Audio("");
var spark = new Audio("");
var win = new Audio("");


var images = [
	"a1.ico","a2.ico","a3.ico","a4.ico","a5.ico","a6.ico","a7.ico","a8.ico","a9.ico","a10.ico","a11.ico","a12.ico","a13.ico",
	"b1.ico","b2.ico","b3.ico","b4.ico","b5.ico","b6.ico","b7.ico","b8.ico","b9.ico","b10.ico","b11.ico","b12.ico","b13.ico",
	"b1.ico","b2.ico","b3.ico","b4.ico","b5.ico","b6.ico","b7.ico","b8.ico","b9.ico","b10.ico","b11.ico","b12.ico","b13.ico",
	"a1.ico","a2.ico","a3.ico","a4.ico","a5.ico","a6.ico","a7.ico","a8.ico","a9.ico","a10.ico","a11.ico","a12.ico","a13.ico",
	"c1.ico","c2.ico","c3.ico","c4.ico","c5.ico","c6.ico","c7.ico","c8.ico","c9.ico","c10.ico","c11.ico","c12.ico","c13.ico",
	"c1.ico","c2.ico","c3.ico","c4.ico","c5.ico","c6.ico","c7.ico","c8.ico","c9.ico","c10.ico","c11.ico","c12.ico","c13.ico",
	"d1.ico","d2.ico","d3.ico","d4.ico","d5.ico","d6.ico","d7.ico","d8.ico","d9.ico","d10.ico","d11.ico","d12.ico","d13.ico",
	"d1.ico","d2.ico","d3.ico","d4.ico","d5.ico","d6.ico","d7.ico","d8.ico","d9.ico","d10.ico","d11.ico","d12.ico","d13.ico",
	"joker.ico","joker.ico","joker1.ico","joker1.ico","good.ico","good.ico"
];

function clicked() {                                        // 單擊功能，這樣我就可以解除綁定單擊事件，以防止像一次單擊超過 2 個字段這樣的
	if ($(this).find(".card-wrap").hasClass("flipped")) {
		return;
	}
	$(this).find(".card-wrap").toggleClass("flipped");
	checkArray.push($(this).find("img").attr("src"));
	idCheck.push($(this).attr("id"));
	check();
}

$(".centered-wrap").on("click", clicked);
	

function restart() {
	$(".card-back").find("img").remove(); //從字段中刪除所有當前圖像
	$(".centered-wrap .card-wrap").removeClass("flipped"); //刪除翻轉類，以便他們可以在起始位置再次翻轉
	checkArray = []; // 空檢查數組
	idCheck = []; // 空 ID 檢查數組
	counter = 0; // 重置計數器
	end = 0; // 重置結束變量
	startGame();
}

function checkEnd() {
	if (end === 52) { //如果發現所有 52 個字段
		win.play();
		alert("Game is over! Your score is " + counter);
		restart();
	}
}

function shuffleArray(array) { // 帶有圖像的洗牌數組
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function startGame() {
	natureSound.play(); // 播放背景音樂
	var arr = shuffleArray(images); // 存儲打亂的圖像數組
	for (var i = 0; i < fields.length; i++) { // 將這些圖像附加到類為“back”的 div
		var img = document.createElement("img");
		img.src = arr[i];
		fields[i].appendChild(img);
	}
}

function check() {
	if (checkArray.length === 2) { // 如果字段被點擊 2 次我們正在檢查
		$(".centered-wrap").off("click", clicked); //禁用點擊事件以防止出現問題
		setTimeout(function(){
			if (checkArray[0] !== checkArray[1]) { // 如果沒有匹配
				$("#" + idCheck[0]).find(".card-wrap").removeClass("flipped"); // 向後翻轉卡片包裝
				$("#" + idCheck[1]).find(".card-wrap").removeClass("flipped"); // 第二個也向後翻轉
				counter++;
				checkArray = []; //接下來的 2 次點擊清空檢查數組
				idCheck = []; // 和這個一樣
				$(".centered-wrap").on("click", clicked); // 再次綁定點擊
			} 
			else {
				spark.play();
				counter++;
				end += 2; //如果有匹配項，則“end”會增加 2，因為未發現 2 個字段
				checkArray = []; // 下一次嘗試的空數組
				idCheck = []; // 這個也是
				checkEnd(); // 檢查遊戲是否結束
				$(".centered-wrap").on("click", clicked); // 再次綁定點擊
			}
			document.querySelector(".counter").innerHTML = counter;
		}, 800);	
	}
}
startGame();
});
//---------------------------時間計時器-------------------------
function paddedFormat(num) {
    return num < 10 ? "0" + num : num; 
}

function startCountDown(duration, element) {

    let secondsRemaining = duration;
    let min = 0;
    let sec = 0;

    let countInterval = setInterval(function () {

        min = parseInt(secondsRemaining / 60);
        sec = parseInt(secondsRemaining % 60);

        element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

        secondsRemaining = secondsRemaining - 1;
        if (secondsRemaining < 0) { clearInterval(countInterval) };

    }, 1000);
}

window.onload = function () {
    let time_minutes = 10; // Value in minutes
    let time_seconds = 0; // Value in seconds

    let duration = time_minutes * 60 + time_seconds;

    element = document.querySelector('#count-down-timer');
    element.textContent = `${paddedFormat(time_minutes)}:${paddedFormat(time_seconds)}`;

    startCountDown(--duration, element);
};