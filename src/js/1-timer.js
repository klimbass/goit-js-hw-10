import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let count;
let timer = {};
let intervalNumber;
const input = document.querySelector('input[type="text"]');
const buttonStart = document.querySelector('button[data-start]');
const daysHtml = document.querySelector('span[data-days]');
const hoursHtml = document.querySelector('span[data-hours]');
const minutesHtml = document.querySelector('span[data-minutes]');
const secondsHtml = document.querySelector('span[data-seconds]');

function buttonStartDisabled() {
  buttonStart.disabled = true;
  buttonStart.style.color = 'rgb(150, 149, 149)';
  buttonStart.style.borderColor = 'rgb(189, 186, 186)';
  buttonStart.removeEventListener('click', timerToGo);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setTime() {
  daysHtml.textContent = timer.days.toString().padStart(2, '0');
  hoursHtml.textContent = timer.hours.toString().padStart(2, '0');
  minutesHtml.textContent = timer.minutes.toString().padStart(2, '0');
  secondsHtml.textContent = timer.seconds.toString().padStart(2, '0');
}

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate > Date.now()) {
      buttonStart.disabled = false;
      buttonStart.style.color = '#000';
      buttonStart.style.borderColor = '#000';
      buttonStart.addEventListener('click', timerToGo);
    } else {
      iziToast.error({
        class: 'iziToast',
        messageColor: '#fafafa',
        position: 'topRight',
        transitionIn: 'fadeIn',
        animateInside: false,
        progressBar: false,
        close: false,
        icon: ' ',
        backgroundColor: '#F04D2E',
        message: 'Please choose a date in the future',
      });
      buttonStartDisabled();
    }
  },
});

function timerToGo() {
  buttonStartDisabled();
  input.disabled = true;
  count = userSelectedDate - Date.now();
  timer = convertMs(count);
  setTime();
  intervalNumber = setInterval(timerCounter, 1000, count);
}

function timerCounter() {
  if (count > 999) {
    count -= 1000;
    timer = convertMs(count);
    setTime();
  } else {
    console.log('Time is over');
    clearInterval(intervalNumber);
  }
}
