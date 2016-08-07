var jsonToTable = function(json) {
  var table = "<table class='table-bordered'>";
  var parsed = json.results;
  var keys = getKeys(parsed[0]);
  table += getColumnHeaders(keys);
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

var composeForm = function(keys) {
  var form = "<form class='form-horizontal'>";
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] === 'id') continue;
    form += "<div class='form-group'><label class='col-sm-2 control-label'>" + keys[i] + "</label>";
    form += "<div class='col-sm-6'>";
    form += "<input type='text' class='form-control' id='" + keys[i] + "'>";
    form += "</div></div>";
  }
  form += "<div class='form-group'><div class='col-sm-10 col-sm-offset-7'>";
  form += "<button class='btn btn-submit save' type='submit'>Save</button>";
  form += "</div></div>";
  form += "</form>";

  return form;
};

var getKeys = function(data) {
  var keys = [];
  for (var key in data) {
    keys.push(key);
  }

  return keys;
};

var getColumnHeaders = function(keys) {
  var header = '<tr>';
  for (var i = 0; i < keys.length; i++) {
    header += '<th>' + keys[i] + '</th>';
  }
  header += '</tr>';
  return header;
};

var renderTable = function(url, selector) {
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      $(selector).append('<h3>' + selector.substring(1) + '</h3>' + jsonToTable(data));
      $(selector).append(composeForm(getKeys(data.results[0])));
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
