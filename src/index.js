import "./styles.css";
import { format, add, parse } from "date-fns";
console.log("Hello");

const searchBar = document.querySelector("#search-bar");
const date1 = format(new Date(), "yyyy-MM-dd");
const date2 = format(add(date1, { days: 7 }), "yyyy-MM-dd");
const symbol = `°C`;

// yyyy-MM-dd format
// const date1 = "2024-09-02";
// const date2 = "2024-09-09";

class Location {
  constructor(data) {
    this.location = data.resolvedAddress;
    this.days = data.days;
  }
}

class Weather {
  constructor(data) {
    this.icon = data.days.icon;
  }
}

// searchBar.addEventListener("keydown"
document.addEventListener("DOMContentLoaded", async function (e) {
  // Check if the key pressed is 'Enter'
  // if (!(e.key === "Enter")) return;
  // console.log(searchBar.value);
  // const weatherData = await getWeatherData();
  // console.log(weatherData);

  // // Check if data was returned successfully
  // if (weatherData) {
  //   console.log("Weather Data:", weatherData);

  //   // Store the weather data in localStorage
  //   localStorage.setItem("weatherData", JSON.stringify(weatherData));
  //   console.log("Weather data stored in localStorage.");
  // } else {
  //   console.log("Failed to retrieve weather data.");
  // }

  const storedWeatherData = getStoredData();

  // Process the data
  const extractedData = newDailyWeather(storedWeatherData);
  console.log("This is the data:", extractedData);
  // Display daily data
  displayDailyData(extractedData);
  displayHourlyData(extractedData[0]);
});

async function getWeatherData() {
  try {
    const search = searchBar.value;

    const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/${date1}/${date2}?key=LD2BL6LAZPTF26LHHMWHG3RY6`;

    console.log(api);
    // fetch response
    const response = await fetch(api, { mode: "cors" });

    // Check if reponse is ok
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const data = await response.json();
    console.log("Hello", data);
    // Only return the necessary data
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation.", error);
    return null;
  }
}

// Functions to handle weather data

// Function to extract weather data stored in localStorage

function getStoredData() {
  const storedData = localStorage.getItem("weatherData");

  // Check if data was found
  if (storedData) {
    const weatherData = JSON.parse(storedData);
    console.log("Retrieved weather data:", weatherData);

    return weatherData;
  } else {
    console.log("No weather data found");
    return null;
  }
}

// Classes

class Day {
  hours = [];
  constructor(datetime, icon, temp, tempMin, tempMax, description) {
    this.date = datetime;
    this.icon = icon;
    this.temp = temp.toFixed(1);
    this.tempMax = tempMax.toFixed(1);
    this.tempMin = tempMin.toFixed(1);
    this.description = description;
  }

  addHour(hour) {
    this.hours.push(hour);
  }
}

class Hour {
  constructor(time, icon, temp) {
    this.time = time;
    this.temp = temp;
    this.icon = icon;
  }
}

// Function to extract the necessary data and create a class

function newDailyWeather(data) {
  const daysData = data.days;
  const days = [];

  // Add necessary data for each day
  daysData.forEach((day) => {
    const newDay = new Day(
      day.datetime,
      day.icon,
      day.temp,
      day.tempmin,
      day.tempmax,
      day.description
    );

    days.push(newDay);

    // Add Hourly date to each day
    day.hours.forEach((hour) => {
      const newHour = new Hour(hour.datetime, hour.icon, hour.temp);
      newDay.addHour(newHour);
    });
  });

  return days;
}

// DOM Handling

// Display daily data

function displayDailyData(data) {
  console.log("doing the daily data", data);
  // Convert days to days of the week
  const convertedDays = convertToDaysOfWeek(data);
  const dayContainers = document.querySelectorAll(".day-container");
  for (let i = 0; i < data.length - 1; i++) {
    dayContainers[i].querySelector(".day-icon").textContent = data[i].icon;
    dayContainers[i].querySelector(".day").textContent = convertedDays[i];
    dayContainers[i].querySelector(
      ".data"
    ).textContent = `${data[i].temp}${symbol}`;
  }
}

// Display hourly data

function displayHourlyData(day) {
  console.log("Doing the hourly data");
  console.log(day.date);
  console.log(day.hours);
  const timeContainers = document.querySelectorAll(".time-container");
  const currentTime = format(new Date(), "h a");
  console.log(currentTime);
  if (day.date === date1) {
    console.log(`Oh Thats Today`);
    // Find the object in hours property array corresponding to current hour
    const startTime = day.hours.findIndex(
      (hour) => convertTime(hour.time) === currentTime
    );

    console.log("StartTime", startTime);
    for (let i = 0; i < 10; i++) {
      console.log(startTime + i);
      if (startTime + i > 23) {
        timeContainers[i].querySelector(".time").textContent = "";
        timeContainers[i].querySelector(".temp").textContent = "";
        timeContainers[i].querySelector(".weather-icon").textContent = "";
        break;
      }

      const time = convertTime(day.hours[i + startTime].time);
      console.log(time, day.hours[i + startTime].icon);

      timeContainers[i].querySelector(".time").textContent = time;
      timeContainers[i].querySelector(".temp").textContent =
        day.hours[i + startTime].temp.toFixed(1);
      timeContainers[i].querySelector(".weather-icon").textContent =
        day.hours[i + startTime].icon;
    }
  }
}

function convertToDaysOfWeek(data) {
  const dateStrings = [];
  data.forEach((day) => dateStrings.push(day.date));
  const daysOfWeek = dateStrings.map((dateString) => {
    const date = parse(dateString, "yyyy-MM-dd", new Date());

    return format(date, "EEEE");
  });

  return daysOfWeek;
}

function convertTime(timeStr) {
  // Parse the time string (HH:MM:SS) into a Date object
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);

  // Create a Date object with the time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  // Format the time in 'h a' format (e.g., 5 pm, 4 pm)
  return format(date, "h a");
}
