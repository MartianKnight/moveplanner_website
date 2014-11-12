
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var $street = $('#street');
    var $city = $('#city');
    console.log($('#street').val());
    var HTMLgoogleMapURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location= %street%, %city%';
    var formattedURL = HTMLgoogleMapURL.replace("%street%", $street.val());
    formattedURL = formattedURL.replace("%city%", $city.val());
    console.log(formattedURL);

    var HTMLimage = "<img src='%data%' class='bgimg'>";
    var formattedImage = HTMLimage.replace("%data%", formattedURL);
    $body.append(formattedImage);
    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
