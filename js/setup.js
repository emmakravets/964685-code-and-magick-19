'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var getRandomData = function (items) {
  for (var i = 0; i < items.length; i++) {
    var randomDataAttribute = items[Math.floor(Math.random() * items.length)];
  }
  return randomDataAttribute;
};

//var wizardFullName = getRandomData(WIZARD_FIRST_NAMES ).concat(getRandomData(WIZARD_SECOND_NAMES));

var similarWizards = [
  {
    name: getRandomData(WIZARD_FIRST_NAMES) + ' ' + getRandomData(WIZARD_SECOND_NAMES),
    coatColor: getRandomData(WIZARD_COAT_COLOR),
    eyesColor: getRandomData(WIZARD_EYE_COLOR)
  },
  {
    name: getRandomData(WIZARD_FIRST_NAMES) + ' ' + getRandomData(WIZARD_SECOND_NAMES),
    coatColor: getRandomData(WIZARD_COAT_COLOR),
    eyesColor: getRandomData(WIZARD_EYE_COLOR)
  },
  {
    name: getRandomData(WIZARD_FIRST_NAMES) + ' ' + getRandomData(WIZARD_SECOND_NAMES),
    coatColor: getRandomData(WIZARD_COAT_COLOR),
    eyesColor: getRandomData(WIZARD_EYE_COLOR)
  },
  {
    name: getRandomData(WIZARD_FIRST_NAMES) + ' ' + getRandomData(WIZARD_SECOND_NAMES),
    coatColor: getRandomData(WIZARD_COAT_COLOR),
    eyesColor: getRandomData(WIZARD_EYE_COLOR)
  }
];

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var generateWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < similarWizards.length; i++) {
  fragment.appendChild(generateWizard(similarWizards[i]));
};
similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');
