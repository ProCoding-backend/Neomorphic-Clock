const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

const digitalHour = document.getElementById('digital-hour');
const digitalMinute = document.getElementById('digital-minute');
const digitalSecond = document.getElementById('digital-second');
const digitalAmPm = document.getElementById('digital-ampm');

const redDot = document.querySelector('.red-dot');
const yellowDot = document.querySelector('.yellow-dot');
const greenDot = document.querySelector('.green-dot');

const timeToggle = document.getElementById('time-toggle');
let is24Hour = false; // default 12h

timeToggle.addEventListener('change', () => {
  is24Hour = timeToggle.checked;
  setTime();
});

function setTime() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // Analog
  const secondsDegrees = (seconds / 60) * 360;
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

  secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;

  // Dots
  redDot.style.transform = `rotate(${hoursDegrees - 90}deg) translateX(50px)`;
  yellowDot.style.transform = `rotate(${minutesDegrees - 90}deg) translateX(70px)`;
  greenDot.style.transform = `rotate(${secondsDegrees - 90}deg) translateX(90px)`;

  // Digital
  let displayHour = hours;
  let ampm = "";

  if (is24Hour) {
    displayHour = hours;
    ampm = "";
  } else {
    ampm = hours >= 12 ? "PM" : "AM";
    displayHour = hours % 12;
    displayHour = displayHour ? displayHour : 12;
  }

  const format = (t) => (t < 10 ? "0" + t : t);

  digitalHour.textContent = format(displayHour);
  digitalMinute.textContent = format(minutes);
  digitalSecond.textContent = format(seconds);
  digitalAmPm.textContent = ampm;
}

setInterval(setTime, 1000);
setTime();
