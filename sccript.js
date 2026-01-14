let hour = 0;
let minute = 0;
let holdStart = 0;
let taps = 0;

const timeText = document.getElementById("time");
const status = document.getElementById("status");

const hourBtn = document.getElementById("hourBtn");
const minuteBtn = document.getElementById("minuteBtn");
const setBtn = document.getElementById("setBtn");

const hope = document.getElementById("hope");
const destiny = document.getElementById("destiny");
const sleep = document.getElementById("sleep");
const body = document.body;

// ---------- RANDOM HOUR/MINUTE WHEEL ----------
setInterval(() => {
    // Randomly rotate hour/minute regardless of button
    hour += Math.floor(Math.random()*3) -1; // -1,0,+1
    minute += Math.floor(Math.random()*5) -2; // -2..+2

    // Keep in bounds
    hour = (hour + 24) % 24;
    minute = (minute + 60) % 60;

    updateTime();

    // Random button shuffle
    [hourBtn, minuteBtn, setBtn].forEach(btn => {
        btn.style.left = Math.random()*50 + "px";
        btn.style.top = Math.random()*20 + "px";
    });

    // Random background flash
    body.style.background = `rgb(${Math.random()*255},0,${Math.random()*255})`;

}, 1000);

// ---------- BUTTON INTERACTIONS ----------
hourBtn.addEventListener("click", () => {
    // pretend user changes hour, but chaotic
    hour += Math.floor(Math.random()*3) -1;
    hour = (hour + 24) % 24;
    updateTime();
});

minuteBtn.addEventListener("click", () => {
    minute += Math.floor(Math.random()*5) -2;
    minute = (minute + 60) % 60;
    updateTime();
});

// ---------- LONG PRESS ----------
setBtn.addEventListener("touchstart", () => { holdStart = Date.now(); });
setBtn.addEventListener("touchend", () => {
    let holdTime = Date.now() - holdStart;
    if(holdTime > 2000 && holdTime < 7000){
        status.innerText = "Alarm accepted by fate… maybe.";
    } else {
        status.innerText = "Ritual failed. Who knows?";
    }
});

// ---------- RANDOM SLIDERS ----------
setInterval(() => {
    hope.value = Math.random()*100;
    destiny.value = Math.random()*100;
    sleep.value = Math.random()*100;
}, 500);

// ---------- TAP RITUAL ----------
document.addEventListener("click", () => {
    taps++;
    if(taps === 5){
        status.innerText = "Alarm dismissed… or is it?";
        taps = 0;
    }
});

// ---------- UPDATE TIME ----------
function updateTime(){
    timeText.innerText = `Hour: ${hour} | Minute: ${minute}`;
}
