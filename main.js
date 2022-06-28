// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Create the browser window.
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  // 加载应用的index.html文件
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // 打开开发者工具
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 当 Electron 完成初始化并且已经准备好创建浏览器窗口的时候,这个方法将会被调用
// 一些API只在事件发生后被使用
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // 在macOS上，当停靠图标被点击，没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// 除了macOs以外, 当所有窗口都被关闭的时候退出.
// 在用户用Cmd+Q退出之前,应用程序和菜单栏通常都应该保持活跃状态
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// 这个文件中可以包含应用程序的其他特定主进程代码。
// 或者你也可以把他们放在各自的文件里，在这里引入
