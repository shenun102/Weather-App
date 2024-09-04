// select-day.js

import { dayContainers, extractedData } from ".";
import { displayHourlyData } from "./display-data";

export function handleContainerClick(e) {
  // Makes sure that no matter which target is clicked as long as its in the contianer it will point to container
  const dayContainer = e.target.closest(".day-container");

  // Highlight container
  dayContainers.forEach((container) => container.classList.remove("selected"));
  dayContainer.classList.add("selected");

  // get the data attribute and set it as the index
  const index = dayContainer.dataset.dindex;
  displayHourlyData(extractedData, index);
}
