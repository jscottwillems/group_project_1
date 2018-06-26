$(document).ready(function () {
    

    jQuery.ajaxPrefilter(function (options) {
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

        var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + place + "') and u='f'"
        //change city variable dynamically as required
        $.ajax({
            url: "https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json",
            method: "GET"
        }).then(function (data) { 
           // console.log(data);
    
            var temp = data.query.results.channel.item.condition.temp + "°F";
           // console.log(temp)
            var weatherDescription = data.query.results.channel.item.condition.text;
           // console.log(weatherDescription);
            var weather = $("<p>");
            $(weather).addClass("weather");
            $(weather).text("Current Weather in "+ place +": " + temp + " and " + weatherDescription);
            $('.weatherDiv').append(weather);
            
        }); // closes weather ajax call

        var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + place + "&inputtype=textquery&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"

        // gets place ID
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
<<<<<<< HEAD
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
                var photos = [];
                for (i = 0; i < 4; i++) {

                    var photoRef = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.result.photos[i].photo_reference + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"
                    //console.log(photoRef)
                    photos.push(photoRef);
                
                    console.log(photos);
                    var cityName = response.result.name;

                    var cityNameDiv = $('<h1>' + cityName + '</h1>');
                    cityNameDiv.addClass('cityNameDiv');

                    var imgDiv = $("#orbit");
                    imgDiv.addClass('cityImg');
                    $("#image-" + i).attr("src", photos[i]);
                }
                    var resultsDiv = $('<div>');
                    resultsDiv.addClass('resultsDiv');

                    var eventsDiv = $('<div>');
                    $(eventsDiv).addClass('eventsDiv');

                    var backToSearch = $('<button type="button">Back To Search</button>');
                    $(backToSearch).addClass('backToSearch');

                    $(resultsDiv).append(imgDiv);

                    $(resultsDiv).append(cityNameDiv);

                    $(resultsDiv).append(eventsDiv);

                    $(resultsDiv).append(backToSearch);

                    $('#mainArea').append(resultsDiv);

                



            }); // closes second ajax call


=======
            // console.log(response);
            
            var resultsDiv = $('<div>');
            resultsDiv.addClass('resultsDiv');

            var backToSearch = $('<button type="button">Back To Search</button>');
            $(backToSearch).addClass('backToSearch');
            
            if (response.candidates[0] != undefined) {
                var placeId = response.candidates[0].place_id
                console.log(placeId);

                var newURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo";

                // gets photo reference and city info using new URL with placeID
                $.ajax({
                    url: newURL,
                    method: "GET"
                }).then(function (response) {

                    //console.log(response);

                    for (i = 0; i < 1; i++) {

                        var photoRef = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + response.result.photos[i].photo_reference + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"
                        //console.log(photoRef)

                        var cityName = response.result.name;

                        var cityNameDiv = $('<h1>' + cityName + '</h1>');
                        cityNameDiv.addClass('cityNameDiv');

                        var imgDiv = $('<img src="' + photoRef + '">');
                        imgDiv.addClass('cityImg');

                        
                        
                        
                        var eventsDiv = $('<div>');
                        $(eventsDiv).addClass('eventsDiv');
                        
                        var noEvents = $('<p>No events found.</p>');
                        $(noEvents).addClass('noEvents');
                        $(eventsDiv).append(noEvents);
                        $(noEvents).hide();
                        
                        

                        var weatherDiv = $('<div>');
                        $(weatherDiv).addClass('weatherDiv');
                        
                        $(resultsDiv).append(imgDiv);

                        $(resultsDiv).append(cityNameDiv);

                        $(resultsDiv).append(weatherDiv);

                        $(resultsDiv).append(eventsDiv);

                        
                        $(resultsDiv).append(backToSearch);
                        
                        $('#mainArea').append(resultsDiv);
                        
                    }
                }); // closes second ajax call
            } else {
                var noResults = $('<p>No results found. Try another search.</p>');
                $(noResults).addClass('noResults');
                $(resultsDiv).append(noResults);
                $(resultsDiv).append(backToSearch);
                $('#mainArea').append(resultsDiv);
            }
            
>>>>>>> dca4ed231b3d5415711212f9a503520016a59de3
        }); // closes first ajax call
        
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
                    
                    
                    
                    if (responseP.events.event[i].image != null) {   
                        
                        var eventImage = responseP.events.event[i].image.medium.url;
                         console.log(eventImage);

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

        }
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
         $(".citynamediv").append(description);
            } // closes eventful for loop

        ); // closes eventful API ajax call

<<<<<<< HEAD


        });



    },)
    }); // closes search button function
=======
    }); // closes search button function

}); //closes document.ready
>>>>>>> dca4ed231b3d5415711212f9a503520016a59de3
