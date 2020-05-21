var fs = require('fs')
var chai = require('chai')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = chai.assert // Using Assert style

const AIMS_FILE_PATH = 'data/aims.json'

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
