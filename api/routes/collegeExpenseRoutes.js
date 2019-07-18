'use strict';
module.exports = function(app) {
  var collegeExpense = require('../controllers/collegeExpenseController');

  // todoList Routes
  app.route('/colleges')
    .get(collegeExpense.readFile);
  app.route('/colleges/:college')
    .get(collegeExpense.readFile);
  app.route('/colleges/:college/:room')
    .get(collegeExpense.readFile);
};
