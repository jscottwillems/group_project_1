$(document).ready(function () {

    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    // reloads page when you click the logo
    $('#logo').on('click', function (event) {
        event.preventDefault();
        location.reload();
    });

    $(document).on('click', '.backToSearch', function () {
        event.preventDefault();
        location.reload();
    });

    // allows user to submit when enter is pressed
    $("#searchBar").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#searchBtn").click();
        }
    });

    // autocomplete
    var input = document.getElementById('searchRes');
    var autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)']
    });
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
    })


    // function for search
    $('#searchBtn').on('click', function (event) {
        event.preventDefault();

        var place = $('#searchRes').val();
        console.log(place);

        // clears content from mainArea container
        $('#mainArea').empty();


        var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + place + "&inputtype=textquery&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"

        // gets place ID
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);

            var placeId = response.candidates[0].place_id
            console.log(placeId);
           
            var newURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo";

            // gets photo reference and city info using new URL with placeID
            $.ajax({
                url: newURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);

                for (i = 0; i < 1; i++) {

                    var photoRef = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.result.photos[i].photo_reference + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"
                    console.log(photoRef)

                    var cityName = response.result.name;

                    var infoHolder = $('<h2>' + cityName + '</h2>');
                    infoHolder.addClass('cityInfo');

                    var imgDiv = $('<img src="' + photoRef + '">');
                    imgDiv.addClass('cityImg')
                    $()

                    var resultsDiv = $('<div>');
                    resultsDiv.addClass('resultsDiv');

                    var eventsDiv = $('<div>');
                    $(eventsDiv).addClass('eventsDiv');

                    var backToSearch = $('<button type="button">Back To Search</button>');
                    $(backToSearch).addClass('backToSearch');

                    $(resultsDiv).append(imgDiv);

                    $(resultsDiv).append(infoHolder);

                    $(resultsDiv).append(eventsDiv);

                    $(resultsDiv).append(backToSearch);

                    $('#mainArea').append(resultsDiv);

                }



            }); // closes second ajax call


        }); // closes first ajax call

        //eventful api call
        var eventfulURL = "https://api.eventful.com/json/events/search?&events?&keywords=popular&location=" + place + "&app_key=Q8T5BVGwG4DvC98F"

        //The application gets a request token.
        $.ajax({
            url: eventfulURL,
            method: "GET",
        }).then(function (response) {
            console.log(JSON.parse(response));
            console.log(place)
            let responseP = JSON.parse(response);

            for (i = 0; i < 10; i++) {

                var eventItem = $('<div>');
                $(eventItem).addClass('eventItem');
                $('.eventsDiv').append(eventItem)

                var eventName = responseP.events.event[i].title;
                //console.log(eventName);
                var eventItemName = $('<h2>' + eventName + '</h2>');
                $(eventItemName).addClass('eventItemName');
                $(eventItem).append(eventItemName);

                var eventImage = responseP.events.event[i].image;
                //console.log(eventImage);
                var eventItemImage = $('<img src="' + eventImage + '></img>');
                $(eventItemImage).addClass('eventItemImage');
                $(eventItem).append(eventItemImage);

                var eventBio = responseP.events.event[i].description;
                console.log(eventBio);
                var eventItemBio = $('<p>'+ eventBio +'</p>');
                $(eventItemBio).addClass('eventItemBio');
                if (eventBio != 'null') {
                $(eventItem).append(eventItemBio);
                } else {
                $(eventItem).append('<p class="eventItemBio">No discription available.</p>')
                };

                var eventURL = responseP.events.event[i].url;
                // console.log(eventURL);


            }

        });
        var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + place + "') and u='f'"
        //change city variable dynamically as required
        $.ajax({
          url: "https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json",
          method: "GET"
          }).then(function(data){
         console.log(data);
         var date = data.query.results.channel.item.condition.date;
         console.log(date);
;
         var temp = data.query.results.channel.item.condition.temp + "°F";
         console.log(temp)

         var weatherDescription = data.query.results.channel.item.condition.text;
         console.log(weatherDescription);

         var weather = $("<p>");
         $(weather).addClass("weather");
         var description = $(weather).text(date + " " + "It is currently " + temp + " and " + weatherDescription);
         $(".cityInfo").append(description);



        });




    }); // closes search button function


}); // closes document.ready