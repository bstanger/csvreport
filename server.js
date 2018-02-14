const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs');


app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist')));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   console.log('get');
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.post('/', (req, res) => {
  //console.log(req.body);
  dataHandler(req.body);
  res.send(req.body);
});

var dataHandler = data => {
  // Assumption: all fields are included at outset (diff ones won't be added later)
  createColHeaders(data);
  createRows(data);
};

var createRows = data => {
  console.log('///////////////////////////////');
  let dataRow = "";
  for(var key in data){
    if (key !== "children"){
      dataRow += data[key];
      dataRow += ',';
    }
  }
  dataRow = dataRow.substring(0, dataRow.length - 1); // Remove last comma
  dataRow += "\n";
  fs.appendFile('csv_report.csv', dataRow, (err) => {
    if(err) {
      console.log(err);
    }
  });
  console.log(data.children);
  if(data.children && data.children.length){
    for(var i = 0; i < data.children.length; i++){
      console.log(data.children[i]);
      createRows(data.children[i]);
    }
  }
};


var createColHeaders = data => {
  let colHeaders = ""
  for(var key in data){
    if (key !== "children"){
      colHeaders += key;
      colHeaders += ',';
    }
  }
  colHeaders = colHeaders.substring(0, colHeaders.length - 1); // Remove last comma
  colHeaders += "\n";
  fs.writeFile('csv_report.csv', colHeaders, (err) => {
    if(err) {
      console.log(err);
    }
  });
};

app.listen(3000, '127.0.0.1', () => console.log('Listening at port 3000'));
