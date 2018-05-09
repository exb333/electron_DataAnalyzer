// Creating Options Window after Login Form Submit.

const {dialog, app} = require('electron').remote
const url = require('url')
const path = require('path')


function WorkBookWindowCreation(){
  // getting mainWindow from main.js
  let mainWindow = require('electron').remote.getCurrentWindow()

  // mainWindow.flashFrame(true)
  // top.maximize()
  mainWindow.setResizable(true)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'workbook.html'),
    protocol: 'file:',
    slashes: true
  }))

    mainWindow.webContents.openDevTools();

};

// after form submit
$('#graphs').click(function(event){
  WorkBookWindowCreation();
  //
  // client.invoke("login", $("#uname").val(), $("#pwd").val(), (error, res, more) => {
  // if (error || res != "Login Successful") {
  //   dialog.showErrorBox("Authentication Error", "Please check your user id and password")
  // } else {
  //   OptionWindowCreation(); // calling above method
  // }
  // });

});

$("#load").click(function(){
  $('ul').empty(); // this will clear up the list before loading new item
  client.invoke("ray", $("#sheet").val(), (error, res) => {
    if(error){
      console.log(error);
      dialog.showErrorBox("Datmeer Error", "Either the Workbook ID field is empty or you haved Entered wrong workbook ID")
    } else{
      console.log(res)
      for (let i=0; i<res.length; i++){
        $('ul').append("<li> <input type='radio' name='sheet' value='"+i+"'>" +res[i]+"</li>")
      }
    }
  });
});
