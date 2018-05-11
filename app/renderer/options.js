// Creating Options Window after Login Form Submit.

const url = require('url')
const path = require('path')


function WorkBookWindowCreation(){
  // getting mainWindow from main.js
  let mainWindow = require('electron').remote.getCurrentWindow()

  // mainWindow.flashFrame(true)
  // top.maximize()
  mainWindow.setResizable(false)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'select-workbook.html'),
    protocol: 'file:',
    slashes: true
  }))

    mainWindow.webContents.openDevTools();

};

// if result graph app selected
$('#graphs').click(function(event){
  WorkBookWindowCreation();
});
