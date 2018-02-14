$(document).ready(function(){
  $('#submit-btn').on('click', handleButtonClick);
});

var handleButtonClick = function(e){
  e.preventDefault();
  let formData = $('#submitted-text').val();
  $.ajax({
    url: 'http://127.0.0.1:3000',
    method: 'POST',
    contentType: 'application/json',
    data: formData,
    success: function(result){
      renderTable(result);
    }
  });
};

var renderTable = (result) => {
  var $table = "<table id='results-table'></table>";
  $('#results').append($table);
  result = result.split('\n');
  result.forEach(function(row){
    var $tr = "<tr></tr>";
    $('#results-table').append($tr);
    row = row.split(',');
    row.forEach(function(col){
      var $td = "<td>" + col + "</td>";
      $('#results-table tr:last-of-type').append($td);
    })
  });
};
