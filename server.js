const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const Promise = require('bluebird');
const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist')));
app.use(bodyParser.json());

/// HANDLE POST ///////////////////////////

let rowId = -1;

app.post('/', (req, res) => {
  dataHandler(req.body)
    .then( () => {
      res.sendFile(path.join(__dirname + '/csv_report.csv'));
    }).catch( err => {
      console.log(err);
    });
});

var dataHandler = data => {
  return new Promise((resolve, reject) => {
    // Assumption: all fields are included at outset (diff ones won't be added later)
    var stringResult = createRows(data, rowId);
    fs.writeFile('csv_report.csv', stringResult, (err) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

var createRows = (data) => {
  let dataRow = "";
  dataRow += (rowId === -1) ? " ," : (rowId + ",");
  for(var key in data){
    if (key !== "children"){
      dataRow += (rowId === -1) ? key : data[key];
      dataRow += ',';
    }
  }
  dataRow = dataRow.substring(0, dataRow.length - 1); // Remove last comma
  dataRow += "\n"; // Add new line
  ++rowId;
  if (rowId === 0) {
    dataRow += createRows(data);
  } else if (data.children && data.children.length){
    for(var i = 0; i < data.children.length; i++){
      dataRow += createRows(data.children[i]);
    }
  } ;
  return dataRow;
};

app.listen(3000, '127.0.0.1', () => console.log('Listening at port 3000'));
