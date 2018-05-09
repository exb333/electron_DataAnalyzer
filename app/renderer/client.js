const zerorpc = require('zerorpc')

let client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

client.invoke("echo", 'server ready', (error, res) => {
    if (error || res != 'server ready') {
      dialog.showErrorBox("Server Error", "Server is unable to start")
    } else {
      console.log("Server is Ready");
    }
});
