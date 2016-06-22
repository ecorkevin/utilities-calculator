'use strict';
const inquirer = require('inquirer'),
  UtilityCalculator = require('./calc');

inquirer.prompt({
    type: 'input',
    name: 'roommates',
    message: 'Number of roommates?',
    default: 3
  })
  .then(answers => {
    const calc = new UtilityCalculator(answers.roommates);
    calc.addBill();
  })
  .catch(err => {
    console.log(err.message); // eslint-disable-line no-console
    process.exit(1);
  });
