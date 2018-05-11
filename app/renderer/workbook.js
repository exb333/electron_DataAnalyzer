// graph window creation:


const {dialog, app} = require('electron').remote
const url = require('url')
const path = require('path')


function GraphWindowCreation(){
  // getting mainWindow from main.js
  let mainWindow = require('electron').remote.getCurrentWindow()

  // mainWindow.flashFrame(true)

  mainWindow.setResizable(true)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'result-graph.html'),
    protocol: 'file:',
    slashes: true
  }))
    mainWindow.maximize()
    mainWindow.webContents.openDevTools();

};

// ON LOAD BUTTON CLICK
$("#load").click(function(){
  $('ul').empty(); // this will clear up the list before loading new item
  client.invoke("sheets", $("#sheet").val(), (error, res) => {
    if(error){
      console.log(error);
      dialog.showErrorBox("Datmeer Error", "Either the Workbook ID field is empty or you haved Entered wrong workbook ID")
    } else{
      console.log(res)
      for (let i=0; i<res.length; i++){
        $('ul').append("<li> <input type='radio' name='sheet' value='"+res[i]+"'>&nbsp; &nbsp;" +res[i]+"</li>")
      }
    }
  });
});

// ON NEXT BUTTON CLICK
$("#next").click(function(event){
  // GraphWindowCreation();

  client.invoke("data", $("#sheet").val(), $("input[name='sheet']:checked").val(), (error, res, more) => {
    if(error){
      console.log(error);
      // dialog.showErrorBox("Datmeer Error", "Either the Workbook ID field is empty or you haved Entered wrong workbook ID")
    } else{
      console.log(res)
      // for (let i=0; i<res.length; i++){
      //   $('ul').append("<li> <input type='radio' name='sheet' value='"+i+"'>&nbsp; &nbsp;" +res[i]+"</li>")
      // }
    }
  });
});


// ON CANCEL BUTTON CLICK
$("#cancel").click(function(){
  $("ul").empty();
  $("#sheet").val(" ");
});
