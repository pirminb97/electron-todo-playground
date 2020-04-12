const electron = require("electron");
const { ipcRenderer } = electron;

ipcRenderer.on("todo:add", (event, data) => {
  const todo = document.createElement("li");
  const text = document.createTextNode(data);
  todo.appendChild(text);
  document.getElementById("todos").appendChild(todo);
});

ipcRenderer.on("todo:clear", () => {
  document.getElementById("todos").innerHTML = "";
});
