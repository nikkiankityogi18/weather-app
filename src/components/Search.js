import { useEffect, useState } from "react";
import axios from "axios";
import ForcastChart from "./ForcastChart";
import { API_BASE_URL, API_KEY } from "../constents";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  //   const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [humidity, setHumidity] = useState("0");
  const [windSpeed, setWindSpeed] = useState("0");
  const [temprature, setTemprature] = useState("0");
  const [unit, setUnit] = useState("metric");
  const [weatherIcon, setWeatherIcon] = useState("cloud");
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    searchResult(searchText);
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches"));
    if (savedSearches) {
      setRecentSearches(savedSearches);
    }
  }, []);

  const switchToCelsius = () => {
    setUnit("metric");
    let convert = ((temprature - 32) * 5) / 9;
    setTemprature(convert.toFixed(2));
  };

  const switchToFahrenheit = () => {
    setUnit("imperial");
    let convert = (temprature * 9) / 5 + 32;
    setTemprature(convert.toFixed(2));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  function handleRecentSearchClick(search) {
    setSearchText(search);
  }
  const handleInputBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  };

  const searchResult = async (text) => {
    let url = `${API_BASE_URL}?q=${text}&units=Metric&appid=${API_KEY}`;
    if (searchText === "") {
      return 0;
    }
    try {
      const response = await axios.get(url);
      //   setWeatherData(response.data);
      setLocation(response?.data?.name);
      setHumidity(response?.data?.main?.humidity);
      setTemprature(response?.data?.main?.temp);
      setWindSpeed(response?.data?.wind?.speed);
      getWeatherIcon(response.data.weather[0].icon);
      setError("");

      setRecentSearches([searchText, ...recentSearches].slice(0, 5));
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
      console.log(recentSearches);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const getWeatherIcon = (weatherCode) => {
    if (!weatherCode) {
      return "";
    }
    switch (weatherCode) {
      case "01d":
      case "01n":
        setWeatherIcon("clear");
        break;
      case "02d":
      case "02n":
        setWeatherIcon("cloud");
        break;
      case "03d":
      case "03n":
        setWeatherIcon("drizzle");
        break;
      case "04d":
      case "04n":
        setWeatherIcon("drizzle");
        break;
      case "09d":
      case "09n":
        setWeatherIcon("rain");
        break;
      case "10d":
      case "10n":
        setWeatherIcon("rain");
        break;
      case "13d":
      case "13n":
        setWeatherIcon("snow");
        break;
      default:
        setWeatherIcon("clear");
        break;
    }
  };

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex   flex-col ">
        <div className="w-full md:ml-2 bg-blue-500 py-6">
          <div className="flex flex-col justify-center items-center ">
            <div className="flex relative ">
              <div className="flex">
                <input
                  className="border border-gray-400 rounded-l-3xl h-10 w-72 px-4"
                  type="text"
                  placeholder="Enter City Name"
                  value={searchText}
                  onChange={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={handleInputBlur}
                />
                <button
                  onClick={() => searchResult(searchText)}
                  className="flex justify-center items-center py-3 px-4 border  border-gray-400 rounded-r-3xl bg-gray-200  h-10"
                >
                  <img src="/icons/search.png" alt="search-img" />
                </button>
              </div>
              {isSearchFocused && (
                <div className="absolute top-10 left-1 w-72">
                  <ul className="rounded-lg p-1 bg-blue-500">
                    {recentSearches.map((search, index) => (
                      <li
                        className=" w-60 p-1"
                        onClick={() => handleRecentSearchClick(search)}
                        key={index}
                      >
                        {search}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {error ? (
            <p className="flex justify-center items-center font-bold min-h-80  m-auto">
              {error}
            </p>
          ) : (
            <div>
              <div className="flex justify-center ">
                <img src={`/icons/${weatherIcon}.png`} alt="cloud-img" />
              </div>
              <div className="flex flex-col justify-center items-center text-2xl font-semibold">
                <h2 className="sm:my-1">
                  {temprature}{" "}
                  <button
                    className={
                      unit === "metric"
                        ? "font-bold mx-2 opacity-100"
                        : "font-normal opacity-40"
                    }
                    onClick={switchToCelsius}
                    disabled={unit === "metric"}
                  >
                    °C
                  </button>
                  <button
                    className={
                      unit === "imperial"
                        ? "font-bold mx-2 opacity-100 "
                        : "font-normal opacity-40"
                    }
                    onClick={switchToFahrenheit}
                    disabled={unit === "imperial"}
                  >
                    °F
                  </button>
                </h2>
                <h2 className="mt-1">{location}</h2>
              </div>
              <div className="flex justify-between p-2 m-2 mt-4">
                <div className="flex sm:mx-4">
                  <div className="mr-4 my-auto">
                    <img src="/icons/humidity.png" alt="humidity-img" />
                  </div>
                  <div className="">
                    <p className="md:text-2xl sm:text-xl text-lg font-bold">
                      {humidity} %
                    </p>
                    <p>humidity</p>
                  </div>
                </div>
                <div className="flex sm:mx-4">
                  <div className="mr-4 my-auto">
                    <img src="/icons/wind.png" alt="wind-img" />
                  </div>
                  <div className="">
                    <p className="md:text-2xl sm:text-xl text-lg font-bold">
                      {windSpeed} m/s
                    </p>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {location && (
          <div className="md:my-4 md:mr-2 py-6">
            <ForcastChart city={location} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
