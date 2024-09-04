import "./styles.css";

import { getWeatherData } from "./data";
import { format, add, parse } from "date-fns";
import { displayDailyData, displayHourlyData } from "./display-data";
import { unit, changeTempUnits } from "./change-temp-unit";
import { getStoredData } from "./local-storage";
import { newDailyWeather } from "./data";
import { handleContainerClick } from "./select-day";

export const searchBar = document.querySelector("#search-bar");

// yyyy-MM-dd format
// const date1 = "2024-09-02";
// const date2 = "2024-09-09";
export let extractedData;
// Add event listener for changing the units from celcius to fahrenheit or vice versa
export const tempUnitBtn = document.querySelector(".temp-unit-btn");
tempUnitBtn.addEventListener("click", changeTempUnits);

// Add event listener for when the user searches

searchBar.addEventListener("keydown", async function (e) {
  // Check if the key pressed is 'Enter'
  if (!(e.key === "Enter")) return;
  if (searchBar.value === "") return
  console.log(searchBar.value);
  const weatherData = await getWeatherData();
  console.log(weatherData);

  // Check if data was returned successfully
  if (weatherData) {
    console.log("Weather Data:", weatherData);
  } else {
    console.log("Failed to retrieve weather data.");
    return
  }


  // Process the data
  document.querySelector(".location").textContent = weatherData.resolvedAddress;
  extractedData = newDailyWeather(weatherData);

  console.log("This is the data:", extractedData);
  // Display daily data
  displayDailyData(extractedData);
  displayHourlyData(extractedData, 0);
  console.log(extractedData);
});

// Add event listener for when user selects one of the days

export const dayContainers = document.querySelectorAll(".day-container");
dayContainers.forEach((container) =>
  container.addEventListener("click", handleContainerClick)
);
