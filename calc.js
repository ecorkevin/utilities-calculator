'use strict';
const inquirer = require('inquirer'),
  ncp = require('copy-paste');

module.exports = class UtilityCalculator {
  constructor(roommates) {
    this.roommates = this.validateRoommates(roommates);
    if (!this.roommates) {
      throw new Error('Invalid number of roommates passed in');
    }
    this.bills = {};
    this.total = 0;
    this.questions = [
      {
        type: 'list',
        name: 'type',
        message: 'What type of bill is this?',
        choices: [
          'Electric',
          'Gas     ',
          'Water   ',
          'Internet',
          'Garbage ',
          'Cable   '
        ]
      },
      {
        type: 'input',
        name: 'amount',
        message: 'Amount?',
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        }
      },
      {
        type: 'confirm',
        name: 'askAgain',
        message: 'Add another bill?',
        default: true
      }
    ];
  }

  addBill() {
    return inquirer.prompt(this.questions)
      .then(answers => {
        const amount = parseFloat(answers.amount);
        this.bills[answers.type] = amount;
        answers.askAgain ? this.addBill() : this.logAndCopyResults();
      });
  }

  logAndCopyResults() {
    let msg = '_________\nUtilities\n_________\n';
    Object.keys(this.bills).forEach(key => {
      this.total += this.bills[key];
      msg += `${key}: $${this.bills[key]} \n`;
    });
    msg += `_________________
            $${this.total.toFixed(2)} / ${this.roommates}
            $${(this.total / this.roommates).toFixed(2)} each

    `;
    console.log(msg); // eslint-disable-line no-console
    ncp.copy(msg, () => {
      console.log('The above text has been copied to the clipboard'); // eslint-disable-line no-console
    });
  }

  validateRoommates(roommates) {
    roommates = parseFloat(roommates);
    if (!roommates || !roommates.toString().match(/^[0-9]*$/)) {
      return false;
    }
    return roommates;
  }
}
