var fs = require('fs')
var chai = require('chai')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = chai.assert // Using Assert style

const AIMS_FILE_PATH = 'data/aims.json'
const CATEGORIES_FILE_PATH = 'data/categories.json'
const JUVE_PLAYERS_FILE_PATH = 'data/juvePlayers.json'
const OPPONENT_TEAMS_FILE_PATH = 'data/opponentTeams.json'
const OTHER_TITLES_FILE_PATH = 'data/otherTitles.json'
const TITLES_FILE_PATH = 'data/titles.json'

describe('aims.json file', function () {
  var fileContent = fs.readFileSync(AIMS_FILE_PATH)
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent)
      }
    )
  })

  it('should contains all the required fields and all of them should be strings', function () {
    const requireFields = [
      'name',
      'position',
      'team',
      'image'
    ]
    var aims = JSON.parse(fileContent)
    aims.forEach(function (aim, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(aim[field], 'The ' + field + ' field is not defined for aim ' + index)
        assert.isString(aim[field], 'The ' + field + ' field is not a string for aim ' + index)
      })
    })
  })
})

describe('categories.json file', function () {
  var fileContent = fs.readFileSync(CATEGORIES_FILE_PATH)
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent)
      }
    )
  })

  it('should contains all the required fields and all of them should be strings', function () {
    const requireFields = [
      'name',
      'color'
    ]
    var categories = JSON.parse(fileContent)
    categories.forEach(function (category, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(category[field], 'The ' + field + ' field is not defined for category ' + index)
        assert.isString(category[field], 'The ' + field + ' field is not a string for category ' + index)
      })
    })
  })
})

describe('juvePlayers.json file', function () {
  var fileContent = fs.readFileSync(JUVE_PLAYERS_FILE_PATH)
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent)
      }
    )
  })

  it('should contains all the required fields', function () {
    const requireFields = [
      'name',
      'position',
      'salable',
      'image'
    ]
    var juvePlayers = JSON.parse(fileContent)
    juvePlayers.forEach(function (juvePlayer, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(juvePlayer[field], 'The ' + field + ' field is not defined for juvePlayer ' + index)
      })
    })
  })
})

describe('opponentTeams.json file', function () {
  var fileContent = fs.readFileSync(OPPONENT_TEAMS_FILE_PATH)
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent)
      }
    )
  })

  it('should contains all the required fields', function () {
    const requireFields = [
      'name',
      'isItalian'
    ]
    var opponentTeams = JSON.parse(fileContent)
    opponentTeams.forEach(function (opponentTeam, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(opponentTeam[field], 'The ' + field + ' field is not defined for opponentTeam ' + index)
      })
    })
  })
})

describe('otherTitles.json file', function () {
  var fileContent = fs.readFileSync(OTHER_TITLES_FILE_PATH)
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent)
      }
    )
  })

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
    ]
    var otherTitles = JSON.parse(fileContent)
    otherTitles.forEach(function (otherTitle, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(otherTitle[field.key], 'The ' + field.key + ' field is not defined for otherTitle ' + index)
        assert[field.type](otherTitle[field.key], 'The ' + field + ' field is not ok for ' + field.type + ' for otherTitle ' + index)
      })
    })
  })
})

describe('titles.json file', function () {
  var fileContent = fs.readFileSync(TITLES_FILE_PATH)
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent)
      }
    )
  })

  it('should contains all the required fields and all of them should be strings', function () {
    const requireFields = [
      'title',
      'description',
      'imageToUse'
    ]
    var titles = JSON.parse(fileContent)
    titles.forEach(function (title, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(title[field], 'The ' + field + ' field is not defined for title ' + index)
        assert.isString(title[field], 'The ' + field + ' field is not a string for title ' + index)
      })
    })
  })
})
