import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a83df4b109629a9454ed14b8967d3ab&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Invalid city');
    }
  };

  const handleSearch = () => {
    getWeather();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="weather-app">
      <header>
        <h1 className="app-title">Weather App</h1>
        {weatherData && (
          <div>
            <h2 className="location">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="date">{new Date().toLocaleDateString()}</p>
          </div>
        )}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search city"
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </header>
      {weatherData && (
        <div className="weather-box">
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
          <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
          <p className="conditions">Conditions: {weatherData.weather[0].description}</p>
          {weatherData.air_quality && (
            <p className="air-quality">Air Quality: {weatherData.air_quality.value}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;