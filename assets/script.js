// Testing Variables
// var mlsId = 170330059;
// var propertyId = 3404179173;
// var lat = 41.549289;
// var lon = -72.711875;


// Outside Variables needed from initial MLS listing AJAX call to support other AJAX calls.
var mlsId = 0;
var propertyId = 0;
var lat = 0;
var lon = 0;
var city = "";
var state = "";

function myHome (response) {

    $("#myHome").attr("class", "mdl-card mdl-shadow--2dp");

    console.log(response);
    mlsId = response.listings[0].mls.id;
    lat = response.listings[0].lat;
    lon = response.listings[0].lon;
    propertyId = response.listings[0].property_id;
    city = response.listings[0].address_new.city;
    state = response.listings[0].address.state_code;

    var mlsPhoto = response.listings[0].photo;
    var mlsAddress = response.listings[0].address;
    var mlsPrice = response.listings[0].price;
    var mlsPrice_Raw = response.listings[0].price_raw;
    var mlsSqft = response.listings[0].sqft;
    var mlsSqft_Raw = response.listings[0].sqft_raw;
    var propType = response.listings[0].prop_type;
    var baths = response.listings[0].baths;
    var fullBaths = response.listings[0].baths_full;
    var beds = response.listings[0].beds;
    var saleStatus = response.listings[0].prop_status;
    // var vTour = response.listings[0].virtual_tour.href;

    var addPhoto = $("<img>").attr("src", "" + mlsPhoto).attr("style", "object-fit: cover; max-width: 300px;");
    var addAddress = $("<p>").text(mlsAddress).attr("style", "font-weight:bolder; font-size:15pt; margin-top: 15px;");
    // var addPrice = $("<p>").text("Asking Price: " + mlsPrice);
    // var addSqft = $("<p>").text("SqFt: " + mlsSqft);
    // var addPropType = $("<p>").text("Property Type: " + propType);
    // var addBaths = $("<p>").text("Number of Baths: " + baths);
    // var addFullBaths = $("<p>").text("Number of Full Baths: " + fullBaths);
    // var addBeds = $("<p>").text("Number of Beds: " + beds);
    // var addSaleStatus = $("<p>").text("Status: " + saleStatus);

    var pricePerSF = Math.round(mlsPrice_Raw / parseInt(mlsSqft_Raw));
    var chipArray = ["Price Per SqFt", "Sqft", "Type", "Baths", "Full Baths", "Beds", "Status"];
    var responseArray = [("$" +pricePerSF), mlsSqft, propType, baths, fullBaths, beds, saleStatus];

    $("#myHome").prepend("$" + mlsPrice_Raw);
    $("#myHome").prepend(addAddress);
    $("#myHome").prepend(addPhoto);

    for (x = 0; x < chipArray.length; x++) {
        // console.log(responseArray[x]);
        // console.log(x);
        if (responseArray[x] !== (null || undefined)) {

            var chipText = $("<span>").attr("class", "mdl-chip__text").attr("id", chipArray[x]).text(chipArray[x] + ": " + responseArray[x]);
            var chipComplete = $("<div>").attr("class", "mdl-chip").append(chipText);

            $("#homeCard").append($(chipComplete));

            // $("#myHome").append($("<div>").attr("class", "mdc-chip-set").attr("role", "grid"));
            // $(".mdc-chip-set").html(`${chips}`);
            // $("#myHome").append($("<div>").attr("class", "mdc-chip-set").attr("role", "grid").html(`${chips}`));
            // $("#chip").attr("id", chipArray[x]);
            // $("#myHome").append(chipParent);
            // $("#" + chipArray[x]).text(chipArray[x] + ": " + responseArray[x]);
            };
    };
};

