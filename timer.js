let timer;
let startTime;
let isTimerRunning = false;

function startTimer() {
  if (!isTimerRunning) {
    startTime = Date.now();
    isTimerRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(timer);
    isTimerRunning = false;
  }
}

function resetTimer() {
  stopTimer();
  document.getElementById("timerDisplay").innerText = "00:00";
}

function updateTimer() {
  const currentTime = Date.now();
  const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  document.getElementById("timerDisplay").innerText = formattedTime;
}

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-border-red";
}

//Alarm clock
let alarmTimeInput = document.getElementById("alarmInput");
let alarmDisplay = document.getElementById("alarmTime");
let alarmInterval;
let alarmSound = new Audio(
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
);

function setAlarm() {
  let alarmTime = alarmTimeInput.value;
  if (!alarmTime) {
    alert("Please set the alarm time.");
    return;
  }

  alarmDisplay.innerText = alarmTime;

  let currentTime = new Date();
  let [hours, minutes] = alarmTime.split(":");
  let alarmDateTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    hours,
    minutes,
    0,
    0
  );
  let timeDifference = alarmDateTime - currentTime;

  if (timeDifference <= 0) {
    alert("Please choose a future time for the alarm.");
    return;
  }

  alarmInterval = setTimeout(() => {
    playAlarm();
  }, timeDifference);
}

function stopAlarm() {
  clearTimeout(alarmInterval);
  alarmSound.pause();
  alarmDisplay.innerText = "00:00";
}

function playAlarm() {
  alarmSound.play();
  alarmDisplay.innerText = "00:00";
}

//Time Zones
function updateClock(timeZone, elementId) {
  const now = new Date();
  const options = {
    timeZone: timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedTime = now.toLocaleTimeString("en-US", options);
  document.getElementById(elementId).textContent = formattedTime;
}

function updateAllClocks() {
  updateClock("Europe/Zurich", "zurich");
  updateClock("America/New_York", "new-york");
  updateClock("Asia/Dubai", "dubai");
  updateClock("Asia/Karachi", "islamabad");
}

// Initial update
updateAllClocks();

// Update every second
setInterval(updateAllClocks, 1000);
