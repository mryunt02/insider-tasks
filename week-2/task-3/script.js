const timeInput = document.getElementById("timeInput");
const timerDisplay = document.getElementById("timerDisplay");
const countdownElement = document.getElementById("countdown");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const messageElement = document.getElementById("message");

let currentTime = 0;
let intervalId = null;
let isRunning = false;
let isPaused = false;

window.addEventListener("load", function () {
  updateDisplay();
});

timeInput.addEventListener("input", function () {
  if (!isRunning) {
    updateDisplay();
  }
});

startBtn.addEventListener("click", function () {
  if (!isRunning && !isPaused) {
    const inputValue = parseInt(timeInput.value);
    if (inputValue > 0) {
      currentTime = inputValue;
      startCountdown();
    }
  } else if (isRunning) {
    pauseCountdown();
  } else if (isPaused) {
    resumeCountdown();
  }
});

resetBtn.addEventListener("click", function () {
  resetCountdown();
});

function startCountdown() {
  isRunning = true;
  isPaused = false;
  startBtn.textContent = "Durdur";
  timeInput.disabled = true;
  timerDisplay.classList.add("running");
  timerDisplay.classList.remove("finished");
  messageElement.textContent = "";

  updateDisplay();

  intervalId = setInterval(function () {
    currentTime--;
    updateDisplay();

    if (currentTime <= 0) {
      finishCountdown();
    }
  }, 1000);
}

function pauseCountdown() {
  isRunning = false;
  isPaused = true;
  clearInterval(intervalId);
  startBtn.textContent = "Devam Et";
  timerDisplay.classList.remove("running");
}

function resumeCountdown() {
  isRunning = true;
  isPaused = false;
  startBtn.textContent = "Durdur";
  timerDisplay.classList.add("running");

  intervalId = setInterval(function () {
    currentTime--;
    updateDisplay();

    if (currentTime <= 0) {
      finishCountdown();
    }
  }, 1000);
}

function resetCountdown() {
  isRunning = false;
  isPaused = false;
  clearInterval(intervalId);
  currentTime = 0;
  startBtn.textContent = "Başlat";
  timeInput.disabled = false;
  timerDisplay.classList.remove("running", "finished");
  messageElement.textContent = "";
  updateDisplay();
}

function finishCountdown() {
  isRunning = false;
  isPaused = false;
  clearInterval(intervalId);
  currentTime = 0;
  startBtn.textContent = "Başlat";
  timeInput.disabled = false;
  timerDisplay.classList.remove("running");
  timerDisplay.classList.add("finished");
  updateDisplay();

  messageElement.textContent = "Süre doldu!";
}

function updateDisplay() {
  if (currentTime > 0) {
    countdownElement.textContent = currentTime;
  } else if (isRunning || isPaused) {
    countdownElement.textContent = currentTime;
  } else {
    const inputValue = parseInt(timeInput.value) || 0;
    countdownElement.textContent = inputValue;
  }
}
