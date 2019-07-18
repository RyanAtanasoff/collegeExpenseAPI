'use strict';
const csv = require('csv-parser');
const fs = require('fs');

exports.readFile = function(req, res, next) {
  if (Object.keys(req.params).length === 0 && req.params.constructor === Object) {
      next('Error: College name is required');
  } else {
    let readStream = fs.createReadStream('data.csv'),
        roomAndBoardFlag = req.params.room === 'false' ? false : true,
        collegeFound = false,
        cost = 0;

    readStream
      .pipe(csv())
      .on('data', (row) => {
        if (row.College === req.params.college) {
          if (!collegeFound) {
            collegeFound = true;
          }
          if (row['Tuition (in-state)'] === '') {
            next('Error: No tuition information found for ' + row.College);
            readStream.destroy();
          }
          cost += (roomAndBoardFlag ? (+row['Tuition (in-state)'] + +row['Room & Board']) : +row['Tuition (in-state)']);
        }
      })
      .on('end', () => {
        if (collegeFound) {
          res.json({'cost': '$' + cost.toFixed(2)});
        } else {
          next('Error: College not found');
        }
      });
  }
};
