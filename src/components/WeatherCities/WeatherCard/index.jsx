import React from 'react';
import './WeatherCard.css';

import useFetch from '../../../hooks/useFetch';

function getImageWeatherState(stateCode, night) {
    if (stateCode < 300) return 'images/storm.svg';
    else if (stateCode < 400) return 'images/drizzle.svg';
    else if (stateCode < 600) return 'images/rain.svg';
    else if (stateCode < 700) return 'images/snow.svg';
    else if (stateCode === 800) {
      if (night.indexOf('n')) {
        return 'images/moon.svg';
      }
      return 'images/sun.svg';
    }  
    else return 'images/clouds.svg'
}

function WeatherCard({ city }) {
  const [data] = useFetch(buildUrl(city), {});

  function buildUrl(search) {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = process.env.REACT_APP_WEATHER_API;
    return `${baseUrl}?q=${search}&appId=${apiKey}&units=metric`;
  }

  function renderCard(cityData) {
    if (cityData.name) {
      const { humidity, temp } = cityData.main;
      const wind = cityData.wind.speed;
      const name = cityData.name;
      const { id: stateCode, icon: night } = cityData.weather[0];
      const urlImage = getImageWeatherState(stateCode, night);

      return (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{name}</h3>
          </div>
          <div className="card-info">
            <p className="info-temperature">
              <span>{Math.round(temp)}</span>
              <img src="images/temperature.svg" alt="" />
            </p>
            <img className="card-img" src={urlImage} alt="" />
            <div className="card-info-extra">
              <p className="info-humidity">
                <img className="humidity-logo" src="images/humidity.svg" alt="" />
                {humidity}%
            </p>
              <p className="info-wind">
                <img className="wind-logo" src="images/wind.svg" alt="" />
                {wind} m/s
            </p>
            </div>
          </div>
        </div>
      );
    } else if(cityData.cod === "404")  {
      return (
        <div className="card">
          <h3 className="card-title">Ciudad no encontrada</h3>
        </div>
      );
    } else {
      return (
        <div className="card">
          <h3 className="card-title">Cargando...</h3>
        </div>
      );
    }

  }

  return renderCard(data);

}

export default WeatherCard;