function simHomes (response) {

    // $("#mySims").attr("class", "mdl-card mdl-shadow--2dp");

    var homesResults = response.data.home.related_homes.results

    for (var x = 0; x < homesResults.length; x++) {

        var simPhoto = response.data.home.related_homes.results[x].primary_photo.href;
        var simAddress = response.data.home.related_homes.results[x].location.address.line;
        var simCity = response.data.home.related_homes.results[x].location.address.city;
        var simLink = response.data.home.related_homes.results[x].href;
        var simPrice = response.data.home.related_homes.results[x].list_price;
        var simSqft = response.data.home.related_homes.results[x].description.sqft;
        var simBaths = response.data.home.related_homes.results[x].description.baths;
        var simBeds = response.data.home.related_homes.results[x].description.beds;

        var addPhoto = $("<img>").attr("src", "" + simPhoto).attr("style", "object-fit: cover; max-width: 300px; max-height: 200px; overflow: hidden;");
        var addAddress = $("<p>").text(simAddress).attr("style", "font-weight:bolder; font-size:15pt; margin-top: 15px;");
        // var addCity = $("<p>").text(simCity).attr("style", "font-weight:bolder; font-size:12pt;");
        // var addLink = $("<a>").attr("href", "" + simLink).attr("target", "_blank").text("More Details on Realtor.com");
        // var addPrice = $("<p>").text("Asking Price: $" + simPrice);
        // var addSqft = $("<p>").text("SqFt: " + simSqft);
        // var addBaths = $("<p>").text("Number of Baths: " + simBaths);
        // var addBeds = $("<p>").text("Number of Beds: " + simBeds);

        // console.log("mySims" + x);
        
        // var gridWrapper = $("<div>").attr("class", "mdl-grid");
        // var gridParent = $("<div>").attr("class", "mdl-cell mdl-cell--2-col mdl-cell--4-col-phone graybox");
        var simCard = $("<div>").attr("class", "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--2-col mdl-cell--4-col-phone graybox").attr("id", "mySims" + x).attr("style", "background-color: #fdfefe; margin: 0 auto; width: 300px; margin-bottom: 10px;");
        var chipWrapper = $("<div>").attr("class", "mdl-card__supporting-text").attr("style", "width: 100%;").attr("id", "chip" + x);
        var linkWrapper = $("<div>").attr("class", "mdl-card__actions mdl-card--border");
        var linkRealtor = $("<a>").attr("class", "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect").attr("href", simLink).attr("target", "_blank").text("Realtor.com Listing");

        var pricePerSF = Math.round(simPrice / simSqft);

        $(".comps").append(simCard);

        $("#mySims" + x).prepend(addAddress);
        $("#mySims" + x).prepend(addPhoto);
        $("#mySims" + x).append("$" + simPrice);
        $("#mySims" + x).append(chipWrapper);
        $("#mySims" + x).append(linkWrapper).append(linkRealtor);

        var chipArray = ["Price Per SqFt", "Sqft", "Baths", "Beds"];
        var responseArray = [("$" + pricePerSF), simSqft, simBaths, simBeds];

        // console.log(chipArray);
        // console.log(responseArray);
    
        for (i = 0; i < chipArray.length; i++) {
            // console.log(x);
            
            if (responseArray[i] !== (null || undefined)) {

                var chipText = $("<span>").attr("class", "mdl-chip__text").attr("id", chipArray[i]).text(chipArray[i] + ": " + responseArray[i]);
                var chipComplete = $("<div>").attr("class", "mdl-chip").append(chipText);
    
                $("#chip" + x).append($(chipComplete));
    
            };
        };

        // var section = $("<section>").attr("style", "padding:10px;");
        // section = section.append(addPhoto).append(addAddress, addCity, addPrice, addSqft, addBaths, addBeds, addLink);
        // $("#loadedContent").append(section);

    };

};

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
		"x-rapidapi-key": "a2823f58a1mshddacac4c2e17e96p1195c5jsnfe04f413d57a",
	}
};

