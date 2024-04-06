import React, { useState } from "react";
import "./Weather.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  //State holds the user input and weather data returned by the API call
  const [city, setCity] = useState("");

  // To store all of our API calls in one place
  const [weather, setWeather] = useState();

  // to handle error messages if there is an issue with API request
  const [error, setError] = useState("");

  //API KEY
  const API_KEY = "6d0e0f9d517510961cfce0cc42caa9c3";

  //API URL to fetch weather data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  //Function that handle the form submission (onChange)
  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  // Function to make an HTTP API request when the submit button is clicked
  const fetchData = async () => {
    try {
      // make a GET request on the url using fetch function
      const response = await fetch(url);
      // converting the response to JSON formate
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        console.log(data);
        setError("");
      } else {
        setError("No data found! please enter a valid city name.");
      }
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={changeHandler}
          placeholder="Enter your city name.."
        />
        <button onClick={() => fetchData()}>
          <FaSearch />
        </button>
      </div>
      {/* Displaying error message if anyone type wrong city name */}
      {error && <p className="errorMessage">{error}</p>}
      {/* Displaying the weather details if weather object has properties */}
      {weather && weather.weather && (
        <div className="content">
          <div className="weatherImage">
            {/* Weather image will be displayed based on the condition */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weatherImage"
            />
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>
          <div className="weatherTemp">
            <h3>
              {weather.main.temp}
              <span>&deg;C</span>
            </h3>
          </div>
          <div className="weatherCity">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weather.name},{weather.sys.country}
            </p>
          </div>
          <div className="weatherStats">
            <div className="wind">
              <div className="windIcon">
                <FaWind />
              </div>
              <h3 className="windSpeed">
                {weather.wind.speed}
                <span>Km/h</span>
              </h3>
              <h3 className="windHeading">WIND SPEED</h3>
            </div>
            <div className="humidity">
              <div className="humidityIcon">
                <WiHumidity />
              </div>
              <h3 className="humidityPercent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidityHeading">HUMIDITY</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
