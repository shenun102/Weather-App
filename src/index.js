import "./styles.css";

import { getWeatherData } from "./data";
import { format, add, parse } from "date-fns";
import { displayDailyData, displayHourlyData } from "./display-data";
import { unit, changeTempUnits } from "./change-temp-unit";
import { convertTime } from "./time-conversion";
import { getStoredData } from "./local-storage";
import { newDailyWeather } from "./data";
import { handleContainerClick } from "./select-day";
console.log("Hello");

const searchBar = document.querySelector("#search-bar");
const date1 = format(new Date(), "yyyy-MM-dd");
const date2 = format(add(date1, { days: 6 }), "yyyy-MM-dd");


// yyyy-MM-dd format
// const date1 = "2024-09-02";
// const date2 = "2024-09-09";

// Add event listener for changing the units from celcius to fahrenheit or vice versa
export const tempUnitBtn = document.querySelector(".temp-unit-btn");
tempUnitBtn.addEventListener("click", changeTempUnits);



// Add event listener for when the user searches

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
  displayHourlyData(extractedData, 0)
  console.log(extractedData);
  
});


// Add event listener for when user selects one of the days

export const dayContainers = document.querySelectorAll(".day-container");
dayContainers.forEach((container) =>
  container.addEventListener("click", handleContainerClick)
);
