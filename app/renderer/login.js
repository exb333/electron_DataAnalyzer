const {dialog, app} = require('electron').remote
const url = require('url')
const path = require('path')
// const app = require('electron').remote.app
// console.log(app)


function Another(){
  let top = require('electron').remote.getCurrentWindow()
  console.log(top);
  // top.flashFrame(true)
  // top.maximize()
  top.setResizable(false)
  top.loadURL(url.format({
    pathname: path.join(__dirname, 'hello.html'),
    protocol: 'file:',
    slashes: true
  }))

};

$('form').submit(function(event){
  event.preventDefault();

  client.invoke("login", $("#uname").val(), $("#pwd").val(), (error, res, more) => {
  if (error || res != "Login Successful") {
    dialog.showErrorBox("Authentication Error", res)
  } else {
    Another();
    console.log(res);

  }
  });

});
