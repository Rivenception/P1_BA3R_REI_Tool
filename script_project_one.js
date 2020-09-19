
// Outside Variables needed from initial MLS listing AJAX call to support other AJAX calls.
var mlsId = 170330059;
var propertyId = 3404179173;
var lat = 41.549289;
var lon = -72.711875;
var city = "";
var state = "";

var chips = `<div class='mdc-chip' role='row'>
                <div class='mdc-chip__ripple'>
                </div>
                <span role='gridcell'><span role='button' tabindex='0' class='mdc-chip__primary-action'>
                    <span class='mdc-chip__text' id='chip'></span>
                    </span>
                </span>
            </div>`;

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

    var addPhoto = $("<img>").attr("src", "" + mlsPhoto).attr("class", "responsive center");
    var addAddress = $("<p>").text(mlsAddress).attr("style", "font-weight:bolder; font-size:15pt;");
    var addPrice = $("<p>").text("Asking Price: " + mlsPrice);
    var addSqft = $("<p>").text("SqFt: " + mlsSqft);
    var addPropType = $("<p>").text("Property Type: " + propType);
    var addBaths = $("<p>").text("Number of Baths: " + baths);
    var addFullBaths = $("<p>").text("Number of Full Baths: " + fullBaths);
    var addBeds = $("<p>").text("Number of Beds: " + beds);
    var addSaleStatus = $("<p>").text("Status: " + saleStatus);
    // var chipParent = $("<div>").attr("class", "mdc-chip-set").attr("role", "grid");
    // var chipChild = $("#mdc-chip-set").html(`${chips}`);

    var chipArray = ["Address", "Asking", "Sqft", "Type", "Baths", "Full Baths", "Beds", "Status"];
    var responseArray = [mlsAddress, mlsPrice, mlsSqft, propType, baths, fullBaths, beds, saleStatus];

    $("#myHome").append(addPhoto);
    $("#myHome").append(addAddress, addPrice, addSqft, addPropType, addBaths, addFullBaths, addBeds, addSaleStatus);

    for (x = 0; x < chipArray.length; x++) {
        // console.log(chipArray[x]);
        // console.log(x);

        $("#myHome").append($("<div>").attr("class", "mdc-chip-set").attr("role", "grid"));
        $(".mdc-chip-set").html(`${chips}`);
        $("#chip").attr("id", chipArray[x]);

        // $("#myHome").append($("<div>").attr("class", "mdc-chip-set").attr("role", "grid").html(`${chips}`));

        // $("#myHome").append(chipParent);
        $("#" + chipArray[x]).text(chipArray[x] + ": " + responseArray[x]);

    };

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
            var addAddress = $("<p>").text(simAddress).attr("style", "font-weight:bolder; font-size:15pt;");
            var addCity = $("<p>").text(simCity).attr("style", "font-weight:bolder; font-size:12pt;");
            var addLink = $("<a>").attr("href", "" + simLink).attr("target", "_blank").text("More Details on Realtor.com");
            var addPrice = $("<p>").text("Asking Price: $" + simPrice);
            var addSqft = $("<p>").text("SqFt: " + simSqft);
            var addBaths = $("<p>").text("Number of Baths: " + simBaths);
            var addBeds = $("<p>").text("Number of Beds: " + simBeds);

            var section = $("<section>").attr("style", "padding:10px;");

            section = section.append(addPhoto).append(addAddress, addCity, addPrice, addSqft, addBaths, addBeds, addLink);

            $("#loadedContent").append(section);

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

    var tableTitle = $("<h1>").text("Nearby School Statistics");

    var tableName = $("<th>").text("Name");
    var tableType = $("<th>").text("Type");
    var tableGrade = $("<th>").text("Grade Level");
    var tableRating = $("<th>").text("Good Grade Rating");
    var tablePRating = $("<th>").text("Parent Rating");
    var tableRatio = $("<th>").text("Student/Teacher Ratio");
    var tableSize = $("<th>").text("Student Body Size");
    var tableDistance = $("<th>").text("Distance From Home");
    var tableHeaders = $("<tr>").append(tableName, tableType, tableGrade, tableRating, tablePRating, tableRatio, tableSize, tableDistance);

    $("#demo").prepend(tableTitle);

    $("thead").append(tableHeaders);

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

            var addName = $("<p>").text("" + name).attr("style", "font-weight:bolder;");
            var addType = $("<p>").text("Education Type: " + type);
            var addLevel = $("<p>").text("Grade Level: " + education);
            var addRating = $("<p>").text("Great Schools Rating: " + publicRating);
            var addParentRating = $("<p>").text("Parent Rating: " + parentRating);
            var addStudents = $("<p>").text("Student Body: " + studentCount);
            var addTeachers = $("<p>").text("Student/Teacher Ratio: " + teacherRatio);
            var addDistance = $("<p>").text("Distance from Home: " + distance + " mi");

            var addNameT = $("<td>").text(name).attr("style", "font-weight:bolder;").attr("data-title", "Name");
            var addTypeT = $("<td>").text(type).attr("data-title", "Type");
            var addLevelT = $("<td>").text(education).attr("data-title", "Grade level");
            var addRatingT = $("<td>").text(publicRating).attr("data-title", "Good Grades Rating");
            var addParentRatingT = $("<td>").text(parentRating).attr("data-title", "Parent Rating");
            var addStudentsT = $("<td>").text(studentCount).attr("data-title", "Student/Teacher Ratio");
            var addTeachersT = $("<td>").text(teacherRatio).attr("data-title", "Student Body Size");
            var addDistanceT = $("<td>").text(distance + " mi").attr("data-title", "Distance From Home");

            var tabledata = $("<tr>").append(addNameT, addTypeT, addLevelT, addRatingT, addParentRatingT, addStudentsT, addTeachersT, addDistanceT);

            $("tbody").append(tabledata);

            // $("#loadedContent").append(addName, addType, addLevel, addRating, addParentRating, addStudents, addTeachers, addDistance);
        };
    });

});

