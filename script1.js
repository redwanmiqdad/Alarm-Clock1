const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMen = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false,
ringtone = new Audio("./files/aa.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option =`<option value="${i}">${i}</option>`;
    selectMen[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option =`<option value="${i}">${i}</option>`;
    selectMen[1].firstElementChild.insertAdjacentHTML("afterend", option);
} 

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
 selectMen[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    // Getting hour, minutes, and seconds
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";
  
    if (h >= 12) {
      h = h - 12;
      ampm = "PM";
    }
    // If hour value is 0, set it to 12
    h = h == 0 ? h = 12 : h;
    // Adding leading zero before hour, minute, and second if they are less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime == `${h}:${m} ${ampm}` ) {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm() {
    if(isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }


    let time = `${selectMen[0].value}:${selectMen[1].value} ${selectMen[2].value}`;

    if(time.includes("Hour") || time.includes("Minutr") || time.includes("AM/PM")) {
       return alert("please, select a valid time to set Alarm");
   }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
} 

setAlarmBtn.addEventListener("click", setAlarm);


