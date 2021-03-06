const fs = require('fs');
const chai = require('chai');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert; // Using Assert style

const DATA_DIRECTORY = 'public/data';
const AIMS_FILE_PATH = DATA_DIRECTORY + '/aims.json';
const CATEGORIES_FILE_PATH = DATA_DIRECTORY + '/categories.json';
const JUVE_PLAYERS_FILE_PATH = DATA_DIRECTORY + '/juvePlayers.json';
const OPPONENT_TEAMS_FILE_PATH = DATA_DIRECTORY + '/opponentTeams.json';
const OTHER_TITLES_FILE_PATH = DATA_DIRECTORY + '/otherTitles.json';
const TITLES_FILE_PATH = DATA_DIRECTORY + '/titles.json';

describe('aims.json file', function () {
  const fileContent = fs.readFileSync(AIMS_FILE_PATH);
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent);
      }
    );
  });

  it('should contains all the required fields and all of them should be strings', function () {
    const requireFields = [
      'name',
      'position',
      'team',
      'image'
    ];
    const aims = JSON.parse(fileContent);
    aims.forEach(function (aim, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(aim[field], 'The ' + field + ' field is not defined for aim ' + index);
        assert.isString(aim[field], 'The ' + field + ' field is not a string for aim ' + index);
      });
    });
  });
});

describe('categories.json file', function () {
  const fileContent = fs.readFileSync(CATEGORIES_FILE_PATH);
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent);
      }
    );
  });

  it('should contains all the required fields and all of them should be strings', function () {
    const requireFields = [
      'name',
      'color'
    ];
    const categories = JSON.parse(fileContent);
    categories.forEach(function (category, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(category[field], 'The ' + field + ' field is not defined for category ' + index);
        assert.isString(category[field], 'The ' + field + ' field is not a string for category ' + index);
      });
    });
  });
});

describe('juvePlayers.json file', function () {
  const fileContent = fs.readFileSync(JUVE_PLAYERS_FILE_PATH);
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent);
      }
    );
  });

  it('should contains all the required fields', function () {
    const requireFields = [
      'name',
      'position',
      'salable',
      'image'
    ];
    const juvePlayers = JSON.parse(fileContent);
    juvePlayers.forEach(function (juvePlayer, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(juvePlayer[field], 'The ' + field + ' field is not defined for juvePlayer ' + index);
      });
    });
  });
});

describe('opponentTeams.json file', function () {
  const fileContent = fs.readFileSync(OPPONENT_TEAMS_FILE_PATH);
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent);
      }
    );
  });

  it('should contains all the required fields', function () {
    const requireFields = [
      'name',
      'isItalian'
    ];
    const opponentTeams = JSON.parse(fileContent);
    opponentTeams.forEach(function (opponentTeam, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(opponentTeam[field], 'The ' + field + ' field is not defined for opponentTeam ' + index);
      });
    });
  });
});

describe('otherTitles.json file', function () {
  const fileContent = fs.readFileSync(OTHER_TITLES_FILE_PATH);
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent);
      }
    );
  });

  it('should contains all the required fields and all of them should be strings', function () {
    const requireFields = [
      {
        key: 'title',
        type: 'isString'
      },
      {
        key: 'category',
        type: 'isString'
      },
      {
        key: 'imageToUse',
        type: 'isString'
      },
      {
        key: 'isGood',
        type: 'isBoolean'
      }
    ];
    const otherTitles = JSON.parse(fileContent);
    otherTitles.forEach(function (otherTitle, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(otherTitle[field.key], 'The ' + field.key + ' field is not defined for otherTitle ' + index);
        assert[field.type](otherTitle[field.key], 'The ' + field + ' field is not ok for ' + field.type + ' for otherTitle ' + index);
      });
    });
  });
});

describe('titles.json file', function () {
  const fileContent = fs.readFileSync(TITLES_FILE_PATH);
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent);
      }
    );
  });

  it('should contains all the required fields and all of them should be strings', function () {
    const requireFields = [
      'title',
      'description',
      'imageToUse'
    ];
    const titles = JSON.parse(fileContent);
    titles.forEach(function (title, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(title[field], 'The ' + field + ' field is not defined for title ' + index);
        assert.isString(title[field], 'The ' + field + ' field is not a string for title ' + index);
      });
    });
  });
});
