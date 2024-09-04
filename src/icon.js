import snowIcon from "./icons/snow.png";
import rainIcon from "./icons/rain.png";
import fogIcon from "./icons/fog.png";
import windIcon from "./icons/windy.png";
import cloudDayIcon from "./icons/cloudy.png";
import cloudNightIcon from "./icons/cloudy-night.png";
import clearDayIcon from "./icons/clear-day.png";
import clearNightIcon from "./icons/clear-night.png";

export function displayIcon(icon) {
  switch (icon) {
    case "snow":
      return snowIcon;

    case "rain":
      return rainIcon;

    case "fog":
      return fogIcon;

    case "wind":
      return windIcon;

    case "cloudy":
      return cloudDayIcon;

    case "partly-cloudy-day":
      return cloudDayIcon;

    case "partly-cloudy-night":
      return cloudNightIcon;

    case "clear-day":
      return clearDayIcon;

    case "clear-night":
      return clearNightIcon;

    default:
      console.log("Unknown weather condition!");
      // Add logic for unknown conditions
      break;
  }
}
