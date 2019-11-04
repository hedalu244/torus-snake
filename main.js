var board;
var size;
var posX, posY;
var vecX, vecY;
var appleX, appleY;
var length;
var rotate;

var canvas, ctx;

function init() {
  size = 16;
  board = [];
  for (var x = 0; x < size; x++) {
    board[x] = [];
    for (var y = 0; y < size; y++){
      board[x][y] = 0;
    }
  }
  posX = 0, posY = 0;
  vecX = 0, vecY = 0;
  appleX = 5, appleY = 0;
  length = 10;
  rotate = "";

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  document.onkeydown = (event) => {
    if (event.key === 'ArrowLeft') rotate = "left";
    if (event.key === 'ArrowRight') rotate = "right";
    if (event.key === 'ArrowUp') rotate = "up";
    if (event.key === 'ArrowDown') rotate = "down";
  }

  update();
}

function update() {
  if(rotate === "left" && vecX === 0)
    vecX = -1, vecY = 0;
  if(rotate === "right" && vecX === 0)
    vecX = 1, vecY = 0;
  if(rotate === "up" && vecY === 0)
    vecX = 0, vecY = -1;
  if(rotate === "down" && vecY === 0)
    vecX = 0, vecY = 1;

  posX += vecX;
  posY += vecY;

  if (posX < 0) posX += size;
  if (posY < 0) posY += size;
  if (size <= posX) posX -= size;
  if (size <= posY) posY -= size;

  if ((vecX !== 0 || vecY !== 0) && board[posX][posY] !== 0) {
    alert("Game Over");
    init();
    return;
  }

  if (posX === appleX && posY === appleY) {
    length++;
    do {
      appleX = Math.floor(Math.random() * size);
      appleY = Math.floor(Math.random() * size);
    } while(board[appleX][appleY] !== 0)
  }
  else {
    for (var x = 0; x < size; x++) {
      for (var y = 0; y < size; y++) {
        board[x][y] = Math.max(0, board[x][y] - 1);
      }
    }
  }

  board[posX][posY] = length;

  render();

  setTimeout(update, 100);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var w = canvas.width / size;
  var h = canvas.height / size;
  for(var x = 0; x < size; x++) {
    for(var y = 0; y < size; y++) {
      if (0 < board[x][y])
        ctx.fillStyle = 'green';
      else if (x === appleX && y === appleY)
        ctx.fillStyle = 'red';
      else if ((x + y) % 2 === 0)
        ctx.fillStyle = '#e0e0e0';
      else
        ctx.fillStyle = '#eaeaea';

      ctx.fillRect((x - posX + size / 2 - 0.5 - size) * w, (y - posY + size / 2 - 0.5 - size) * h, w - 1, h - 1);
      ctx.fillRect((x - posX + size / 2 - 0.5 - size) * w, (y - posY + size / 2 - 0.5) * h, w - 1, h - 1);
      ctx.fillRect((x - posX + size / 2 - 0.5 - size) * w, (y - posY + size / 2 - 0.5 + size) * h, w - 1, h - 1);
      ctx.fillRect((x - posX + size / 2 - 0.5) * w, (y - posY + size / 2 - 0.5 - size) * h, w - 1, h - 1);
      ctx.fillRect((x - posX + size / 2 - 0.5) * w, (y - posY + size / 2 - 0.5) * h, w - 1, h - 1);
      ctx.fillRect((x - posX + size / 2 - 0.5) * w, (y - posY + size / 2 - 0.5 + size) * h, w - 1, h - 1);
      ctx.fillRect((x - posX + size / 2 - 0.5 + size) * w, (y - posY + size / 2 - 0.5 - size) * h, w - 1, h - 1);
      ctx.fillRect((x - posX + size / 2 - 0.5 + size) * w, (y - posY + size / 2 - 0.5) * h, w - 1, h - 1);
      ctx.fillRect((x - posX + size / 2 - 0.5 + size) * w, (y - posY + size / 2 - 0.5 + size) * h, w - 1, h - 1);
    }
  }
}


window.onload = init;
