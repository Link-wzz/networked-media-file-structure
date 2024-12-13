let currentColor = '#000000'; // 默认画笔颜色为黑色
let brushLong;
let eraser;
let canvasElement;

function preload() {
    brushLong  = loadImage("../images/brushLong.png", () => console.log('Brush image loaded'));
    eraser = loadImage("../images/eraser.png", () => console.log('Eraser image loaded'));
}

let barWidth;
let barHeight;
let barX;
let barY;

// 更新后的有效颜色数组
const validColors = [
  { r: 0, g: 0, b: 0 },         // 黑色
  { r: 255, g: 0, b: 0 },       // 红色
  { r: 255, g: 153, b: 0 },     // 橙色
  { r: 255, g: 212, b: 0 },     // 黄色
  { r: 53, g: 200, b: 0 },      // 绿色
  { r: 0, g: 200, b: 157 },     // 绿蓝色
  { r: 0, g: 178, b: 255 },     // 蓝色
  { r: 149, g: 0, b: 255 }      // 紫色
];

// 假设 userId 已定义
let userId = 'user123';
let countDown = 30;
// 倒计时相关变量
let isEnded = false;
let lastX, lastY;

let OrigionalImage;

// 添加 drawToolbar 函数
function drawToolbar() {
    noStroke();
    image(brushLong, barX, barY, 540, 70);
    image(eraser, barX + 430, barY + 16, 38, 38);

    let ellipseW = 28;
    let ellipseH = 28;

    // 绘制颜色选择圆点
    drawColorEllipse(barX + 50, barY + 35, ellipseW, ellipseH, color(0, 0, 0));
    drawColorEllipse(barX + 100, barY + 35, ellipseW, ellipseH, color(255, 0, 0));
    drawColorEllipse(barX + 150, barY + 35, ellipseW, ellipseH, color(255, 153, 0));
    drawColorEllipse(barX + 200, barY + 35, ellipseW, ellipseH, color(255, 212, 0));
    drawColorEllipse(barX + 250, barY + 35, ellipseW, ellipseH, color(53, 200, 0));
    drawColorEllipse(barX + 300, barY + 35, ellipseW, ellipseH, color(0, 200, 157));
    drawColorEllipse(barX + 350, barY + 35, ellipseW, ellipseH, color(0, 178, 255));
    drawColorEllipse(barX + 400, barY + 35, ellipseW, ellipseH, color(149, 0, 255));
}

function setup() {
    // 使用 windowWidth 和 windowHeight 创建画布，并将其放置在 id 为 'canvas' 的 div 中
    canvasElement = createCanvas(windowWidth, windowHeight);
    canvasElement.parent('#canvas');
    // resizeCanvas(window.innerWidth, window.innerHeight); 
    // resizeCanvas(1707, 898);
    pixelDensity(1);

    background(255);  // 设置背景为白色
    frameRate(60); // 设置合理的帧率

    console.log("width of the canvas is " + width + " height of the canvas is: " + height);

    // 获取倒计时显示元素
    cD = select('#countDownTime');

    // 设置工具栏的位置和尺寸
    barWidth = 550;
    barHeight = 70;
    barX = (windowWidth - barWidth) / 2 + 10;
    barY = windowHeight - barHeight - 94; 

    // 调用 drawToolbar 以绘制工具栏
    drawToolbar();

    // 初始化倒计时
    // startCountDown();
}

// 辅助函数：绘制颜色选择圆点
function drawColorEllipse(x, y, w, h, col) {
    fill(col);
    ellipse(x, y, w, h);
}

// 监听倒计时结束事件（如果使用此方法，请确保事件被正确触发）
window.addEventListener('countdownFinished', function(event) {
    console.log(event.detail.message);  // 打印 "Time's Up"
    captureAndUpload();  // 上传图片
    isEnded = true;
    setTimeout(() => {
        window.location.href = "/gameEnd"; // 修改为正确的路径
    }, 2000);
}, false);

