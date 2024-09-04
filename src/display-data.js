// display-data.js
import rainIcon from "./icons/rain.png";
import { unit } from "./change-temp-unit";
import { format } from "date-fns";

import { convertToDaysOfWeek, convertTime } from "./time-conversion";
// import symbol from

export function displayDailyData(data) {
  // Convert days to days of the week, i.e. monday tuesday etc.
  const convertedDays = convertToDaysOfWeek(data);
  // Select all dayContainers
  const dayContainers = document.querySelectorAll(".day-container");
  // loop through all containers and replace the content with data
  for (let i = 0; i < data.length; i++) {
    dayContainers[i].querySelector(".day-icon").textContent = data[i].icon;
    dayContainers[i].querySelector(".day").textContent = convertedDays[i];
    dayContainers[i].querySelector(
      ".data"
    ).textContent = `${data[i].temp}${unit}`;
  }
}

export function displayHourlyData(extractedData, index) {
  // HTML for time container
  const timeContainerHTML = `
  <div class="time-container">
    <div class="time"></div>
    <div class="temp"></div>
    <div class="weather-icon"></div>
  </div>`;

  let numOfContainers;

  // Select the bottom mid container
  const botMidContainer = document.querySelector(".content-bot-mid");

  // Add 5 or 24 time-containers to the container depending on if its today or a future day
  if (index == 0) {
    numOfContainers = 5;
  } else {
    numOfContainers = 24;
  }
  botMidContainer.innerHTML = new Array(numOfContainers)
    .fill(timeContainerHTML)
    .join("");

  // Set the bot-mid container overflow to auto
  botMidContainer.style.overflow = "auto";

  // Select all time containers
  const timeContainers = document.querySelectorAll(".time-container");

  // Populate the containers

  // Display today
  // displayToday(extractedData[index], timeContainers);

  // Display future day
  displayFutureDay(extractedData, index, timeContainers)
}

function displayToday(day, timeContainers) {
  // Get the current time in 'hour am/pm format'
  const currentTime = format(new Date(), "h a");

  // Find the index of the current hour
  const startTimeIndex = day.hours.findIndex(
    (hour) => convertTime(hour.time) === currentTime
  );

  // Error handling
  if (startTimeIndex === -1) {
    console.log("Current time not found in the hourly data.");
    return; // Exit function if current time is not found
  }

  // Populate time containers
  // Loop through the nodelist of time containers
  for (let i = 0; i < timeContainers.length; i++) {
    // the first data displayed is the current time of the day
    const index = startTimeIndex + i;

    // If index is out of bounds of day.hours array
    if (index >= day.hours.length) {
      break; // stop the loop
    }

    const time = convertTime(day.hours[index].time);
    const iconSrc = day.hours[index].icon; // Assuming you get the correct icon source

    timeContainers[i].querySelector(".time").textContent = time;
    timeContainers[i].querySelector(".temp").textContent =
      day.hours[index].temp.toFixed(1) + unit;
    timeContainers[i].querySelector(
      ".weather-icon"
    ).innerHTML = `<img src="${rainIcon}" alt="weather icon" style="width:30%">`;
    // TODO Replace the icon containers with the correct Corresponsing icons
  }
}

function displayFutureDay(days, index, timeContainers) {
  // Populate time containrs
  for (let i = 0; i < timeContainers.length; i++) {
    const time = convertTime(days[index].hours[i].time);
    // const iconSrc = day.hours[index].icon; // Assuming you get the correct icon source

    timeContainers[i].querySelector(".time").textContent = time;
    timeContainers[i].querySelector(".temp").textContent =
      days[index].hours[i].temp.toFixed(1) + unit;
    timeContainers[i].querySelector(
      ".weather-icon"
    ).innerHTML = `<img src="${rainIcon}" alt="weather icon" style="width:30%">`;
  }
}
