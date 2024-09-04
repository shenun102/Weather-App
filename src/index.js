import "./styles.css";

import rainIcon from "./icons/rain.png";
import { format, add, parse } from "date-fns";
import { displayDailyData, displayHourlyData } from "./display-data";
import { unit, changeTempUnits } from "./change-temp-unit";
import { convertTime } from "./time-conversion";
import { getStoredData } from "./local-storage";
import { newDailyWeather } from "./data";
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
  // displayToday(extractedData[0]);
  displayHourlyData(extractedData, 5)
  console.log(extractedData);
  // displayHourlyData(extractedData, 1);
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

// Add event listener for when user selects one of the days

const dayContainers = document.querySelectorAll(".day-container");
dayContainers.forEach((container) =>
  container.addEventListener("click", handleContainerClick)
);
function handleContainerClick(e) {
  // Makes sure that no matter which target is clicked as long as its in the contianer it will point to container
  const dayContainer = e.target.closest(".day-container");

  // Highlight container
  dayContainers.forEach((container) => container.classList.remove("selected"));
  dayContainer.classList.add("selected");

  // get the data attribute and set it as the index
  const index = dayContainer.dataset.dindex;

  // Get the data and use index  redisplay current data
  const storedWeatherData = getStoredData();
  if (!storedWeatherData) {
    console.log("No data?");
    return;
  }

  const extractedData = newDailyWeather(storedWeatherData);
  if (index == "0") {
    console.log("Heeeeeeee");
    displayToday(extractedData[0]);
  } else {
    console.log("Hoooooooo");
    displayHourlyData(extractedData, index);
  }
}

// Functions to handle weather data