const apiKey = "dbff1f6d27f64b55a2d92927251707";

async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!location) {
    resultDiv.innerHTML = "<p>Please enter a location.</p>";
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    const data = await response.json();
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    resultDiv.innerHTML = `
      <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
      <img src="https:${icon}" alt="${condition}">
      <p><strong>${condition}</strong></p>
      <p>Temperature: ${tempC} °C</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
