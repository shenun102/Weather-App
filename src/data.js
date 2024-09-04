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