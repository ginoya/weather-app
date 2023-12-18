
export function getSevenDayForecast(forecastData:any) {
  try {
    const dailyForecast = forecastData.list.reduce((result:any, item:any) => {
      const date = item.dt_txt.split(' ')[0];

      if (!result[date]) {
        result[date] = {
          temperature: [],
          weather: [],
        };
      }

      result[date].temperature.push(item.main.temp);
      result[date].weather.push(item.weather[0].main);

      return result;
    }, {});

    const dates = Object.keys(dailyForecast).slice(0, 7);

    const sevenDayForecast = dates.map(date => {
      const temperatures = dailyForecast[date].temperature;
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);
      const avgTemp = temperatures.reduce((sum:any, temp:any) => sum + temp, 0) / temperatures.length;

      const weather = dailyForecast[date].weather[0];

      return {
        date,
        minTemp: convertedToCelcius(minTemp),
        maxTemp: convertedToCelcius(maxTemp),
        avgTemp: convertedToCelcius(avgTemp),
        weather,
      };
    });

    return sevenDayForecast;

  }
  catch {
    return []
  }
}

export function convertedToCelcius(temparature:number){
  return Math.round(temparature - 273.15)
}
