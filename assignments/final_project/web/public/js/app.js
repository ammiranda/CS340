var jsonToTable = function(json) {
  var table = "<table>";
  var row = $('<tr />');
  var parsed = JSON.parse(json.results);
  $.each(parsed, function(i, val) {
    for (var key in val) {
      table += '<tr>' + val[key] + '</tr>';
    }
  });
  table += "</table>";
  return table;  
};

var addColumnHeaders(data

var makeRequest = function(url, selector) {
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      $(selector).append(jsonToTable(data));
    }
  });
}

var render = function() {
   makeRequest('/actors', '#actors');
   makeRequest('/characters', '#characters');
   makeRequest('/episodes', '#episodes');
   makeRequest('/series', '#series');
   makeRequest('/studios', '#studios');
};

$(document).ready(function() {
  render();
});
