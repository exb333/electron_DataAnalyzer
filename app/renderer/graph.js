// Importing render module
const { ipcRenderer } = require('electron')

var ScatterGraphData = null;

  // Test list and names
  var test_lists = ipcRenderer.on('ping', (event, message) => {
    // console.log(message) // Prints test_numbers and test_names

  // Dynamically creating table
    $('#head-tab').append("<th>Test Number</th>")
    $('#head-tab').append("<th>Test Name</th>")
    // JQuery map function
    var rows = $.map(message, function(key, value) {
          return '<tr><td class="tbl-row">' + value + '</td><td>' + key + '</td></tr>';
    });
    $('#inner-tab').append(rows.join('')); // joining all rows in the table
    // $('#test_table').focus();

  });

// enabling click event on table column and collecting the clicked test number

  $('#inner-tab').on("mouseenter", function(event) {
    // odd is making us to select only 1st column value
          $("td:nth-child(odd)").unbind().click(function(){ // unbind is helping in preventing loading event multiple times
            client.invoke("scatter_graph", $(this).text(), (error, res) => {
              if (error){
                console.log(error);
              } else{
                $("#scatter").empty();
                ConvertJsonToLists(res, $(this).text()); // creating two lists results and Counts for graph
              }
            });
            // console.log($(this).text());
          })
      });
