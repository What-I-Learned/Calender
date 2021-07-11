//--date object
const date = new Date();
const year = date.getUTCFullYear();
const month = date.getUTCMonth();
const day = date.getUTCDate();
const weekDay = date.getUTCDay();
const firstDay = new Date(year, month, 1).getDay();
console.log(weekDay);
console.log("hello", firstDay);

//--arrays
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

//-- Make day object
let dayObj = {
  id: day,
  tasks: [],
  monthName: months[month],
};

function createDayObj(id, bool) {
  let newDay = Object.assign({}, dayObj);
  newDay.id = id;
  newDay.today = bool;
  newDay.monthName = months[month];

  return newDay;
}

//-- check how many days in a month
function calenderDays() {
  let lenghtOftheMonth = new Date(year, month, 0).getDate();
  let daysOfTheMonth = [];
  for (let i = 0; i <= lenghtOftheMonth; i++) {
    daysOfTheMonth[i] = i;
  }
  console.log(daysOfTheMonth);
  return daysOfTheMonth;
}

//-- create day objects Array
function createDaysArray() {
  let daysAmountArray = calenderDays();
  for (let dayIndex of daysAmountArray) {
    let bool = dayIndex == day ? true : false;
    let tasks = [];
    let newDay = createDayObj(daysAmountArray[dayIndex], bool, tasks);
    daysAmountArray[dayIndex] = newDay;
  }
  return daysAmountArray;
}

let daysAndMeetings = createDaysArray();
console.log(daysAndMeetings);

//-- set UI date header
function setUiDate() {
  //-- select UI elements

  const uiMonth = document.querySelector(".title-month");
  const uiDay = document.querySelector(".title-day");
  const uiYear = document.querySelector(".title-year");

  //-- set content
  uiMonth.innerText = months[month];
  uiDay.innerText = day < 10 ? `0${day.toString()}` : day.toString();
  uiYear.innerText = year.toString();
}

//-- create days on the UI calender
function createDayUiContainers() {
  const calenderDays = document.getElementById("month-container");
  let dayObjContainer = daysAndMeetings;
  let divArr = [];
  let startOfTheMonth = firstDay;
  for (let d = 0; d <= dayObjContainer.length + firstDay; d++) {
    const divNode = document.createElement("div");
    divNode.classList.add(`day`);
    calenderDays.appendChild(divNode);

    //-- manage placeholders
    if (d < startOfTheMonth) {
      divNode.classList.add(`place-holder`);
    }

    //-- add days (maybe function)
    if (d >= startOfTheMonth) {
      divNode.innerText =
        dayObjContainer[d - startOfTheMonth].id < 10
          ? `0${dayObjContainer[d - startOfTheMonth].id}`
          : dayObjContainer[d - startOfTheMonth].id;
      //-- add tasks span if there are any tasks
    }

    //-- add class today
    if (
      d >= startOfTheMonth &&
      dayObjContainer[d - startOfTheMonth].today === true
    ) {
      divNode.classList.add(`today`);
      divNode.classList.add(`selected`);
    }
    divNode.onclick = selectADay;

    divArr.push(divNode);
  }
  return divArr;
}

///////////////////////////////////////////////////////////////////////
//-- select a dayObj
function getCurrentlySelectedDay() {
  // console.log(document.querySelector(".selected"));
  return document.querySelector(".selected");
}

function selectADay(event) {
  let currentlySelectedDayNode = getCurrentlySelectedDay();
  if (currentlySelectedDayNode != null) {
    currentlySelectedDayNode.classList.remove("selected");
  }

  const clickedDayNode = event.currentTarget;
  clickedDayNode.classList.add("selected");
}

//-- create schedule ui elements
function createTask() {
  const taskDescription = document.getElementById("create-task").value;
  const taskTime = document.getElementById("taskTime").value;

  //-- new task object

  let newTask = {
    time: taskTime,
    description: taskDescription,
  };

  taskDescription.placeholder = "write your task";

  //-- add schedule
  if (taskDescription !== "" && taskTime !== "") {
    let scheduleForTheDay = getSelectedDaySchedule();
    console.log(scheduleForTheDay);
    scheduleForTheDay.push(newTask);

    // refresh schedule for new tasks
  } else {
    console.log("working");
    taskDescription.placeholder = "you forgot to write your task";
  }
}
const addBtn = document.getElementById("add");
addBtn.addEventListener("click", createTask);

//-- check which one is selected day
function getSelectedDaySchedule() {
  let currentlySelectedDayNode = getCurrentlySelectedDay();
  let selectedDayId = +currentlySelectedDayNode.innerText;

  //-- get the array of days with id and schedule
  let scheduleOftheDay = daysAndMeetings[selectedDayId - 1].tasks;

  //-- no tasks?
  if (scheduleOftheDay.length == 0) {
    scheduleOftheDay = [];
    daysAndMeetings[selectedDayId].tasks = scheduleOftheDay;
  }

  console.log(scheduleOftheDay);
  console.log(daysAndMeetings);
  return scheduleOftheDay;
}

//-- display schedule for a selected dayObj
function displaySchedule() {
  //-- get schedule of selected day
  let schedule = getSelectedDaySchedule();
  console.log(schedule);

  //-- select container
  let taskList = document.getElementById("task-list");

  for (let task of schedule) {
    //-- create divs
    let taskDiv = document.createElement("div");
    let timeDiv = document.createElement("span");
    let descriptionDiv = document.createElement("p");

    //-- add classess
    taskDiv.classList.add("task");
    timeDiv.classList.add("time");
    descriptionDiv.classList.add("task-description");

    //-- div content
    timeDiv.innerText = task.time;
    descriptionDiv.innerText = task.description;

    //-- appendChild
    taskList.appendChild(taskDiv);
    taskDiv.appendChild(timeDiv);
    taskDiv.appendChild(descriptionDiv);
  }
}

//-- add to the meeting object
// let new
window.onload = function () {
  setUiDate();
  createDayUiContainers();
  displaySchedule();
};
