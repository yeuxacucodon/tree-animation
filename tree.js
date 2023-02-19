var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function drawLine(x1, y1, x2, y2, thickness, color) {
  context.lineWidth = thickness;
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();
}

function setCanvasSize() {
  canvas.width = window.visualViewport.width;
  canvas.height = window.visualViewport.height;
  startX = canvas.width / 2;
  height =
    ((canvas.height > canvas.width ? canvas.width : canvas.height) * 10) / 36;
  startY =
    canvas.height / 2 +
    (canvas.width > canvas.height ? canvas.height : canvas.width) / 4;
}

window.onresize = setCanvasSize;

var angleIncrement = (30 * Math.PI) / 180;
var angleIncrementChange = (25 * (-0.01 * Math.PI)) / 180; // change speed
var startX = canvas.width / 2;
var startY = canvas.height - 100;
var height = (canvas.height * 10) / 36;
var thickness = 2;
var maxDepth = 6;
var count = 0;
var branchPropagation = 8;
var color = "#E8FF06";

function drawBranch(x, y, height, thickness, angle, depth) {
  if (depth > maxDepth) return;
  var endX = x - height * Math.sin(+angle);
  var endY = y - height * Math.cos(+angle);
  drawLine(x, y, endX, endY, thickness, color);
  var newHeight = (height * 8) / 12;
  var newThickness = (thickness * 6) / 12;
  var angleStart;
  if (branchPropagation % 2 === 0) {
    angleStart =
      angle -
      angleIncrement / 2 -
      (Math.trunc(branchPropagation / 2) - 1) * angleIncrement;
  } else {
    angleStart = angle - Math.trunc(branchPropagation / 2) * angleIncrement;
  }

  for (var i = 0; i < branchPropagation; i++) {
    drawBranch(
      endX,
      endY,
      newHeight,
      newThickness,
      angleStart + i * angleIncrement,
      depth + 1
    );
  }
}

function drawAnimation() {
  angleIncrement += angleIncrementChange;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBranch(startX, startY, height, thickness, 0, Math.PI / 2);
  requestAnimationFrame(drawAnimation);
}

setCanvasSize();
drawAnimation();
