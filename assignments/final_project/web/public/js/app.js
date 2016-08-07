var jsonToTable = function(json) {
  var table = "<table class='table-bordered'>";
  var parsed = json.results;
  table += getColumnHeaders(parsed[0]);
  $.each(parsed, function(i, val) {
    var row = '<tr>';
    for (var key in val) {
      row += '<td>' + val[key] + '</td>';
    }
    row += '</tr>';
    table += row;
  });
  table += "</table>";
  return table;  
};

var getColumnHeaders = function(data) {
  var header = '<tr>';
  for (var key in data) {
    header += '<th>' + key + '</th>';
  }
  header += '</tr>';
  return header;
};

var renderTable = function(url, selector) {
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      $(selector).append(jsonToTable(data));
    }
  });
}

var render = function() {
   renderTable('/actors', '#actors');
   renderTable('/characters', '#characters');
   renderTable('/episodes', '#episodes');
   renderTable('/series', '#series');
   renderTable('/studios', '#studios');
};

$(document).ready(function() {
  render();
});
