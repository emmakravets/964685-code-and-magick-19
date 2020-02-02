'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_LIMIT = 4;

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var generateRandomWizard = function () {
  return {
    name: getRandomItem(WIZARD_FIRST_NAMES) + ' ' + getRandomItem(WIZARD_SECOND_NAMES),
    coatColor: getRandomItem(WIZARD_COAT_COLOR),
    eyesColor: getRandomItem(WIZARD_EYE_COLOR)
  };
};

var generateRandomWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_LIMIT; i++) {
    wizards.push(generateRandomWizard());
  }
  return wizards;
};

var createWizardElement = function (wizard) {
  var wizardElement = wizardTemplateElement.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

var popupKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    popupCloseHandler();
  }
};

var popupOpenHandler = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', popupKeydownHandler);
};

var popupCloseHandler = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', popupKeydownHandler);
};

var wizardCoatChangeHandler = function () {
  var coatColor = getRandomItem(WIZARD_COAT_COLOR);
  setupWizardCoatElement.style.fill = coatColor;
  setupWizardCoatInputElement.value = coatColor;
};

var wizardEyesChangeHandler = function () {
  var eyesColor = getRandomItem(WIZARD_EYE_COLOR);
  setupWizardEyesElement.style.fill = eyesColor;
  setupWizardEyesInputElement.value = eyesColor;
};

var wizardFireballChangeHandler = function () {
  var fireballColor = getRandomItem(WIZARD_FIREBALL_COLOR);
  setupWizardFireballElement.style.backgroundColor = fireballColor;
  setupWizardFireballInputElement.value = fireballColor;
};

var wizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var userNameInputElement = setupElement.querySelector('.setup-user-name');
var setupWizardElement = setupElement.querySelector('.setup-wizard');
var setupWizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
var setupWizardCoatInputElement = setupElement.querySelector('input[name="coat-color"]');
var setupWizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
var setupWizardEyesInputElement = setupElement.querySelector('input[name="eyes-color"]');
var setupWizardFireballElement = setupElement.querySelector('.setup-fireball-wrap');
var setupWizardFireballInputElement = setupWizardFireballElement.querySelector('input[name="fireball-color"]');

setupElement.querySelector('.setup-similar').classList.remove('hidden');
var wizards = generateRandomWizards();
renderWizards(wizards);

setupOpenElement.addEventListener('click', function () {
  popupOpenHandler();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    popupOpenHandler();
  }
});

setupCloseElement.addEventListener('click', function () {
  popupCloseHandler();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    popupCloseHandler();
  }
});

var validateUserNameInput = function () {
  if (userNameInputElement.validity.tooShort) {
    return 'Имя пользователя должно состоять минимум из 2-х символов';
  }
  if (userNameInputElement.validity.tooLong) {
    return 'Имя пользователя не должно превышать 25-ти символов';
  }
  if (userNameInputElement.validity.valueMissing) {
    return 'Вы пропустили это поле';
  }
  return '';
};

userNameInputElement.addEventListener('invalid', function () {
  userNameInputElement.setCustomValidity(validateUserNameInput());
});

setupWizardCoatElement.addEventListener('click', wizardCoatChangeHandler);
setupWizardEyesElement.addEventListener('click', wizardEyesChangeHandler);
setupWizardFireballElement.addEventListener('click', wizardFireballChangeHandler);
