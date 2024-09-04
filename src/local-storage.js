// Function to extract weather data stored in localStorage

export function getStoredData() {
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