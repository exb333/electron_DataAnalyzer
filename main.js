const electron = require('electron')
const {
  app,
  BrowserWindow
} = electron
const path = require('path')
const url = require('url')

// Child Process allows us to run Python script in Node JS application
// and stream in/out data into/from Python script.
const py_spawn = require('child_process')

// # Main window implementation
let loginWindow = null
// let child = null

function createWindow() {
  loginWindow = new BrowserWindow({
    width: 800,
    height: 700,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, 'app', 'img', 'Icon.ico')
  });

  // loginWindow.setResizable(false)
  loginWindow.webContents.openDevTools();

  loginWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/login.html'),
    protocol: 'file:',
    slashes: true
  }));



};

app.on('ready', createWindow)


// python processes
let python_server = 'server.py'
let PY_FOLDER = path.join(__dirname,
  'app', 'py',
  'communicator', python_server
);


let pyProcess = null;

const createPyProcess = () => {
  // spawn method helps us to spawn child process asynchronously.
  pyprocess = py_spawn.spawn('python', [PY_FOLDER]);

  if (pyProcess != null) {
    console.log("child process success")
  }
}

const exitPyProcess = () => {
  pyprocess.kill();
}

app.on('ready', createPyProcess)
app.on('will-quit', exitPyProcess)
