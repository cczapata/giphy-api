var music = ["frank ocean", "david bowie", "black sabbath" ];
var currentGif;
var pausedGif;
var animatedGif;
var stillGif;


function createButtons(){
	$('#musicButtons').empty();
	for(var i = 0; i < music.length; i++){
		var bandBtn = $('<button>').text(music[i]).addClass('bandBtn').attr({'data-name': music[i]});
		$('#musicButtons').append(bandBtn);
	}


	$('.bandBtn').on('click', function(){
		$('.display').empty();

		var thisBand = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisBand + "&limit=10&api_key=K161h2ecDScI47uy6JmYQspZ2CwK3TnS";
		$.ajax({
			url: giphyURL,
			method: 'GET'
			})
		.done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}


$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });


$('#addMusic').on('click', function(){
	var newMusic = $('#newMusicInput').val().trim();
	music.push(newMusic);
	createButtons();
	return false;
});

createButtons();
