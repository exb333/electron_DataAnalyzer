// Creating Options Window after Login Form Submit.

const {dialog, app} = require('electron').remote
const url = require('url')
const path = require('path')


function OptionWindowCreation(){
  // getting mainWindow from main.js
  let mainWindow = require('electron').remote.getCurrentWindow()

  let optionsWindow = new BrowserWindow({
    width: 800,
    height: 700,
    frame: false,
    icon: path.join(__dirname, 'img', 'Icon.ico')
  })
  optionsWindow.flashFrame(true)
  // top.maximize()
  optionsWindow.setResizable(false)
  optionsWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'options.html'),
    protocol: 'file:',
    slashes: true
  }))
  optionsWindow.show() // opening options window
  mainWindow.close() // closing login window

};

// after form submit
$('form').submit(function(event){
  event.preventDefault();

  client.invoke("login", $("#uname").val(), $("#pwd").val(), $("#orc_pwd").val(), (error, res, more) => {
    // res != "Login Successful" is helping a lot for authentication
  if (error || res != "Login Successful") {
    console.log(error)
    dialog.showErrorBox("Authentication Error", res)
  } else {
    OptionWindowCreation(); // calling above method
  }
  });

});
