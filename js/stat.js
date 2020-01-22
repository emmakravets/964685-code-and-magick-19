'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)';
var CLOUD_GAP = 10;

var TEXT_GAP = 20;
var TEXT_Y = 30;
var TEXT_COLOR = '#000000';
var TEXT_FONT = '16px PT Mono';
var TEXT_BASELINE = 'hanging';

var BAR_Y = 90;
var BAR_STEP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_TEXT_X = 140;
var BAR_TEXT_Y = 250;
var BAR_COLOR = 'rgba(255, 0, 0, 1)';

var MESSAGES_TEXT = ['Ура вы победили!', 'Список результатов:'];

var renderMessages = function (ctx, messagesArr, font, fontColor, baseline, x, y, lineHeight) {
  for (var i = 0; i < messagesArr.length; i++) {
    ctx.fillStyle = fontColor;
    ctx.font = font;
    ctx.textBaseline = baseline;
    ctx.fillText(messagesArr[i], x, y + lineHeight * i);
  }
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var generateRandomColor = function () {
  var randomColor = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
  return randomColor;
};
// находим макс. время
var getMaxItem = function (arr) {
  var maxItem = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxItem) {
      maxItem = arr[i];
    }
  }
  return maxItem;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderMessages(ctx, MESSAGES_TEXT, TEXT_FONT, TEXT_COLOR, TEXT_BASELINE, CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP, TEXT_GAP);

  var maxTime = getMaxItem(times);
  var barHeight;
  var coordinateLeft;

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = TEXT_COLOR;

    barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    coordinateLeft = BAR_TEXT_X + (BAR_WIDTH + BAR_STEP) * i;
    ctx.fillText(players[i], coordinateLeft, BAR_TEXT_Y);
    ctx.fillText(Math.floor(times[i]), coordinateLeft, (BAR_TEXT_Y - TEXT_Y) - barHeight);

    ctx.fillStyle = players[i] === 'Вы' ? BAR_COLOR : generateRandomColor();

    ctx.fillRect(coordinateLeft, (BAR_Y + BAR_HEIGHT) - barHeight, BAR_WIDTH, barHeight);
  }
};
