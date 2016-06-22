var Calc = require('./calc'),
  should = require('should'),
  calc;

describe('Utilities Calculator', function () {

  describe('validateRoommates', function () {
    before(function () {
      calc = new Calc(3);
    });

    var valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      invalid = [-5, -2.25, -0.1, 0, 0.1, 1.25];

    valid.forEach(function (item) {
      it(`${item} should be valid`, function () {
        calc.validateRoommates(item).should.equal(item);
      });
    });

    invalid.forEach(function (item) {
      it(`${item} should be invalid`, function () {
        calc.validateRoommates(item).should.equal(false);
      });
    });
  });

  describe('constructor', function () {
    it('should accept a number of valid roommates', function () {
      calc = new Calc(3);
      calc.roommates.should.equal(3);
    });

    it('should throw an error on an invalid number of roommates', function () {
      should(() => {
        new Calc(2.5);
      }).throw('Invalid number of roommates passed in');
    });
  });

});
