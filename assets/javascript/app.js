$(document).ready(function() {


$('#searchBtn').on('click', function(event) {
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

        // gets photo reference
        $.ajax({
            url: newURL,
            method: "GET"
        }).then(function(response) {

            console.log(response);

            for(i = 0; i < 1; i++) {

            var photoRef =    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.result.photos[i].photo_reference + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"
            console.log(photoRef)

            var imgDiv = $('<img src="'+ photoRef +'">');
            imgDiv.addClass('cityImg')
            $()

            $('#mainArea').append(imgDiv);
            


            }

        

        }); // closes second ajax call


    }); // closes first ajax call



}); // closes search button function


}); // closes document.ready