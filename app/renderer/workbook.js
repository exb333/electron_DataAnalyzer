// graph window creation:
const {
  dialog,
  app
} = require('electron').remote
const url = require('url')
const path = require('path')

var result = null;

function GraphWindowCreation() {

  // getting mainWindow from main.js
  // let mainWindow = require('electron').remote.getCurrentWindow()

  let graphWindow = new BrowserWindow({
    width: 900,
    height: 700,
    frame: false,
    icon: path.join(__dirname, 'img', 'Win_ico.ico')
  })

  graphWindow.flashFrame(true)
  graphWindow.maximize()
  graphWindow.setResizable(false)
  graphWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'result-graph.html'),
    protocol: 'file:',
    slashes: true,
  }))
  graphWindow.webContents.openDevTools();

  // Below two lines are sending our result to graph.js
  graphWindow.webContents.on('did-finish-load', () => {
    graphWindow.webContents.send('ping', result)
  })

  graphWindow.show() // opening options window
  // mainWindow.close() // closing login windowndow.maximize()
};



// ON LOAD BUTTON CLICK
$("#load").click(function(e) {
  $('ul').empty(); // this will clear up the list before loading new item
  client.invoke("sheets", $("#sheet").val(), (error, res) => {
    if (error) {
      console.log(error);
      dialog.showErrorBox("Datmeer Error", "Either the Workbook ID field is empty or you haved Entered wrong workbook ID")
    } else {
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        $('ul').append("<li> <input type='radio' name='sheet' value='" + res[i] + "'>&nbsp; &nbsp;" + res[i] + "</li>")
      }
    }
  });
});


// ON NEXT BUTTON CLICK
$("#next").click(function(event) {

  client.invoke("data", $("#sheet").val(),
    $("input[name='sheet']:checked").val(),
    (error, res, more) => {
      if (error) {
        console.log(error);
        // dialog.showErrorBox("Datmeer Error", "Either the Workbook ID field is empty or you haved Entered wrong workbook ID")
      } else {
        result = res; // collecting data in global variable defined at the top
        GraphWindowCreation(); // calling method
      }
    });

});


// ON CANCEL BUTTON CLICK
$("#cancel").click(function() {
  $("ul").empty();
  $("#sheet").val(" ");
});

// ANOTHER ALTERNATIVE OF [optionsWindow.webContents.on('did-finish-load']

// // In main process.
// const {ipcMain} = require('electron').remote
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.sender.send('asynchronous-reply', result)
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })
