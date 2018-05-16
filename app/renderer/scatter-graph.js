function ConvertJsonToLists(jData, test) {
  var arrJSON = jQuery.parseJSON(jData);
  var results = [];
  var Counts = [];
  for (var i=0; i < arrJSON.length; i++){
    results.push(arrJSON[i].result);
    Counts.push(arrJSON[i].Count);
  }
  console.log(results);

  var trace1 = {
    x: results,
    y: Counts,
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    // text: [results, Counts],
    marker: { size: 12 }
  };

  var data = [ trace1 ];

  var layout = {
  title: 'Scatter Plot with a Color Dimension' + test
};

  Plotly.newPlot('scatter', data, layout);
};
