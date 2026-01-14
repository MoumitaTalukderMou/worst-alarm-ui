let hour = 0;
let minute = 0;
let startY = 0;
let holdStart = 0;
let taps = 0;

const timeText = document.getElementById("time");
const status = document.getElementById("status");
const btn = document.getElementById("setBtn");
const hope = document.getElementById("hope");
const destiny = document.getElementById("destiny");
const sleep = document.getElementById("sleep");
const enableBtn = document.getElementById("enableMotionBtn");

// ---------- ENABLE MOTION ----------
enableBtn.addEventListener('click', () => {
    status.innerText = "Motion enabled! Tilt phone now.";

    window.addEventListener('deviceorientation', e => {
        let gamma = e.gamma;
        if(gamma > 3) hour = (hour + 1) % 24;
        if(gamma < -3) hour = (hour - 1 + 24) % 24;
        updateTime();
    });

    enableBtn.style.display = 'none'; // hide button after enabling
});

// ---------- SWIPE ----------
document.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
    let diff = startY - e.changedTouches[0].clientY;
    if(diff > 30) minute = (minute + 1) % 60;
    if(diff < -30) minute = (minute - 1 + 60) % 60;
    updateTime();
});

// ---------- LONG PRESS ----------
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

// ---------- UPDATE TIME ----------
function updateTime(){
    timeText.innerText = `Hour: ${hour} | Minute: ${minute}`;
}