// Used for testing to limit API calls
var response = {"meta":{"build":"3.23.118","schema":"mapsearch","tracking_params":{"channel":"for_sale","siteSection":"for_sale","city":"unknown","county":"unknown","neighborhood":"unknown","searchCityState":"unknown","state":"unknown","zip":"unknown","srpPropertyStatus":"srp:for_sale","listingActivity":"unknown","propertyStatus":"for_sale","propertyType":"any","searchBathrooms":"any","searchBedrooms":"any","searchMaxPrice":"unknown","searchMinPrice":"unknown","searchRadius":"unknown","searchHouseSqft":"any","searchLotSqft":"any","searchResults":"1","sortResults":"price_low","searchCoordinates":"unknown","version":"1.0"},"tracking":"type|meta|data|resource_type|property_list|query|schema|mapsearch|client_id|rdc_mobile_native,10.11.0|limit|offset|mls_id|170330059|sort|price_low|prop_status|for_sale|count|total^A|0|1|1^^$0|1|2|$3|4|5|$6|7|8|9|A|K|B|L|C|D|E|F]|G|H|I|M|J|N]]"},"returned_rows":1,"matching_rows":1,"listings":[{"property_id":"3404179173","is_new_construction":false,"listing_id":"2920484470","prop_type":"single_family","last_update":"2020-08-27T08:30:06Z","rdc_web_url":"https://www.realtor.com/realestateandhomes-detail/26-Higby-Rd_Middletown_CT_06457_M34041-79173","virtual_tour":{"href":"https://app.immoviewer.com/landing/unbranded/5f478b20e207490dac323b6d"},"is_turbo":false,"address":"26 Higby Rd, Middletown, 06457","address_new":{"city":"Middletown","line":"26 Higby Rd","postal_code":"06457","state_code":"CT","state":"Connecticut","county":"Middlesex","fips_code":"09007","lat":41.549289,"lon":-72.711875},"prop_status":"for_sale","price_raw":434900,"sqft_raw":3418,"list_date":"2020-08-26T11:10:33Z","advertiser_id":791485,"office_name":"Great Estates, Ct","products":["core.agent","co_broke"],"is_showcase":false,"price":"$434,900","beds":4,"baths":3,"sqft":"3,418 sq ft","lot_size":"1.07 acres","mls":{"name":"SMARTMLS","id":"170330059","plan_id":null,"abbreviation":"NOCT","type":"mls"},"photo":"https://ap.rdcpix.com/b852c4554eef48593b56492c52f89c79l-m2939284275x.jpg","is_cobroker":true,"short_price":"$434K","baths_full":3,"photo_count":28,"lat":41.549289,"lon":-72.711875,"has_leadform":true,"page_no":1,"rank":1,"list_tracking":"type|property|data|prop_id|3404179173|list_id|2920484470|page|rank|list_branding|listing_agent|listing_office|advertiser_id|agent|property_status|product_code|advantage_code^1|1|0|1|GYPP|35T|9HS|1^^$0|1|2|$3|4|5|6|7|H|8|I|9|$A|J|B|K]|C|$D|L]|E|M|F|N|G|O]]","suppression_flags":["suppress_foreclosure"],"lead_forms":[{"type":"classic","lead_type":"co_broke","form":{"name":{"required":true,"minimum_character_count":1},"email":{"required":true,"minimum_character_count":5},"phone":{"required":true,"minimum_character_count":10,"maximum_character_count":11},"message":{"required":false,"minimum_character_count":0},"agents":[{"advertiser_id":791485,"has_ratings":false,"is_listing_agent":true}],"show":true},"is_lcm_enabled":false,"show_text_leads":true,"cashback_enabled":false,"flip_the_market_enabled":false}]}]};
myHome(response);

//  $.ajax(settings).done(myHome);
//  console.log(response);
//  };

});


