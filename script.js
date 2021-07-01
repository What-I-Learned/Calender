//--date object
const date = new Date();
const year = date.getUTCFullYear();
const month = date.getUTCMonth();
const day = date.getUTCDate();

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

let dayObj = {
  id: day,
  //tasks:[],
  today: false,
  monthName: months[month],
  //dayName:String,
};

let taskObj = {
  time: Number,
  description: String,
};

function monthAndDay() {
  const monthContent = document.getElementById("header__month");
  const dayContent = document.getElementById("header__month__day");
  monthContent.innerText = months[month];
  dayContent.innerText = day.toString();
}

function calenderDays() {
  //const calenderDays = document.getElementById("schedule_items")
  let lenghtOftheMonth = new Date(year, month + 1, 0).getDate();
  console.log(lenghtOftheMonth);
  let daysOfTheMonth = [];
  for (let i = 0; i <= lenghtOftheMonth; i++) {
    daysOfTheMonth[i] = i;
  }
  return daysOfTheMonth;
}

//-- Make day object
function createDayObj(id, bool) {
  let newDay = Object.assign({}, dayObj);
  newDay.id = id;
  newDay.today = bool;
  //newDay.tasks = tasks,
  return newDay;
}

//-- Create

// -- do days of the month array
function fillDays() {
  let daysArray = calenderDays();
  createDayObj();
  let actualDaysObj = [];
  for (let dayIndex of daysArray) {
    let bool = dayIndex == day ? true : false;
    let newDay = createDayObj(daysArray[dayIndex], bool);
    actualDaysObj.push(newDay);
  }
  actualDaysObj.shift();
  console.log(actualDaysObj);
  return actualDaysObj;
}

// --append days
function appendDays() {
  let calenderDays = document.getElementById("calender__days");
  console.log(calenderDays);

  let days = fillDays();

  for (let d = 0; d < days.length; d++) {
    //-- main div
    const divNode = document.createElement("div");
    divNode.classList.add(`day`);
    divNode.classList.add(`day--${days[d].id}`);
    divNode.onclick = selectDay;

    //-- day text
    const h4 = document.createElement("h4");
    h4.classList.add("day--head");
    h4.textContent = days[d].id.toString();
    divNode.append(h4);

    //-- check if today
    if (days[d].today == true) {
      divNode.classList.add("today");
    }
    //-- append days
    calenderDays.appendChild(divNode);
  }
  console.log(...divsArray);
}

function selectDay(event) {
  //-- deselect the currenctly selected dayObj
  const currenctlySelectedDayNode = document.querySelector(".today");

  if (currenctlySelectedDayNode !== null)
    currenctlySelectedDayNode.classList.remove("today");

  //-- select day that has just been clicked
  const clickedDayNode = event.currentTarget;
  clickedDayNode.classList.add("today");
}

window.onload = function () {
  monthAndDay();
  //fillDays()
  appendDays();
};
