// let countDown = 30;  // 设置倒计时初始值
// let cD = document.getElementById('countDownTime');
// let isEnded = false;

// 每秒调用一次 startCountDown 来更新倒计时
// setInterval(function () {
//     startCountDown();
// }, 1000);

// function startCountDown() {
//     if (countDown > 0) {
//         countDown = countDown - 1;
//         cD.innerText = countDown;  // 更新倒计时显示
//     } else if (!isEnded) {
//         isEnded = true;
//         cD.innerText = "Time's Up";  // 倒计时结束时显示 "Time's Up"
//         notifyEndOfCountdown();  // 通知 sketch.js 倒计时已结束
//     }
// }

// // 自定义事件，用于通知倒计时结束
// function notifyEndOfCountdown() {
//     const event = new CustomEvent('countdownFinished', { detail: { message: "Time's Up" } });
//     window.dispatchEvent(event);  // 使用 window 触发事件
// }