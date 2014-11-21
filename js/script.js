
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    $greeting.text('So, you want to live at ' + address + '?');

    var HTMLgoogleMapURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location= %data%';
    var formattedURL = HTMLgoogleMapURL.replace("%data%", address);
    console.log(formattedURL);

    // NYT API key: 4a9f8aaddf77876bf57d1d02b5c3cde0:19:70181836

    var HTMLimage = "<img src='%data%' class='bgimg'>";
    var formattedImage = HTMLimage.replace("%data%", formattedURL);
    $body.append(formattedImage);
    // load streetview

    // YOUR CODE GOES HERE!
    baseURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    sortQuery  = "&sort=newes"
    key = "&api-key=4a9f8aaddf77876bf57d1d02b5c3cde0:19:70181836";
    URL = baseURL + address + sortQuery + key;

    $.getJSON(URL, function (data) {
      console.log(data);

      $nytHeaderElem.text('New York Times Articles About' + address);
      articles = data.response.docs;

      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        $nytElem.append('<li class="article">' +
          '<a href="' + article.web_url + '">' +
          article.headline.main + '</a>' +
          '<p>' + article.snippet + '</p>' +
          '</li>');
      }

      // var items = [];
      // $.each( data, function( key, val ) {
      //   item.push( "<li id='" + key + "'>" + val + "</li>");
      // });
      //
      // $( "<ul/>", {
      //   "class": "my-new-list",
      //   html: items.join( "" )
      // }).appendTo( "body" );
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
