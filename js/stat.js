'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_X = 140;
var TEXT_Y = 250;
var TEXT_GAP = 20;
var BAR_Y = 90;
var BAR_STEP = 50;
var BAR_WIDTH = 40;
var barHeight = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// находим макс. время
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, 30);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, 30 + TEXT_GAP);

  // var players = ['Вы', 'Кекс', 'Сашка', 'Петька'];
  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    // x = (barHeight * bar[i]) / maxBar;
    ctx.fillText(players[i], TEXT_X + (BAR_WIDTH + BAR_STEP) * i, TEXT_Y);
    ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_STEP) * i, (BAR_Y + barHeight) - (barHeight * times[i]) / maxTime, BAR_WIDTH, (barHeight * times[i]) / maxTime);
  }

  /* ctx.fillText('Вы', TEXT_X + (BAR_WIDTH + BAR_STEP) * 0, TEXT_Y);
  ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_STEP) * 0, BAR_Y, BAR_WIDTH, barHeight);

  ctx.fillText('Кекс', TEXT_X + (BAR_WIDTH + BAR_STEP) * 1, TEXT_Y);
  ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_STEP) * 1, BAR_Y, BAR_WIDTH, barHeight);

  ctx.fillText('Сашка', TEXT_X + (BAR_WIDTH + BAR_STEP) * 2, TEXT_Y);
  ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_STEP) * 2, BAR_Y, BAR_WIDTH, barHeight);

  ctx.fillText('Петька', TEXT_X + (BAR_WIDTH + BAR_STEP) * 3, TEXT_Y);
  ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_STEP) * 3, BAR_Y, BAR_WIDTH, barHeight);
  */
};
