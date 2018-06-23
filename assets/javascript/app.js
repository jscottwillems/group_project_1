$(document).ready(function() {

// reloads page when you click the logo
$('#logo').on('click', function(event) {
    event.preventDefault();
    location.reload();
});

$(document).on('click', '.backToSearch', function() {
    event.preventDefault();
    location.reload();
});

// allows user to submit when enter is pressed
$("#searchBar").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchBtn").click();
    }
});

// autocomplete
var input = document.getElementById('searchRes');
var autocomplete = new google.maps.places.Autocomplete(input,{types: ['(cities)']});
google.maps.event.addListener(autocomplete, 'place_changed', function() {
   var place = autocomplete.getPlace();
})


// function for search
$('#searchBtn').on('click' ,function(event) {
    event.preventDefault();

    var place = $('#searchRes').val();
    console.log(place);

    // clears content from mainArea container
    $('#mainArea').empty();

    
    var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + place + "&inputtype=textquery&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"
    
    // gets place ID
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        var placeId = response.candidates[0].place_id
        console.log(placeId);
        
        var newURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo";
        
        // gets photo reference and city info using new URL with placeID
        $.ajax({
            url: newURL,
            method: "GET"
        }).then(function(response) {
            
            console.log(response);
            
            for(i = 0; i < 1; i++) {
                
                var photoRef =    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.result.photos[i].photo_reference + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"
                console.log(photoRef)
                
                var cityName =  response.result.name;
                
                var infoHolder = $('<h2>'+ cityName +'</h2>');
                infoHolder.addClass('cityInfo');
                
                var imgDiv = $('<img src="'+ photoRef +'">');
                imgDiv.addClass('cityImg')
                $()
                
                var resultsDiv = $('<div>');
                resultsDiv.addClass('resultsDiv');
                
                var backToSearch = $('<button type="button">Back To Search</button>');
                $(backToSearch).addClass('backToSearch');
                
                $(resultsDiv).append(imgDiv);
                
                $(resultsDiv).append(infoHolder);
                
                $(resultsDiv).append(backToSearch);

                $('#mainArea').append(resultsDiv);
                
            }
            
            
            
        }); // closes second ajax call


    }); // closes first ajax call



}); // closes search button function


}); // closes document.ready