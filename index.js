$(document).ready(function() {
  
  $("#submit").click(function(e) {
  	const userName = $('#username').val();
  	e.preventDefault();
  	console.log(userName);
  	$('#username').val('')

    $.ajax({
      url: `https://api.github.com/users/${userName}`,
      beforeSend: function() {
      	$('.lds-ring').show();
      },
      success: function(result) {
      	
      	// empty the error fields if there were previously showing
  			$('#error').text('')
				
        console.log(result);

        //fill the avatar and name if successfull
        $('#result').text(result.name);
        $('#avatar').attr('src', result.avatar_url);
        $('#error').hide();
        
      },
      error: function(xhr) {
        console.log(`${xhr.status} (${xhr.statusText})`);

        // get ride of the previous result if there was one previously
        $('#result').text('');
        $('#avatar').attr('src', '');

        // show error message 
        $('#error').text(`Error: ${xhr.status} ${xhr.statusText} Cannot Find This Github User`).show();
      },
      complete: function() {
      	$('.lds-ring').hide();
      } 
    });
 
  });


});