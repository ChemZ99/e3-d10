import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import WeatherCard from "./WeatherCard";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const city = useSelector(state => state.city);
  const lat = useSelector(state => state.lat);
  const lon = useSelector(state => state.lon);
  const currWeather = useSelector(state => state.currentWeather);
  const forecast = useSelector(state => state.forecast);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hlat, setHlat] = useState(0);
  const [hlon, setHlon] = useState(0);
  const [currWeather2, setCurrWeather2] = useState(null);
  const [forecast2, setForecast2] = useState([]);

  const fetchGeoLoc = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=108438f8e24e8cc7c6d4d5b72d31bd14`
      );

      if (response.ok) {
        const GeoData = await response.json();
        console.log("geodata", GeoData);
        dispatch({ type: "ADD_LAT", payload: GeoData[0].lat });
        setHlat(GeoData[0].lat);
        dispatch({ type: "ADD_LON", payload: GeoData[0].lon });
        setHlon(GeoData[0].lon);

        const response2 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${GeoData[0].lat}&lon=${GeoData[0].lon}&appid=108438f8e24e8cc7c6d4d5b72d31bd14`
        );

        if (response2.ok) {
          const CurrWeatherData = await response2.json();

          dispatch({ type: "ADD_CURRENT_WEATHER", payload: CurrWeatherData });
          setCurrWeather2(CurrWeatherData);
        } else {
          setHasError(true);
        }

        const response3 = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${GeoData[0].lat}&lon=${GeoData[0].lon}&appid=108438f8e24e8cc7c6d4d5b72d31bd14`
        );

        if (response3.ok) {
          const ForecastData = await response3.json();

          dispatch({ type: "ADD_FORECAST", payload: ForecastData.list });
          setForecast2(ForecastData.list);
        } else {
          setHasError(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGeoLoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <h1>Current Weather at {city}</h1>
          {currWeather2 && <WeatherCard data={currWeather2} />}
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
};

export default ResultsPage;
