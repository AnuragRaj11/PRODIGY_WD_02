const display = document.querySelector('.timing');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let startTime;
let elapsedTime = 0;
let timerInterval;

function formatTime(time) {

    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(time % 60)).padStart(2, '0');
    return `${hours} : ${minutes} : ${seconds}`;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        display.textContent = formatTime(elapsedTime);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00 : 00 : 00';
    elapsedTime = 0;
    lapsList.innerHTML = '';
    startButton.disabled = false;
    stopButton.disabled = true;
}

function lapTimer() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}


startButton.addEventListener('click', function () {
    startTimer();
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener('click', function () {
    stopTimer();
});

resetButton.addEventListener('click', function () {
    resetTimer();
});

lapButton.addEventListener('click', function () {
    lapTimer();
});