$("#clearBtn").click(function () {
    location.reload();
});

/**
 * Created by Kupletsky Sergey on 05.11.14.
 *
 * Material Design Responsive Table
 * Tested on Win8.1 with browsers: Chrome 37, Firefox 32, Opera 25, IE 11, Safari 5.1.7
 * You can use this table in Bootstrap (v3) projects. Material Design Responsive Table CSS-style will override basic bootstrap style.
 * JS used only for table constructor: you don't need it in your project
 */

$(document).ready(function() {

    var table = $('#table');

    // Table bordered
    $('#table-bordered').change(function() {
        var value = $( this ).val();
        table.removeClass('table-bordered').addClass(value);
    });

    // Table striped
    $('#table-striped').change(function() {
        var value = $( this ).val();
        table.removeClass('table-striped').addClass(value);
    });
  
    // Table hover
    $('#table-hover').change(function() {
        var value = $( this ).val();
        table.removeClass('table-hover').addClass(value);
    });

    // Table color
    $('#table-color').change(function() {
        var value = $(this).val();
        table.removeClass(/^table-mc-/).addClass(value);
    });
});

// jQuery’s hasClass and removeClass on steroids
// by Nikita Vasilyev
// https://github.com/NV/jquery-regexp-classes
(function(removeClass) {

	jQuery.fn.removeClass = function( value ) {
		if ( value && typeof value.test === "function" ) {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];
				if ( elem.nodeType === 1 && elem.className ) {
					var classNames = elem.className.split( /\s+/ );

					for ( var n = classNames.length; n--; ) {
						if ( value.test(classNames[n]) ) {
							classNames.splice(n, 1);
						}
					}
					elem.className = jQuery.trim( classNames.join(" ") );
				}
			}
		} else {
			removeClass.call(this, value);
		}
		return this;
	}

})(jQuery.fn.removeClass);