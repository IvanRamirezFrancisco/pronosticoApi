export interface WeatherData {
    date: string;
    day: string;
    minTemp: number;
    maxTemp: number;
    pop: number;
    weatherDescription: string;
  }
  
  const getDayName = (dateStr: string): string => {
    const date = new Date(dateStr);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  };
  
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  export const fetchWeatherData = async (): Promise<WeatherData[]> => {
    const API_KEY = '5f559b9afd7b85f4cf7b15b489cff550'; 
    const city = 'Huejutla de Reyes, MX'; 
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    const data = await response.json();
  
    const grouped: { [key: string]: any[] } = {};
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
  
    const processedData: WeatherData[] = Object.keys(grouped)
      .slice(0, 5)
      .map((dateKey) => {
        const dayItems = grouped[dateKey];
        const minTemp = Math.min(...dayItems.map((i: any) => i.main.temp_min));
        const maxTemp = Math.max(...dayItems.map((i: any) => i.main.temp_max));
        
        //a porcentaje para un mayor entendimiento.
        const pop = Math.round(Math.max(...dayItems.map((i: any) => i.pop)) * 100);
        
        const weatherDescription = dayItems[0].weather[0].description;
        return {
          date: formatDate(dateKey),
          day: getDayName(dateKey),
          minTemp,
          maxTemp,
          pop,
          weatherDescription,
        };
      });
  
    return processedData;
  };
  