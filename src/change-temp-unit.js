import { tempUnitBtn } from ".";
import { getStoredData } from "./local-storage";
import { newDailyWeather } from "./data";
import { displayDailyData, displayHourlyData } from "./display-data";

export let unit = `°F`;

export function changeTempUnits(e) {
  unit = unit === `°F` ? `°C` : `°F`;
  tempUnitBtn.textContent =
    tempUnitBtn.textContent === `Fahrenheit` ? `Celcius` : `Fahrenheit`;

  const currentContainer = document.querySelector(".selected");
  const index = currentContainer.dataset.dindex;
  // Redisplay current data
  const storedWeatherData = getStoredData();
  if (storedWeatherData) {
    const extractedData = newDailyWeather(storedWeatherData);
    displayDailyData(extractedData);
    // Display the current day?
    displayHourlyData(extractedData, index);
  }
}

export function toCelcius(temperature, unit) {
  const celcius = ((temperature - 32) / 1.8).toFixed(1) + unit;
  return celcius;
}
