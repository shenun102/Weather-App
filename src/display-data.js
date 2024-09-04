// display-data.js

import { unit, toCelcius } from "./change-temp-unit";
import { format } from "date-fns";
import { convertToDaysOfWeek, convertTime } from "./time-conversion";
import { displayIcon } from "./icon";

// Function to display daily data

export function displayDailyData(data) {
  // Convert days to days of the week, i.e. monday tuesday etc.
  const convertedDays = convertToDaysOfWeek(data);
  // Select all dayContainers
  const dayContainers = document.querySelectorAll(".day-container");
  // loop through all containers and replace the content with data
  for (let i = 0; i < data.length; i++) {
    dayContainers[i].querySelector(
      ".day-icon"
    ).innerHTML = `<img src="${displayIcon(
      data[i].icon
    )}" alt="weather icon" style="width:30%">`;
    dayContainers[i].querySelector(".day").textContent = convertedDays[i];
    dayContainers[i].querySelector(".data").textContent =
      unit == "°F" ? data[i].temp + unit : toCelcius(data[i].temp, unit);
  }
}

// Function to display hourly data

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
    const timeNow = format(new Date(), "H");
    // Dynamically set the number of containers for today based on how many hours are left
    numOfContainers = 24 - timeNow;
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
  if (index == "0") {
    displayToday(extractedData[index], timeContainers);
    // Display today
  }
  // Display future day
  else displayFutureDay(extractedData, index, timeContainers);
}

// Helper function to display data for today

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

  displayOtherData(day, true, startTimeIndex);

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
      unit == "°F"
        ? day.hours[index].temp.toFixed(1) + unit
        : toCelcius(day.hours[index].temp.toFixed(1), unit);
    timeContainers[i].querySelector(
      ".weather-icon"
    ).innerHTML = `<img src="${displayIcon(
      day.icon
    )}" alt="weather icon" style="width:30%">`;
    // TODO Replace the icon containers with the correct Corresponsing icons
  }
}

// Helper function to display data for future days other than today

function displayFutureDay(days, index, timeContainers) {
  // display other data
  displayOtherData(days[index]);
  // Populate time containrs
  for (let i = 0; i < timeContainers.length; i++) {
    const time = convertTime(days[index].hours[i].time);
    // const iconSrc = day.hours[index].icon; // Assuming you get the correct icon source

    timeContainers[i].querySelector(".time").textContent = time;
    timeContainers[i].querySelector(".temp").textContent =
      unit == "°F"
        ? days[index].hours[i].temp.toFixed(1) + unit
        : toCelcius(days[index].hours[i].temp.toFixed(1), unit);
    timeContainers[i].querySelector(
      ".weather-icon"
    ).innerHTML = `<img src="${displayIcon(
      days[index].icon
    )}" alt="weather icon" style="width:30%">`;
  }
}

// Helper function to display other miscallaneous data

function displayOtherData(day, isToday, currentTimeIndex) {
  const contentTop = document.querySelector(".content-top");
  const location = document.querySelector(".location");
  const temperature = document.querySelector(".temperature");
  const description = document.querySelector(".description");
  // location.textContent = ?

  if (isToday) {
    temperature.textContent =
      unit == `°F`
        ? `${parseFloat(day.hours[currentTimeIndex].temp)}${unit}`
        : toCelcius(parseFloat(day.hours[currentTimeIndex].temp), unit);
  } else
    temperature.textContent =
      unit == `°F`
        ? `${parseFloat(day.temp).toFixed(1)} ${unit}`
        : toCelcius(parseFloat(day.temp).toFixed(1), unit);

  description.textContent = day.description;

  // Bot right data
  const botRightContainer = document.querySelector(".content-bot-right");
  document.querySelector(
    ".wind"
  ).textContent = `Wind Speed: ${day.windspeed}km/s`;
  document.querySelector(
    ".humidity"
  ).textContent = `Humidity: ${day.humidity}%`;
  document.querySelector(".uv").textContent = `UV-Index: ${day.uvindex}`;
  document.querySelector(
    ".rain-percent"
  ).textContent = `Rain: ${day.precipprob}%`;
}
