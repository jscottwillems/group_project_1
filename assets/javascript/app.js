$(document).ready(function () {

    $('.loader').hide();

    $(document).ajaxStart(function () {

        $(".loader").fadeIn();

    });
    $(document).ajaxComplete(function () {

        $(".loader").fadeOut('slow');
        
    });

    // aleviates CORS issue
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    }); // closes ajaxPreFilter

    // reloads page when you click the logo
    $('#logo').on('click', function (event) {
        event.preventDefault();
        location.reload();
    });
    // resets search form
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

    // autocomplete through google maps
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

        // gets city name from search bar
        var place = $('#searchRes').val();
        console.log(place);

        // clears content from mainArea container
        $('#mainArea').empty();


        // sets up AJAX for weather API
        var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + place + "') and u='f'"

        $.ajax({
            url: "https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json",
            method: "GET"
        }).then(function (data) {
            // console.log(data);
            var temp = data.query.results.channel.item.condition.temp + "°F";
            console.log(temp)
            var weatherDescription = data.query.results.channel.item.condition.text;
            console.log(weatherDescription);
            var weather = $("<p>");
            $(weather).addClass("weather");
            $(weather).text("Current Weather in " + place + ": " + temp + " and " + weatherDescription);
            $('.weatherDiv').append(weather);

        }); // closes weather ajax call

        // sets up google maps API
        var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + place + "&inputtype=textquery&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"

        // gets place ID
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            // console.log(response);

            // holds all results on DOM
            var resultsDiv = $('<div>');
            resultsDiv.addClass('resultsDiv animated fadeIn');
            // creates back to search button
            var backToSearch = $('<button type="button">Back To Search</button>');
            $(backToSearch).addClass('backToSearch animated fadeIn');

            // prevents results from not displaying if invalid search item is entered
            if (response.candidates[0] != undefined) {

                var placeId = response.candidates[0].place_id
                console.log(placeId);

                var newURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo";


                // gets photo reference and city info using new URL with placeID
                $.ajax({
                    url: newURL,
                    method: "GET"
                }).then(function (response) {

                    for (i = 0; i < 1; i++) {

                        var photoRef = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.result.photos[i].photo_reference + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"

                        var cityName = response.result.name;

                        var cityNameDiv = $('<h1>' + cityName + '</h1>');
                        cityNameDiv.addClass('cityNameDiv animated fadeIn');

                        var imgDiv = $('<img src="' + photoRef + '">');
                        imgDiv.addClass('cityImg animated fadeIn');
                        
                        var weatherDiv = $('<div>');
                        $(weatherDiv).addClass('weatherDiv animated fadeIn');
                        
                        var eventsHeader = $('<p>Events</p>');
                        $(eventsHeader).addClass('eventsHeader animated fadeIn');

                        var eventsDiv = $('<div>');
                        $(eventsDiv).addClass('eventsDiv animated fadeIn');

                        var noEvents = $('<p>No events found.</p>');
                        $(noEvents).addClass('noEvents animated fadeIn');
                        $(eventsDiv).append(noEvents);
                        $(noEvents).hide();

                        $(resultsDiv).append(imgDiv);

                        $(resultsDiv).append(cityNameDiv);

                        $(resultsDiv).append(weatherDiv);

                        $(resultsDiv).append(eventsHeader)

                        $(resultsDiv).append(eventsDiv);

                        $(resultsDiv).append(backToSearch);

                        $('#mainArea').append(resultsDiv);

                    }

                }); // closes second google maps ajax call

            } else {

                var noResults = $('<p>No results found. Try another search.</p>');
                $(noResults).addClass('noResults animated fadeIn');
                $(resultsDiv).append(noResults);
                $(resultsDiv).append(backToSearch);
                $('#mainArea').append(resultsDiv);
            }

        }); // closes first google ajax call

        //eventful api call
        var eventfulURL = "https://api.eventful.com/json/events/search?&events?&keywords=popular&location=" + place + "&app_key=Q8T5BVGwG4DvC98F"

        //The application gets a request token.
        $.ajax({
            url: eventfulURL,
            method: "GET",
        }).then(function (response) {
            console.log(JSON.parse(response));
            //console.log(response)
            let responseP = JSON.parse(response);

            for (i = 0; i < 10; i++) {

                if (responseP.events != undefined) {

                    var eventItem = $('<div>');
                    $(eventItem).addClass('eventItem');
                    $('.eventsDiv').append(eventItem)

                    var eventName = responseP.events.event[i].title;
                    //console.log(eventName);
                    var eventItemName = $('<h2>' + eventName + '</h2>');
                    $(eventItemName).addClass('eventItemName');
                    $(eventItem).append(eventItemName);

                    // code for displaying event thumbnails should go inside following if else statement
                    if (responseP.events.event[i].image != null) {

                        // var eventImage = responseP.events.event[i].image.medium.url;
                        // console.log(eventImage);

                    } else {

                    };

                    var eventBio = responseP.events.event[i].description;
                    //console.log(eventBio);
                    var eventItemBio = $('<p>' + eventBio + '</p>');
                    $(eventItemBio).addClass('eventItemBio');
                    if (eventBio != null) {
                        $(eventItem).append(eventItemBio);
                    } else {
                        $(eventItem).append('<p class="eventItemBio">No discription available.</p>')
                    };

                    var eventURL = responseP.events.event[i].url;
                    //console.log(eventURL);
                    var eventItemUrl = $('<a href="' + eventURL + '" target="_blank">Click here for more info!</a>');
                    $(eventItemUrl).addClass('eventItemUrl');
                    $(eventItem).append(eventItemUrl);

                    var eventDate = responseP.events.event[i].start_time;
                    //console.log(eventDate);
                    var eventDateConverted = moment(eventDate).format('MMMM Do YYYY');
                    var eventItemDate = $('<p>' + eventDateConverted + '</p>');
                    $(eventItemDate).addClass('eventItemDate');
                    $(eventItem).append(eventItemDate);
                } else {

                    console.log('No events available');
                    $('.noEvents').show();

                }; // closes eventful if else statement to prevent results from not displaying if no events are found for city

            } // closes eventful for loop

        }); // closes eventful API ajax call

    }); // closes search button function

}); //closes document.ready