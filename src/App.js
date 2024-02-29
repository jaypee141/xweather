import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({
    temp: "",
    humid: "",
    condition: "",
    speed: ""
  });

  const getData1 = async (city) => {
    setisLoading(true);
    try {
      let response = await axios(`https://api.weatherapi.com/v1/current.json?key=a2012864a32b4056a7b114238230212&q=${city}`);
      console.log(response.data);
      setWeather({
        temp: response.data.current.temp_c,
        humid: response.data.current.humidity,
        condition: response.data.current.condition.text,
        speed: response.data.current.wind_kph
      });
      setisLoading(false);
      setDisplay(true);

    }catch (e) {
      setisLoading(true)
      if (e.response && e.response.status !== 200) {
        window.alert("Failed to fetch weather data");
      }
      console.error("something went wrong", e);
      setisLoading(false);
    }
  }

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const getData = () => {
    getData1(city);
   
  }

  return (
    <div className="App">
      <div className="inpu">
        <input type="text" placeholder="Enter city" onChange={handleChange} />
        <button className="butto" onClick={getData}>Search</button>
      </div>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (display &&
      <div className='card'>
        <div className="weather-card">
          <h3>Temperature</h3><br />
          <p>{weather.temp}</p>
        </div>
        <div className="weather-card">
          <h3>Humidity</h3><br />
          <p>{weather.humid}</p>
        </div>
        <div className="weather-card">
          <h3>Condition</h3><br />
          <p>{weather.condition}</p>
        </div>
        <div className="weather-card">
          <h3>Wind Speed</h3><br />
          <p>{weather.speed}</p>
        </div>
      </div>
      )
      }
    </div>
  );
}

export default App;
