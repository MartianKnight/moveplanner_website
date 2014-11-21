
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

    var HTMLimage = "<img src='%data%' class='bgimg'>";
    var formattedImage = HTMLimage.replace("%data%", formattedURL);
    $body.append(formattedImage);
    // load streetview

    // NYT API
    baseURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    sortQuery  = "&sort=newes"
    nytKey = "&api-key=4a9f8aaddf77876bf57d1d02b5c3cde0:19:70181836";
    nytURL = baseURL + address + sortQuery + nytKey;

    $.getJSON(nytURL, function (data) {
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
    }).error(function(e) {
      $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
      console.log(e);
    });

    // WIKI API
    var wikiURL = 'http://en.wikipedia.org/w/api.
      php?action=opensearch&search=' + address + '
      &format=json&callback=wikiCallback';
    $.ajax( {
      url: wikiURL,
      dataType: "jsonp",
      success: function( response ){
          var articleList = response[1];
          for (var i = 0, i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li><a href="' + url + '">' +
              articleStr + '</a></li>');
          }
      }
    })

    return false;
};

$('#form-container').submit(loadData);

// loadData();