$("#similarTo").click(function () {
// AJAX for list of similar homes using property ID from MLS listing response.
    console.log("Searching Similar Properties...");

    $("#loadedContent").attr("class", "show");

    var similarHomes = {
        "async": true,
        "crossDomain": true,
        "url": "https://realtor.p.rapidapi.com/properties/v2/list-similar-homes?property_id=" + propertyId,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "a2823f58a1mshddacac4c2e17e96p1195c5jsnfe04f413d57a",
        }
    };

    var response = {"data":{"home":{"related_homes":{"count":20,"results":[{"property_id":"4962874969","list_price":459500,"href":"https://www.realtor.com/realestateandhomes-detail/81-Bartlett-Holw_Middletown_CT_06457_M49628-74969","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2920579480","primary_photo":{"href":"https://ap.rdcpix.com/29f37fc2b73df789ba6211d6e74b5c8bl-m180540584xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":3,"sqft":3072},"location":{"address":{"city":"Middletown","country":"usa","line":"81 Bartlett Holw"}}},{"property_id":"3231472348","list_price":399900,"href":"https://www.realtor.com/realestateandhomes-detail/41-Boylston-St_Meriden_CT_06450_M32314-72348","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2920096955","primary_photo":{"href":"https://ap.rdcpix.com/aecd31894dda93a1eecac1ca28813f26l-m2588940029xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":3,"sqft":2812},"location":{"address":{"city":"Meriden","country":"usa","line":"41 Boylston St"}}},{"property_id":"9807607465","list_price":400000,"href":"https://www.realtor.com/realestateandhomes-detail/205-Middle-St_Middletown_CT_06457_M98076-07465","flags":{"is_contingent":true,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":true},"status":"for_sale","listing_id":"2921327447","primary_photo":{"href":"https://ap.rdcpix.com/bc168aff18c8e5564d833e4e2f6d0d4el-m2822560234xd-w300_h300_q80.jpg"},"description":{"baths":0,"baths_full":null,"baths_half":null,"beds":null,"sqft":1144},"location":{"address":{"city":"Middletown","country":"usa","line":"205 Middle St"}}},{"property_id":"3382175820","list_price":355000,"href":"https://www.realtor.com/realestateandhomes-detail/280-High-Hill-Rd_Meriden_CT_06450_M33821-75820","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2921004746","primary_photo":{"href":"https://ap.rdcpix.com/ae48a2651a370e56cd287bc33237cbbdl-m71186546xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":3,"sqft":3492},"location":{"address":{"city":"Meriden","country":"usa","line":"280 High Hill Rd"}}},{"property_id":"4441257274","list_price":380000,"href":"https://www.realtor.com/realestateandhomes-detail/74-Poplar-Rd_Middletown_CT_06457_M44412-57274","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2919638238","primary_photo":{"href":"https://ap.rdcpix.com/1584436d44c57a0da63eb5490a8ad47el-w2854544146xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":4,"sqft":2210},"location":{"address":{"city":"Middletown","country":"usa","line":"74 Poplar Rd"}}},{"property_id":"3912920338","list_price":429900,"href":"https://www.realtor.com/realestateandhomes-detail/16-Falmouth-Ct_Middletown_CT_06457_M39129-20338","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":true},"status":"for_sale","listing_id":"2921104662","primary_photo":{"href":"https://ap.rdcpix.com/5d09b81af48989521c6023a8dc2774fal-m3632658717xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":5,"sqft":2577},"location":{"address":{"city":"Middletown","country":"usa","line":"16 Falmouth Ct"}}},{"property_id":"9328404583","list_price":449000,"href":"https://www.realtor.com/realestateandhomes-detail/129-Boardman-Ln_Middletown_CT_06457_M93284-04583","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":true},"status":"for_sale","listing_id":"2921355926","primary_photo":{"href":"https://ap.rdcpix.com/7bcd0048f34101c66b7535e9726caf01l-m2334191734xd-w300_h300_q80.jpg"},"description":{"baths":1,"baths_full":null,"baths_half":null,"beds":3,"sqft":1974},"location":{"address":{"city":"Middletown","country":"usa","line":"129 Boardman Ln"}}},{"property_id":"3102124188","list_price":304900,"href":"https://www.realtor.com/realestateandhomes-detail/53-Harvard-Ct_Middletown_CT_06457_M31021-24188","flags":{"is_contingent":true,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2920477148","primary_photo":{"href":"https://ap.rdcpix.com/970e492d7a8c24f793d0ced82aca84aal-w348882939xd-w300_h300_q80.jpg"},"description":{"baths":4,"baths_full":null,"baths_half":null,"beds":4,"sqft":2720},"location":{"address":{"city":"Middletown","country":"usa","line":"53 Harvard Ct"}}},{"property_id":"4103646393","list_price":329900,"href":"https://www.realtor.com/realestateandhomes-detail/367-Boston-Rd_Middletown_CT_06457_M41036-46393","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":true},"status":"for_sale","listing_id":"2921109757","primary_photo":{"href":"https://ap.rdcpix.com/e8acfe952d163fe6e791272a2efc7f1al-m3369468229xd-w300_h300_q80.jpg"},"description":{"baths":2,"baths_full":null,"baths_half":null,"beds":3,"sqft":2096},"location":{"address":{"city":"Middletown","country":"usa","line":"367 Boston Rd"}}},{"property_id":"9907463114","list_price":473900,"href":"https://www.realtor.com/realestateandhomes-detail/654-656-Bartholomew-Rd_Middletown_CT_06457_M99074-63114","flags":{"is_contingent":null,"is_new_construction":true,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2920203836","primary_photo":{"href":"https://ap.rdcpix.com/f38e93dbe9f2ab408fe05936cc03f394l-m272609767xd-w300_h300_q80.jpg"},"description":{"baths":6,"baths_full":null,"baths_half":null,"beds":4,"sqft":2652},"location":{"address":{"city":"Middletown","country":"usa","line":"654 656 Bartholomew Rd"}}},{"property_id":"4975385840","list_price":358000,"href":"https://www.realtor.com/realestateandhomes-detail/18-Rivercove-Dr_Cromwell_CT_06416_M49753-85840","flags":{"is_contingent":true,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2920788342","primary_photo":{"href":"https://ap.rdcpix.com/9aadb506eb0051f9c21fec446c809c93l-m3284937372xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":3,"sqft":2532},"location":{"address":{"city":"Cromwell","country":"usa","line":"18 Rivercove Dr"}}},{"property_id":"4875490889","list_price":349900,"href":"https://www.realtor.com/realestateandhomes-detail/15-Red-Orange-Rd_Middletown_CT_06457_M48754-90889","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2921015249","primary_photo":{"href":"https://ap.rdcpix.com/13f2b584a113821a32ce435b94f4f5ael-m3375720788xd-w300_h300_q80.jpg"},"description":{"baths":4,"baths_full":null,"baths_half":null,"beds":4,"sqft":2795},"location":{"address":{"city":"Middletown","country":"usa","line":"15 Red Orange Rd"}}},{"property_id":"4860664639","list_price":399000,"href":"https://www.realtor.com/realestateandhomes-detail/23-Old-Johnson-Ln_Middletown_CT_06457_M48606-64639","flags":{"is_contingent":true,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":true},"status":"for_sale","listing_id":"2921369416","primary_photo":{"href":"https://ap.rdcpix.com/e4a95515586dc0a365517aa99a796a79l-m1122318347xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":3,"sqft":2886},"location":{"address":{"city":"Middletown","country":"usa","line":"23 Old Johnson Ln"}}},{"property_id":"3062562797","list_price":379900,"href":"https://www.realtor.com/realestateandhomes-detail/38-Hillside-Rd_Cromwell_CT_06416_M30625-62797","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2919775586","primary_photo":{"href":"https://ap.rdcpix.com/d7196640c9b3e55f2eaaedefb1b00871l-m2175150073xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":5,"sqft":2751},"location":{"address":{"city":"Cromwell","country":"usa","line":"38 Hillside Rd"}}},{"property_id":"9242849294","list_price":435000,"href":"https://www.realtor.com/realestateandhomes-detail/3-Ridgewood-Rd_Middletown_CT_06457_M92428-49294","flags":{"is_contingent":null,"is_new_construction":true,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2689419917","primary_photo":{"href":"https://ap.rdcpix.com/88fb9795bb3510d280e26ed6e6642579l-m1677809675xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":4,"sqft":2622},"location":{"address":{"city":"Middletown","country":"usa","line":"3 Ridgewood Rd"}}},{"property_id":"4933924407","list_price":314900,"href":"https://www.realtor.com/realestateandhomes-detail/5-Sonoma-Ln_Middletown_CT_06457_M49339-24407","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2920761343","primary_photo":{"href":"https://ap.rdcpix.com/a4d513c25a4b9625624bb605b113da5cl-m2488791097xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":2,"sqft":1925},"location":{"address":{"city":"Middletown","country":"usa","line":"5 Sonoma Ln"}}},{"property_id":"3023846632","list_price":349900,"href":"https://www.realtor.com/realestateandhomes-detail/86-Westfield-St_Middletown_CT_06457_M30238-46632","flags":{"is_contingent":null,"is_new_construction":null,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2918023071","primary_photo":{"href":"https://ap.rdcpix.com/100858d31d199bda27c9308d49a7f654l-m2576135035xd-w300_h300_q80.jpg"},"description":{"baths":2,"baths_full":null,"baths_half":null,"beds":5,"sqft":3015},"location":{"address":{"city":"Middletown","country":"usa","line":"86 Westfield St"}}},{"property_id":"9259040434","list_price":359900,"href":"https://www.realtor.com/realestateandhomes-detail/16-Webster-Ln_Middletown_CT_06457_M92590-40434","flags":{"is_contingent":true,"is_new_construction":true,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2920627749","primary_photo":{"href":"https://ap.rdcpix.com/1b644cd3014d0187fe02a644df9f917bl-m1392364727xd-w300_h300_q80.jpg"},"description":{"baths":2,"baths_full":null,"baths_half":null,"beds":2,"sqft":1548},"location":{"address":{"city":"Middletown","country":"usa","line":"16 Webster Ln"}}},{"property_id":"9126978741","list_price":384900,"href":"https://www.realtor.com/realestateandhomes-detail/200-Ballfall-Rd-2_Middletown_CT_06457_M91269-78741","flags":{"is_contingent":null,"is_new_construction":true,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2916312155","primary_photo":{"href":"https://ap.rdcpix.com/aff83c516d867004f125951ef59b08f7l-m911700183xd-w300_h300_q80.jpg"},"description":{"baths":3,"baths_full":null,"baths_half":null,"beds":3,"sqft":1906},"location":{"address":{"city":"Middletown","country":"usa","line":"200 Ballfall Rd 2"}}},{"property_id":"9217300985","list_price":339900,"href":"https://www.realtor.com/realestateandhomes-detail/22-Webster-Ln-14_Middletown_CT_06457_M92173-00985","flags":{"is_contingent":null,"is_new_construction":true,"is_pending":null,"is_foreclosure":null,"is_new_listing":false},"status":"for_sale","listing_id":"2920499782","primary_photo":{"href":"https://ap.rdcpix.com/bc2fa85eb04d9046eb3f4e900be826b0l-m3574539221xd-w300_h300_q80.jpg"},"description":{"baths":2,"baths_full":null,"baths_half":null,"beds":2,"sqft":1420},"location":{"address":{"city":"Middletown","country":"usa","line":"22 Webster Ln 14"}}}],"impression_token":{"product":"ir_platform","type":"impression_token","api_route":"similarhomestradeoffs","module_name":"SimilarHomes","algo_name":"MLBased","algo_version":"1.0","model_name":"LightGBM","module_type":"fs-to-fs","model_version":"1.0","impression_id":"ckfah99njtiok01pddc27c9zw","recommendations_count":20,"client_id":"rdc-x-hestia.graphql.server"}}}}}
    simHomes(response);

    // $.ajax(similarHomes).done(similarHomes) {
//     console.log(response);
    // };
});

// AJAX for gathering data for school systems
$("#schools").click(function () {

    console.log("Searching Similar Schools...")

    $("#demo").attr("class", "show");

    var schoolData = {
        "async": true,
        "crossDomain": true,
        "url": "https://realtor.p.rapidapi.com/schools/list-nearby?lon=" + lon + "&lat=" + lat,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "a2823f58a1mshddacac4c2e17e96p1195c5jsnfe04f413d57a"
        }
    };

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

    // $("#demo").prepend(tableTitle);

    $("thead").append(tableHeaders);

    $(".table-responsive-vertical").attr("class", "table-responsive-vertical shadow-z-1");

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