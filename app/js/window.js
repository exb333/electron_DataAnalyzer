// importing browserwindow to get all the functionality
const {BrowserWindow} = require('electron').remote

 function init() {
     // Minimize task
     $("#min-btn").on("click", (e) => {
         var window = BrowserWindow.getFocusedWindow();
         window.minimize();
     });

     // Maximize window
     $("#max-btn").on("click", (e) => {
         var window = BrowserWindow.getFocusedWindow();
         if(window.isMaximized()){
             window.unmaximize();
         }else{
             window.maximize();
         }
     });

     // Close app
     $("#close-btn").on("click", (e) => {
         var window = BrowserWindow.getFocusedWindow();
         window.close();
     });
 };

// calling function when loading document
$(document).ready(() => {
    init();
});
