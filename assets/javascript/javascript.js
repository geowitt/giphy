 
$(document).ready(function(){

	// beginning set of buttons array
	var buttons = ['Xbox ONE', 'Xbox 360', 'Xbox', 'Wii U', 'Wii', 'Gamecube', 'Nintendo 64', 'Super Nintendo', 'Nintendo 8-bit', 'Playstation 4', 'Playstation 3', 'Playstation 2', 'Playstation', 'Sega Dreamcast', 'Sega Genesis', 'PC Master Race']
	// passes button array into html
	createButtonSet();
	// create button
	function createButtonSet() {
		// empties current button set
		$('#buttons').empty();
		// loops through buttons array to create buttons
		for (var i=0; i<buttons.length; i++) {
			// sets up button function
			var newButton = $('<button>');
			newButton.addClass('button');
			newButton.attr('data-name', buttons[i]);
			newButton.text(buttons[i]);
			$('#buttons').append(newButton);
		}
	}
	    // function to add new button to array
	    $('#addButton').on('click', function() {
		// variable to add new button info
		var button = $('#button-input').val().trim();
		// add new value to array
		buttons.push(button);
		// adds new button to current button
		createButtonSet();
		return false;
	})
	    // call to pull 15 gifs based on selected category
	    function getImages() {
		// empties display for new gifs
		$('#display').empty();
		// gets name to query with API call
		var gifImage = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifImage + "&api_key=dc6zaTOxFJmzC&limit=15";

		$.ajax({
			url: queryURL,
			method: 'GET'
		})
			.done(function(response){

                console.log(response);

				// array built by response
				var results = response.data;

				for (var i=0; i<results.length; i++) {

					// image data source to build gif
					var imageDiv = $('<div>');
					var p = $("<p>").text("Rating: "+results[i].rating);
					var image = $("<img>");
				    image.attr("src", results[i].images.fixed_width_still.url);
				    image.attr("data-still", results[i].images.fixed_width_still.url);
				    image.attr("data-animate", results[i].images.fixed_width.url);
				    image.attr("data-state", "still");
				    image.addClass("image");
				    imageDiv.addClass("image-holder");
				    imageDiv.append(p);
				    imageDiv.append(image);
					$('#display').append(imageDiv);
				}
			})
	}
	    // animation toggle
	    function animate() {
		// pause gif
		var state = $(this).attr("data-state");

		if (state == 'still') {
	        $(this).attr("src", $(this).data('animate'));
	        $(this).attr('data-state', 'animate');
	    }
	    if (state == 'animate') {
	        $(this).attr("src", $(this).data('still'));
	        $(this).attr('data-state', 'still');
	    }
	}
	    // on-click functions
	    $('#display').on('click','.image', animate);
	    $(document).on('click','.button', getImages);
	    $(document).on('click','#button-imput', addButton);
	
})
