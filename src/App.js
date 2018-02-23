import React from "react";
import Titles from './components/Titles';
import TitlesStateless from './components/TitlesStateless';
import Form from './components/Form';
import FormStateless from './components/FormStateless';
import Weather from './components/Weather';
import WeatherStateless from './components/WeatherStateless';

const API_KEY = "def96d2721e4de07220724e98674cc45";

class App extends React.Component{
  state = {
    tempareture: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {

    e.preventDefault();
    
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)

    if (city && country){
      const data = await api_call.json();
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        tempareture: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter values correctly"
      })
    }
  }
  render(){
    return(
      <div>
        <div class='text-center'> <Titles/> <TitlesStateless /> </div>
        <div class='col-md-6'>
          <h2> State Component </h2>
          <h4> Form </h4>
          <Form getWeatherFunc={this.getWeather} />
          <h4> Weather </h4>
          <Weather temperature={this.state.temperature} city={this.state.city} country={this.state.country} humidity={this.state.humidity} description={this.state.description} error={this.state.error} />
        </div>
        <div class='col-md-6'>
          <h2> Stateless Component </h2>
          <h4> Form Stateless</h4>
          <FormStateless getWeatherFunc={this.getWeather} />
          <h4> Weather Stateless</h4>

          <WeatherStateless temperature={this.state.temperature} city={this.state.city} country={this.state.country} humidity={this.state.humidity} description={this.state.description} error={this.state.error}/>
        </div>
      </div>
    );
  }
}

export default App;