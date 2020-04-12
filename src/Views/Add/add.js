const electron = require("electron");
const { ipcRenderer } = electron;

let form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { value } = document.getElementsByTagName("input")[0];
  ipcRenderer.send("todo:add", value);
});
