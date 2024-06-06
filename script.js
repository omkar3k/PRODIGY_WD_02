// script.js

let startTime;
let updatedTime;
let difference;
let timerID;
let isRunning = false;
let lapCounter = 0;
let lapStartTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        lapStartTime = startTime;
        timerID = setInterval(updateDisplay, 100);
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor = '#f44336';
        isRunning = true;
    } else {
        clearInterval(timerID);
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#4CAF50';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerID);
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#4CAF50';
    display.textContent = '00:00:00.0';
    laps.innerHTML = '';
    isRunning = false;
    difference = 0;
    lapCounter = 0;
    lapStartTime = 0;
}

function lap() {
    if (isRunning) {
        const lapTime = calculateLapTime();
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${++lapCounter}: ${lapTime}`;
        lapElement.classList.add('lap');
        laps.appendChild(lapElement);
        lapStartTime = new Date().getTime();
        laps.scrollTop = laps.scrollHeight; // Auto-scroll to the latest lap
    }
}

function calculateLapTime() {
    const now = new Date().getTime();
    const lapDifference = now - lapStartTime;

    const hours = Math.floor(lapDifference / (1000 * 60 * 60));
    const minutes = Math.floor((lapDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((lapDifference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((lapDifference % 1000) / 100);

    return `${hours.toString().padStart(2, '0')}:` +
            `${minutes.toString().padStart(2, '0')}:` +
            `${seconds.toString().padStart(2, '0')}.` +
            `${milliseconds}`;
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 100);

    display.textContent =
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}.` +
        `${milliseconds}`;
    display.style.color = '#2196F3'; // Color change animation
    setTimeout(() => display.style.color = 'black', 100); // Revert color after animation
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Bookmark: nikam sujal
