document.addEventListener("DOMContentLoaded", () => {
    // 获取 finishedImg 元素
    const finishedImg = document.getElementById("finishedImg");
    const createdWork = document.getElementById("createdWork");
    // 获取 ratio 的值（从服务器传递到前端的变量）
    const ratio = document.getElementById("ratioData").textContent.trim();

    // 根据 ratio 设置 CSS 样式
    if (ratio === "43") {
        finishedImg.style.cssText = `
            width: 500px;
            height: 375px;
            margin-top: 12vh;
            border-radius: 1px;
            filter: drop-shadow(2px 1px 6px #b2b2b2);
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        createdWork.style.cssText =  `
                width: 80%;
                height: auto;
                display: flex;
        `;
    } else if (ratio === "32") {
        finishedImg.style.cssText = `
            width: 346px;
            height: 520px;
            margin-top: 5vh;
            border-radius: 1px;
            filter: drop-shadow(2px 1px 6px #b2b2b2);
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        createdWork.style.cssText =  `
        height:80%;
        width: auto;
        display: flex;
        `;
    } else if (ratio === "11") {
        finishedImg.style.cssText = `
            width: 400px;
            height: 400px;
            margin-top: 12vh;
            border-radius: 1px;
            filter: drop-shadow(2px 1px 6px #b2b2b2);
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        createdWork.style.cssText =  `
        width: 70%;
        height: auto;
        display: flex;
        `;
    } else {
        console.error("Invalid ratio:", ratio);
    }
});
const form = document.getElementById("updateForm");
const enterNameArea = document.getElementById("EnterNameArea");
const contentArea = document.getElementById("ContentArea");