// 主绘制循环
function draw() {
    if (!mousePositionDetect()) {
        if (mouseIsPressed) {
            fill(currentColor);
            noStroke();
            ellipse(mouseX, mouseY, 5);
        
            if (lastX !== undefined) {
                // 绘制从上一个点到当前点的线，确保没有间隙
                stroke(currentColor);
                strokeWeight(5); // 与圆的直径相同
                line(lastX, lastY, mouseX, mouseY);
            }
        
            // 更新存储的位置为当前位置
            lastX = mouseX;
            lastY = mouseY;
        } else {
            // 当鼠标未被按下时，重置上一个位置
            lastX = undefined;
            lastY = undefined;
        }
    }

    if (mousePositionDetect() && mouseIsPressed) {
        print("ispressed!");
        // 从画布上取色，并转换为十六进制颜色
        let pickedColor = get(mouseX, mouseY);
        currentColor = colorToHex(pickedColor[0], pickedColor[1], pickedColor[2]);
    } 
}

// 添加鼠标点击事件监听器
function mousePressed() {
    // 定义擦除工具的区域
    let eraserX = barX + 430;
    let eraserY = barY + 16;
    let eraserWidth = 38;
    let eraserHeight = 38;

    // 检查鼠标是否在擦除工具的区域内
    if (
        mouseX >= eraserX &&
        mouseX <= eraserX + eraserWidth &&
        mouseY >= eraserY &&
        mouseY <= eraserY + eraserHeight
    ) {
        clearCanvas();
    }
}

// 修改 clearCanvas 函数
function clearCanvas() {
    background(250); // 将背景重置为白色
    // 可选：重置绘图相关的变量
    lastX = undefined;
    lastY = undefined;
    // 如果有其他需要重置的状态变量，也在这里处理

    drawToolbar(); // 重新绘制工具栏
}

// 辅助函数：检测鼠标是否在颜色选择栏内
function mousePositionDetect() {
    if (mouseX >= barX && mouseX <= barX + barWidth && mouseY >= barY && mouseY <= barY + barHeight) {
        print("in the color picker bar!");
        return true;
    } else {
        return false;
    }
}

// 辅助函数：将 RGB 转换为十六进制颜色
function colorToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// 裁切并上传图像的函数
function captureAndUpload() {
    const boundingBox = findBoundingBoxFourDirection();
    if (!boundingBox) {
        console.error("未找到有效像素，裁剪失败。");
        return;
    }

    console.log("boundingBox: minX:" + boundingBox.minX + " minY:" + boundingBox.minY + " maxX:" + boundingBox.maxX + " maxY:" + boundingBox.maxY);

    // croppedImage 是一个 p5.Image 对象
    const croppedImage = cropImage(boundingBox);
    if (!croppedImage) {
        console.error("裁剪失败，无法上传图像。");
        return;
    }

    uploadCroppedImage(croppedImage);
}

