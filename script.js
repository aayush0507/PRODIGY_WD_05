let weather = {
    apiKey: "aba6ff9d6de967d5eac6fd79114693cc",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.getElementById("weatherInfo").innerHTML = `
            <h2>${name}</h2>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            <p>${description}</p>
            <p>Temperature: ${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${speed} m/s</p>
        `;
    },
    search: function () {
        this.fetchWeather(document.getElementById("locationInput").value);
    }
};

document.getElementById("searchLocation").addEventListener("click", function () {
    weather.search();
});

document.getElementById("locationInput").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

document.getElementById("getLocation").addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather.apiKey}`
            )
            .then((response) => response.json())
            .then((data) => weather.displayWeather(data));
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
