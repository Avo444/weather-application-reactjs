import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';

function App() {
  const [weather, setWeather] = useState({});
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth();
  const thisDate = date.getDate();
  const thisDay = date.getDay();

  const monthNames = ["", "Հունվար", "Փետրվար", 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր','Նոյեմբեր', 'Դեկտեմբեր'];
  const Day = ["", "Երկուշաբթի", "Երեքշաբթի", 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ', 'Շաբաթ', 'Կիրակի'];

  useEffect(() => {
    getWeather();
  }, [])

  const getWeather = async () => {
    const weatherConfigs = {
      key: '51829803db0509d11999386b5f13f0df',
      lat: '40.138479',
      lon: '44.785757'
    }
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherConfigs.lat}&lon=${weatherConfigs.lon}&units=metric&appid=${weatherConfigs.key}`);
    const data = await api.json();

    setWeather(data);
  }

  // const sunrise = new Date(weather.sys?.sunrise * 1000).getHours();
  // const sunset = new Date(weather.sys?.sunset * 1000).getHours();

  const sunrise = moment(weather.sys?.sunrise * 1000).format('HH:mm');
  const sunset = moment(weather.sys?.sunset * 1000).format('HH:mm');

  return (
    <div className="container">
      <div className="weather-side">
          <div className="weather-gradient"></div>
          <div className="date-container">
              <h2 className="date-dayname">{Day[thisDay]}</h2><span className="date-day">{thisDate} {monthNames[thisMonth+1]} {thisYear}</span><i className="location-icon" data-feather="map-pin"></i><span className="location">{weather.name+' , '+weather.sys?.country}</span>
          </div>
          <div className="weather-container"><i className="weather-icon" data-feather="sun"></i>
              <h3 className="weather-desc">Այսօրվա ջերմաստիճան</h3>
              <h1 className="weather-temp">{weather.main?.temp.toFixed()}°C</h1>
              <h3 className="weather-desc">{weather.clouds?.all <= 25 ? 'Արև' : 'Ամպամած'}</h3>
          </div>
      </div>
      <div className="info-side">
          <div className="today-info-container">
              <div className="today-info">
                  <div className="precipitation"> <span className="title">Տեսանելիություն</span><span className="value">{weather.visibility} կմ</span>
                      <div className="clear"></div>
                  </div>
                  <div className="wind"> <span className="title">Ամպամածություն</span><span className="value">{weather.clouds?.all}%</span>
                      <div className="clear"></div>
                  </div>
                  <div className="humidity"> <span className="title">Քամու արագություն</span><span className="value">{weather.wind?.speed} մ/վ</span>
                      <div className="clear"></div>
                  </div>
                  <div className="humidity"> <span className="title">Արևածագ </span><span className="value">{sunrise}</span>
                      <div className="clear"></div>
                  </div>
                  <div className="humidity"> <span className="title">Մայրամուտ</span><span className="value">{sunset}</span>
                      <div className="clear"></div>
                  </div>
              </div>
          </div>          
      </div>
  </div>
  );
}

export default App;