function findBoundingBoxFourDirection() {
    const OriginalImage = get(0, 0, width, height);
    console.log(`Pixel density: ${pixelDensity()}`);

    OriginalImage.loadPixels();

    const w = OriginalImage.width;
    const h = OriginalImage.height;
    console.log("OriginalImage.width: " + OriginalImage.width + " OriginalImage.height: " + OriginalImage.height);
    console.log("OriginalImage.pixels.length: " + OriginalImage.pixels.length);

    let minX = w, minY = h, maxX = 0, maxY = 0;

    // 扫描像素，找到有效区域
    for (let y = 0; y < h-150; y++) {
        for (let x = 0; x < w; x++) {
            const index = (x + y * w) * 4;
            const r = OriginalImage.pixels[index];
            const g = OriginalImage.pixels[index + 1];
            const b = OriginalImage.pixels[index + 2];
            const a = OriginalImage.pixels[index + 3];

            if (isValidColor(r, g, b, a)) {
                if (x < minX) {
                    minX = x;
                    console.log("minX Renewed!!! " + minX);
                }
                if (x > maxX) {
                    maxX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (y > maxY) {
                    maxY = y;
                }
            }
        }
    }

    if (minX === w || minY === h || maxX === 0 || maxY === 0) {
        console.error('未找到有效像素，裁剪失败。');
        return null;
    }

    // 添加边缘扩展
    const margin = 5;
    minX = Math.max(0, minX - margin); // 确保不超出左边界
    minY = Math.max(0, minY - margin); // 确保不超出上边界
    maxX = Math.min(w - 1, maxX + margin); // 确保不超出右边界
    maxY = Math.min(h - 1, maxY + margin); // 确保不超出下边界

    console.log(`Bounding box with margin: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);
    return { minX, minY, maxX, maxY };
}

function isValidColor(r, g, b, a = 255, tolerance = 10) {
    // 忽略非完全不透明的像素
    if (a !== 255) return false;

    // 检查颜色是否在有效范围内，允许一定的容差
    return validColors.some(color => {
        return (
            Math.abs(r - color.r) <= tolerance &&
            Math.abs(g - color.g) <= tolerance &&
            Math.abs(b - color.b) <= tolerance
        );
    });
}

function cropImage(boundingBox) {
    const { minX, minY, maxX, maxY } = boundingBox;
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;

    // 创建一个新的 p5.Graphics 对象来裁剪图像
    let croppedGraphics = createGraphics(cropWidth, cropHeight);
    croppedGraphics.copy(canvasElement, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    console.log('裁剪成功: croppedGraphics.width = ' + croppedGraphics.width + " croppedGraphics.height = " + croppedGraphics.height);
    return croppedGraphics;
}

function uploadCroppedImage(croppedImage) {
    // 使用 p5.Image 的内部 canvas 属性
    const tempCanvas = croppedImage.canvas; // 直接获取 p5.Image 的 canvas

    // 计算长宽比
    const width = croppedImage.width;
    const height = croppedImage.height;
    let aspectRatio = "";

    // 判断最接近的比例
    const ratio = width / height;
    
    if (Math.abs(ratio - 1) < 0.25 || (Math.abs(ratio - 1) < 1.25 && 0.8 < Math.abs(ratio - 1))) { // 宽和高接近的图片
        aspectRatio = "11"; // 宽:高 = 1:1
    } else if (Math.abs(ratio - 4 / 3) < Math.abs(ratio - 2 / 3)) {
        aspectRatio = "43"; // 宽:高 = 4:3
    } else {
        aspectRatio = "32"; // 宽:高 = 2:3（立起来的长方形）
    }

    console.log(`Aspect ratio: ${aspectRatio}`);

    // 将 canvas 转换为 Blob 并上传
    tempCanvas.toBlob(blob => {
        const formData = new FormData();
        const filename = `${userId}_${Date.now()}.png`; // 生成唯一文件名

        formData.append("image", blob, filename); // 确保字段名 "image" 与服务器端一致
        formData.append("aspectRatio", aspectRatio); // 添加长宽比字符串

        fetch('/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include', // 传递会话信息
        })
        .then(res => res.json())
        .then(data => console.log('图像上传成功:', data))
        .catch(err => console.error('图像上传失败:', err));
    }, 'image/png');
}

// 切换页面，上传图像并重定向
function switchPage(){
    captureAndUpload();  // 截图并上传
    setTimeout(() => {
        window.location.href = "/gameEnd"; // 修改为正确的路径
    }, 2000);
}

// 开始倒计时
function startCountDown(){
    if(countDown > 0){
        countDown = countDown - 1;
        cD.html(countDown); // 使用 p5.js 的 select().html() 方法更新文本
    } else if(!isEnded){
        isEnded = true;
        cD.html(0);
        switchPage();
    }
}

// 每秒调用一次倒计时函数
setInterval(function(){
    startCountDown();
}, 1000);

// 可选：显示和隐藏加载动画
function showLoadingIndicator() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block';
    }
}

function hideLoadingIndicator() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}
