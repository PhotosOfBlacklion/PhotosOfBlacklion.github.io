(function() {
  function displaySearchResults(results, store, term) {
    var searchResultsCount = document.getElementById('search-results-count');
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';
      searchResultsCount.innerHTML = results.length + ' albums found matching "' + term + '"';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<h4><time datetime="' + item.date + '">' + item.date + '</time> <a href="' + item.url + '">' + item.title + '</a></h4>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResultsCount.innerHTML = 'No albums found matching "' + term + '"';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('q');

  if (searchTerm) {

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store, searchTerm);
    }
  }
})();
