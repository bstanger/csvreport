$(document).ready(function(){
  $('#submit-btn').on('click', function(e){
    e.preventDefault();
    let formData = $('#submitted-text').val();
    $.ajax({
      url: 'http://127.0.0.1:3000',
      method: 'POST',
      contentType: 'application/json',
      data: formData
    });
  });
});
