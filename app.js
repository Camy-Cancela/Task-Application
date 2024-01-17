const List = document.querySelector("#List");
const input = document.querySelector("#input");
const enterButton = document.querySelector("#enterButton");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let LIST;

document.addEventListener("DOMContentLoaded", function () {
  showCurrentDateTime();
  setInterval(showCurrentDateTime, 1000);
});

function showCurrentDateTime() {
  var currentDateElement = document.getElementById("currentDate");
  var currentTimeElement = document.getElementById("currentTime");

  if (currentDateElement && currentTimeElement) {
    var currentDateTime = new Date();

    var optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var formattedDate = currentDateTime.toLocaleDateString(
      "en-US",
      optionsDate
    );

    var optionsTime = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    var formattedTime = currentDateTime.toLocaleTimeString(
      "en-US",
      optionsTime
    );

    currentDateElement.textContent = formattedDate;
    currentTimeElement.textContent = formattedTime;
  }
}

function AddTask(task, id, Completed, Delete) {
  if (Delete) {
    return;
  }
  const COMPLETED = Completed ? check : uncheck;
  const Line = Completed ? lineThrough : "";
  const elemento = `<li>
    <i class="far ${COMPLETED}" aria-hidden="true" data="Completed" id="${id}"></i>
    <p class="text ${Line}">${task}</p>
    <i class="far fa-trash-alt" aria-hidden="true" data="Delete" id="${id}"></i>
  </li>`;
  List.insertAdjacentHTML("beforeend", elemento);
}

function completedTask(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LIST[element.id].Completed = LIST[element.id].Completed ? false : true;
}

function deleteTask(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].Delete = true;
}

enterButton.addEventListener("click", () => {
  const task = input.value;
  if (task) {
    AddTask(task, Date.now(), false, false);
    LIST.push({
      nombre: task,
      id: id,
      Completed: false,
      Delete: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  input.value = "";
  id++;
});

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const task = input.value;
    if (task) {
      AddTask(task, Date.now(), false, false);
      LIST.push({
        nombre: task,
        id: id,
        Completed: false,
        Delete: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
    id++;
  }
});

List.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value; //getAttribute("data");
  if (elementData === "Completed") {
    completedTask(element);
  } else if (elementData === "Delete") {
    deleteTask(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  listLoading(LIST);
} else {
  LIST = [];
  id = 0;
}
function listLoading(DATA) {
  DATA.forEach(function (i) {
    AddTask(i.nombre, i.id, i.Completed, i.Delete);
  });
}
