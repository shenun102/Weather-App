// Classes

class Day {
  hours = [];
  constructor(
    datetime,
    icon,
    temp,
    tempMin,
    tempMax,
    description,
    windspeed,
    humidity,
    uvindex,
    precipprob
  ) {
    this.date = datetime;
    this.icon = icon;
    this.temp = temp.toFixed(1);
    this.tempMax = tempMax.toFixed(1);
    this.tempMin = tempMin.toFixed(1);
    this.description = description;
    this.windspeed = windspeed;
    this.humidity = humidity;
    this.uvindex = uvindex;
    this.precipprob = precipprob;
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

// Function to fetch data from API

export async function getWeatherData() {
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

// Function to extract the necessary data and create a class

export function newDailyWeather(data) {
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
      day.description,
      day.windspeed,
      day.humidity,
      day.uvindex,
      day.precipprob
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
