import { tempUnitBtn } from ".";
import { getStoredData } from "./local-storage";
import { newDailyWeather } from "./data";
import { displayDailyData, displayHourlyData } from "./display-data";
export let unit = `°F`;

export function changeTempUnits(e) {
  console.log(e.target, unit);
  unit = unit === `°F` ? `°C` : `°F`;
  tempUnitBtn.textContent =
    tempUnitBtn.textContent === `Fahrenheit` ? `Celcius` : `Fahrenheit`;
  console.log(unit);

  // Redisplay current data
  const storedWeatherData = getStoredData();
  if (storedWeatherData) {
    const extractedData = newDailyWeather(storedWeatherData);
    displayDailyData(extractedData);
    // Display the current day?
    displayHourlyData(extractedData, 1);
  }
}
