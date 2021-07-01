
//--date object
const date = new Date()
const year = date.getUTCFullYear()
const month = date.getUTCMonth()
const day = date.getUTCDate()

//--arrays
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
let days = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

let dayObj = {
    id:day,
    //tasks:[],
    today:false,
    monthName:months[month],
    //dayName:String,
}


function monthAndDay(){
    const monthContent = document.getElementById("header__month")
    const dayContent = document.getElementById("header__month__day")
    monthContent.innerText = months[month]
    dayContent.innerText =  day.toString()
}

function calenderDays(){
    //const calenderDays = document.getElementById("schedule_items")
    let lenghtOftheMonth = new Date(year,month+1,0).getDate();
    console.log(lenghtOftheMonth);
    let daysOfTheMonth=[]
    for(let i=0; i<=lenghtOftheMonth;i++){
        daysOfTheMonth[i]=i;
    }
    return daysOfTheMonth
}

//-- Make day object

 function createDayObj(id,bool){  
    let newDay = Object.assign({},dayObj)
    newDay.id = id
    newDay.today = bool
    //newDay.tasks = tasks,
    return newDay
 }
 
 // -- do days of the month array
 function fillDays(){
    let daysArray = calenderDays();
    createDayObj()
    let actualDaysObj = []
    for(let dayIndex of daysArray){
        let bool = dayIndex == day?true:false
        let newDay = createDayObj(daysArray[dayIndex],bool)
        actualDaysObj.push(newDay)
    }
    actualDaysObj.shift();
    console.log(actualDaysObj);
    return actualDaysObj
 }



 // --append days
 function appendDays(){
    let calenderDays = document.getElementById("calender__days")
    console.log(calenderDays);
   
    
    let days = fillDays()
    
    let divsArray =[]

    for(let d=0;d<days.length;d++){
        const div = document.createElement('div') 
        divsArray[d] = div
        div.classList.add(`day`)
        div.classList.add(`day--${days[d].id}`)  

        const h4 = document.createElement('h4')
        h4.classList.add('day--head')
        h4.textContent = (days[d].id).toString() 

        div.append(h4)

        if(days[d].today==true){
            divsArray[d].classList.add('today')
        } 
    }

    for(let div of divsArray){


        calenderDays.append(div)
    }
    
    console.log(...divsArray);
    return divsArray
    //calenderDays.append(...divsArray)

 }





window.onload=function(){
    monthAndDay()
    calenderDays()
    //fillDays()
    appendDays()

}
