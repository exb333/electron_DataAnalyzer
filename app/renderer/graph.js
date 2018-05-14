// Importing render module
const {ipcRenderer} = require('electron')


// Test list and names
var test_lists = ipcRenderer.on('ping', (event, message) => {
            console.log(message) // Prints test_numbers and test_names
            $.each(message, function(key, value) {

                 $('#test').append(key + '  ' + value + '<br />')

            });
          })
