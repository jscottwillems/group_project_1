//google places API
var key = "AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"
var place;
var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + place + "&inputtype=textquery&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"

//place search and capture the place_id
console.log("linked")



//place details request using the place_id
//place details url is of the following form:
var newURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place_id + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"



//place photos request
var photoReference; //returned from either a place search or a place details request
var maxHeight;
var maxWidth;
//place photos url is of the following form:
var photosURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoReference + "&key=AIzaSyCVlepkh__TW03V4Vx1kOnXrdgQ61CIwZo"

var cityName = response.result.address_components[0].long_name