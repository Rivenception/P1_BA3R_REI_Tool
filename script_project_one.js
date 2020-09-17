
// Outside Variables needed from initial MLS listing AJAX call to support other AJAX calls.
var mlsId = 170330059;
var propertyId = 3404179173;
var lat = 41.549289;
var lon = -72.711875;
var city = "";
var state = "";
var chips = `<div class='mdc-chip' role='row'><div class='mdc-chip__ripple'>
                </div>
                <span role='gridcell'><span role='button' tabindex='0' class='mdc-chip__primary-action'>
                <span class='mdc-chip__text' id='chip'>test</span>
                </span>
                </span>
                </div>`

$("#confirmMls").click(function () {
// AJAX for gathering data by MLS listing.
var input = $("#mls").val();
console.log(input);

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://realtor.p.rapidapi.com/properties/list-by-mls?mls_id=" + input + "&offset=0&limit=10",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "realtor.p.rapidapi.com",
		"x-rapidapi-key": "d265b5649amsh437c6a95e9ae058p18029ejsn1f0b36868dc9",
	}
};

$.ajax(settings).done(function (response) {
    // console.log(response);
    mlsId = response.listings[0].mls.id;
    lat = response.listings[0].lat;
    lon = response.listings[0].lon;
    propertyId = response.listings[0].property_id;
    city = response.listings[0].address_new.city;
    state = response.listings[0].address.state_code;

    var mlsPhoto = response.listings[0].photo;
    var mlsAddress = response.listings[0].address;
    var mlsPrice = response.listings[0].price;
    var mlsSqft = response.listings[0].sqft;
    var propType = response.listings[0].prop_type;
    var baths = response.listings[0].baths;
    var fullBaths = response.listings[0].baths_full;
    var beds = response.listings[0].beds;
    var saleStatus = response.listings[0].prop_status;
    // var vTour = response.listings[0].virtual_tour.href;

    var addPhoto = $("<img>").attr("src", "" + mlsPhoto).attr("class", "center");
    var addAddress = $("<p>").text("Address: " + mlsAddress);
    var addPrice = $("<p>").text("Asking Price: " + mlsPrice);
    var addSqft = $("<p>").text("SqFt: " + mlsSqft);
    var addPropType = $("<p>").text("Property Type: " + propType);
    var addBaths = $("<p>").text("Number of Baths: " + baths);
    var addFullBaths = $("<p>").text("Number of Full Baths: " + fullBaths);
    var addBeds = $("<p>").text("Number of Beds: " + beds);
    var addSaleStatus = $("<p>").text("Status: " + saleStatus);
    // var chipParent = $("<div>").attr("class", "mdc-chip-set").attr("role", "grid").attr("class", "center").html(`<div>${chips}</div>`);

    $("#myHome").append(addPhoto);
    $("#myHome").append(addAddress, addPrice, addSqft, addPropType, addBaths, addFullBaths, addBeds, addSaleStatus);
    // $("#myHome").append(chipParent);
    // $("#chip").text("Address: " + mlsAddress);

    });
});


$("#similarTo").click(function () {
// AJAX for list of similar homes using property ID from MLS listing response.
    console.log("responding");
    var similarHomes = {
        "async": true,
        "crossDomain": true,
        "url": "https://realtor.p.rapidapi.com/properties/v2/list-similar-homes?property_id=" + propertyId,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "d265b5649amsh437c6a95e9ae058p18029ejsn1f0b36868dc9",
        }
    };

    $.ajax(similarHomes).done(function (response) {
        var homesResults = response.data.home.related_homes.results
        // console.log(response.data.home.related_homes.results);
        for (var x = 0; x < homesResults.length; x++) {

            var simPhoto = response.data.home.related_homes.results[x].primary_photo.href;
            var simAddress = response.data.home.related_homes.results[x].location.address.line;
            var simCity = response.data.home.related_homes.results[x].location.address.city;
            var simLink = response.data.home.related_homes.results[x].href;
            var simPrice = response.data.home.related_homes.results[x].list_price;
            var simSqft = response.data.home.related_homes.results[x].description.sqft;
            var simBaths = response.data.home.related_homes.results[x].description.baths;
            var simBeds = response.data.home.related_homes.results[x].description.beds;

            var addPhoto = $("<img>").attr("src", "" + simPhoto);
            var addAddress = $("<p>").text("Address: " + simAddress);
            var addCity = $("<p>").text("City: " + simCity);
            var addLink = $("<p>").text("Realtor Link: " + simLink);
            var addPrice = $("<p>").text("Asking Price: " + simPrice);
            var addSqft = $("<p>").text("SqFt: " + simSqft);
            var addBaths = $("<p>").text("Number of Baths: " + simBaths);
            var addBeds = $("<p>").text("Number of Beds: " + simBeds);

            $("<div>").attr("class", "mdc-card").attr("tabindex", "0");

            $("#loadedContent").append(addPhoto);
            $("#loadedContent").append(addAddress, addCity, addPrice, addSqft, addBaths, addBeds, addLink);

        };
    });
});

// AJAX for gathering data for school systems
var schoolData = {
	"async": true,
	"crossDomain": true,
	"url": "https://realtor.p.rapidapi.com/schools/list-nearby?lon=" + lon + "&lat=" + lat,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "realtor.p.rapidapi.com",
		"x-rapidapi-key": "d265b5649amsh437c6a95e9ae058p18029ejsn1f0b36868dc9"
	}
};

$("#schools").click(function () {
    console.log("working");
    $.ajax(schoolData).done(function (response) {
        var schoolRatings = response.schools
        // console.log(response);
        for (var x = 0; x < schoolRatings.length; x++) {
            var name = response.schools[x].name;
            var type = response.schools[x].funding_type;
            var education = response.schools[x].education_levels[0];
            var publicRating = response.schools[x].ratings.great_schools_rating;
            var parentRating = response.schools[x].ratings.parent_rating;
            var studentCount = response.schools[x].student_count;
            var teacherRatio = response.schools[x].student_teacher_ratio;
            var distance = response.schools[x].distance_in_miles;

            var addName = $("<p>").text("Name: " + name);
            var addType = $("<p>").text("Education Type: " + type);
            var addLevel = $("<p>").text("Grade Level: " + education);
            var addRating = $("<p>").text("Great Schools Rating: " + publicRating);
            var addParentRating = $("<p>").text("Parent Rating: " + parentRating);
            var addStudents = $("<p>").text("Student Body: " + studentCount);
            var addTeachers = $("<p>").text("Student/Teacher Ratio: " + teacherRatio);
            var addDistance = $("<p>").text("Distance from Home: " + distance + " m");

            $("#loadedContent").append(addName, addType, addLevel, addRating, addParentRating, addStudents, addTeachers, addDistance);
        };
    });
});