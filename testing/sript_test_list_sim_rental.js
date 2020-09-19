var postalCode = "11432";
var propertyId = "R9154733878";
//var lat = 41.549289;
//var lon = -72.711875;
//var city = "Bloomfield";
//var state = "CT";

// AJAX for gathering data by MLS listing.
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://realtor.p.rapidapi.com/properties/v2/list-similar-rental-homes?postal_code=11432&property_id=R9154733878",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "realtor.p.rapidapi.com",
		"x-rapidapi-key": "d265b5649amsh437c6a95e9ae058p18029ejsn1f0b36868dc9",
	}
};

$.ajax(settings).done(function (response) {
    console.log(response.properties[0]);
	console.log(response.properties[1]);
	console.log(response.properties[2]);
	console.log(response.properties[3]);
// Outside Variables needed from initial MLS listing AJAX call to support other AJAX calls.
var mlsId = 170330059;
var propertyId = 3404179173;
var lat = 41.549289;
var lon = -72.711875;
var city = "";
var state = "";

// AJAX for gathering data by MLS listing.
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://realtor.p.rapidapi.com/properties/v2/list-similar-rental-homes?postal_code=11432&property_id=R9154733878",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "realtor.p.rapidapi.com",
		"x-rapidapi-key": "d265b5649amsh437c6a95e9ae058p18029ejsn1f0b36868dc9",
	}
};

$.ajax(settings).done(function (response) {
//console.log(properties[1]);

//mlsId = response.properties[0].mls.id;
lat = response.properties[0].lat;
lon = response.properties[0].lon;
propertyId = response.properties[0].property_id;
city = response.properties[0].city;
state = response.properties[0].address.state_code;

var aptPhoto = response.properties[0].photo_url;
var address = response.properties[0].address;
var compAddress = response.properties[0].full_address_display;
var price = response.properties[0].price;
var Sqft = response.properties[0].sqft;
var propId = response.properties[0].property_id;
var baths = response.properties[0].baths;
// var fullBaths = response.properties[0].baths_full;
var beds = response.properties[0].beds;
// var saleStatus = response.properties[0].prop_status;
// var vTour = response.properties[0].virtual_tour.href;

var addPhoto = $("<img>").attr("src", "" + aptPhoto);
var addAddress = $("<p>").text("Address: " + address);
var addcompAddress = $("<p>").text("Address: " + compAddress);
var addPrice = $("<p>").text("Monthly Rent: " + price);
var addSqft = $("<p>").text("SqFt: " + Sqft);
var addpropId = $("<p>").text("Property ID: " + propId);
var addBaths = $("<p>").text("Number of Baths: " + baths);
// var addFullBaths = $("<p>").text("Number of Full Baths: " + fullBaths);
var addBeds = $("<p>").text("Number of Beds: " + beds);
// var addSaleStatus = $("<p>").text("Status: " + saleStatus);

$("body").append(addPhoto);
$("body").append(addAddress, addcompAddress, addPrice, addSqft, addBaths, addBeds, addpropId);

});


})



// function getLatLngByZipcode() 
// {
//     var geocoder = new google.maps.Geocoder();
//     var address = zipcode;
//     geocoder.geocode({ 'address': 'zipcode '+address }, function (results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             var latitude = results[0].geometry.location.lat();
//             var longitude = results[0].geometry.location.lng();
//             alert("Latitude: " + latitude + "\nLongitude: " + longitude);
//         } else {
//             alert("Request failed.")
//         }
//     });
//     return [latitude, longitude];

// }
// console.log(zipcode);