// ---------- GLOBAL STATE ----------
let hour = 0;
let minute = 0;
let startY = 0;
let holdStart = 0;
let taps = 0;

// ---------- ELEMENTS ----------
const timeText = document.getElementById("time");
const status = document.getElementById("status");
const btn = document.getElementById("setBtn");

const hope = document.getElementById("hope");
const destiny = document.getElementById("destiny");
const sleep = document.getElementById("sleep");

const enableBtn = document.getElementById("enableMotionBtn");

// ---------- iOS motion enable ----------
enableBtn.addEventListener("click", () => {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(response => {
        if(response === 'granted'){
          status.innerText = "Motion sensors enabled.";
          initOrientation();
        } else {
          status.innerText = "Permission denied.";
        }
      }).catch(console.error);
  } else {
    status.innerText = "Motion auto-enabled.";
    initOrientation();
  }
});

// ---------- ROTATE → HOUR ----------
function initOrientation(){
  window.addEventListener("deviceorientation", function(e){
    let gamma = e.gamma;

    if(gamma > 20) hour = (hour + 1) % 24;
    if(gamma < -20) hour = (hour - 1 + 24) % 24;

    updateTime();
  });
}

// ---------- SWIPE → MINUTE ----------
document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  let diff = startY - e.changedTouches[0].clientY;

  if(diff > 50) minute = (minute + 1) % 60;
  if(diff < -50) minute = (minute - 1 + 60) % 60;

  updateTime();
});

// ---------- LONG PRESS → SET ----------
btn.addEventListener("touchstart", () => {
  holdStart = Date.now();
});

btn.addEventListener("touchend", () => {
  let holdTime = Date.now() - holdStart;

  if(holdTime > 3000 && holdTime < 7000){
    status.innerText = "Alarm accepted by fate.";
  } else {
    status.innerText = "Ritual failed. Try again.";
  }
});

// ---------- FATE SLIDERS ----------
setInterval(() => {
  hope.value = Math.random() * 100;
  destiny.value = Math.random() * 100;
  sleep.value = Math.random() * 100;
}, 1000);

// ---------- TAP RITUAL ----------
document.addEventListener("click", () => {
  taps++;
  if(taps === 7){
    status.innerText = "Alarm dismissed. Or is it?";
    taps = 0;
  }
});

// ---------- HELPER ----------
function updateTime(){
  timeText.innerText = `Hour: ${hour} | Minute: ${minute}`;
}
