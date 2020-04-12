const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on("ready", (event) => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/Views/Home/main.html`);
  mainWindow.on("closed", () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const accelerators = {
  quit: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
  devTools: process.platform === "darwin" ? "Cmd+Alt+I" : "Ctrl+Shift+I",
  addTodo: process.platform === "darwin" ? "Cmd+T" : "Ctrl+T",
  clearTodos: process.platform === "darwin" ? "Cmd+D" : "Ctrl+D",
};

function createAddWindow() {
  addWindow = new BrowserWindow({
    title: "Add new TODO",
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  addWindow.loadURL(`file://${__dirname}/Views/Add/add.html`);
}

function clearTodos() {
  mainWindow.webContents.send("todo:clear");
}

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
  addWindow.on("closed", () => {
    addWindow = null;
  });
});

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        accelerator: accelerators.addTodo,
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Todos",
        accelerator: accelerators.clearTodos,
        click() {
          clearTodos();
        },
      },
      {
        label: "Quit Application",
        accelerator: accelerators.quit,
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === "darwin") {
  menuTemplate.unshift({ label: "Home" });
}

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Debug",
    submenu: [
      {
        role: "reload",
      },
      {
        label: "Open Dev-Tools",
        accelerator: accelerators.devTools,
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
