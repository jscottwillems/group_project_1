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
  // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        //Create the search box and link it to the UI element.
        var input = document.getElementById('auto');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }


    
}}); // closes search button function


}); // closes document.ready