'use strict';
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600,
                                  darkTheme:true, //다크테마.. 별 소용 없는듯
                                  autoHideMenuBar:true //메뉴바 숨기기
                                  //kiosk:true //전체화면으로 변경
                                });
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index3.html'),
    protocol: 'file:',
    slashes: true
  }));
    //mainWindow.loadURL('file://'+__dirname + '/index.html')과 같다.

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/* WEB SERVER */
//이런식으로 하면 electron을 띄움과 동시에 webserver도 띄울 수 있다.
var http = require('http'); //http 모듈 사용
var express = require('express'); //express framework 모듈 사용
var viewPage = express();
viewPage.use(express.static(__dirname+"/web-view"));

http.createServer(viewPage).listen(9090, function () {
    console.log('server on 9090');
});

/*
/!* GET 통신을 위한  *!/
var url = require('url');
var querystring = require('querystring');


/!* Electron을 위한 전역 객체 *!/
var events = require('events');
global.sender = new events.EventEmitter();

/!* 스마트 미러 <-> Android APP 음성 명령 통신 *!/
smartmirror.get('/android.do',function(req,res){
    console.log(req.url);
    var query = url.parse(req.url, true).query;
    console.log(query);
    global.sender.emit('android',query);
    res.send("<h1>Android Command OK</h1>");
});

/!* 스마트 미러 <-> Android APP Notification 통신 *!/
smartmirror.get('/noti.do',function(req,res){
    console.log(req.url);
    var query = url.parse(req.url, true).query;
    console.log(query);
    global.sender.emit('data',query);
    res.send("<h1>Noti OK</h1>");
});*/
