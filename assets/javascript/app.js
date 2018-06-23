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

    //eventful api call

    var eventfulKey = "Q8T5BVGwG4DvC98F"
    var eventfulURL = "https://api.eventful.com/json/performers/search?&events?&keywords=entertainment&location=" + place + "&app_key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"

    //The application gets a request token.
    $.ajax({
        url: eventfulURL,
        method: "GET",
        dataType: 'jsonp'
    }).then(function(response) {
        console.log(response);
        console.log(place)
        for(i = 0; i < 10; i++) {
            console.log(response.performers.performer[i].name);
            var eventName = response.performers.performer[i].name;

            console.log(response.performers.performer[i].image);
            var eventImage = response.performers.performer[i].image.medium;

            console.log(response.performers.performer[i].short_bio);
            var eventBio = response.performers.performer[i].short_bio;

            console.log(response.performers.performer[i].url);
            var eventURL = response.performers.performer[i].url;

            var eventDiv = $("<div>").append($('<img src="'+ eventImage +'">'))
            
            eventDiv.addClass('event')
            
            $("#mainArea").append($(eventBio))
            
        }

    });
    var service;
    var infowindow;
    
    function initMap() {
      var mapCenter = new google.maps.LatLng(-33.8617374,151.2021291);
    
      map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 15
      });
    
      var request = {
        query: 'Museum of Contemporary Art Australia',
        fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
    
    }

    service = new google.maps.places.PlacesService(map),
    service.findPlaceFromQuery(request, callback),
    
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
      }
    }
  


    
}}); // closes search button function


}); // closes document.ready