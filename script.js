function updateCityTime(cityTimezone) {
  const timeDisplay = document.getElementById("time-display");
  const cityName = document.getElementById("city-name");

  if (!cityTimezone) {
    timeDisplay.innerHTML = "Please select a city.";
    return;
  }

  let time;
  if (cityTimezone === "current") {
    time = moment().tz(moment.tz.guess());
    cityName.innerHTML = "Your Current Location";
  } else {
    time = moment().tz(cityTimezone);
    cityName.innerHTML = cityTimezone.replace("/", " ").replace("_", " ");
  }

  timeDisplay.innerHTML = time.format("dddd, MMMM D, YYYY h:mm:ss A");
}

document.getElementById("city-select").addEventListener("change", function () {
  const cityTimezone = this.value;
  updateCityTime(cityTimezone);
});

// Initialize with a default city
updateCityTime("America/Los_Angeles");

setInterval(() => {
  const selectedTimezone = document.getElementById("city-select").value;
  updateCityTime(selectedTimezone);
}, 1000);
