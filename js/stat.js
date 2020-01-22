'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)';
var CLOUD_GAP = 10;
var TEXT_X = 20;
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

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.textBaseline = TEXT_BASELINE;
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_X, TEXT_Y + TEXT_X);

  var maxTime = getMaxItem(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = TEXT_COLOR;

    var coordinateLeft = BAR_TEXT_X + (BAR_WIDTH + BAR_STEP) * i;
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    ctx.fillText(players[i], coordinateLeft, BAR_TEXT_Y);
    ctx.fillText(Math.floor(times[i]), coordinateLeft, (BAR_TEXT_Y - TEXT_Y) - barHeight);

    if (players[i] === 'Вы') {
      ctx.fillStyle = BAR_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    }

    ctx.fillRect(coordinateLeft, (BAR_Y + BAR_HEIGHT) - barHeight, BAR_WIDTH, barHeight);
  }
};
