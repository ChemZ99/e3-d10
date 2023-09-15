import Card from "react-bootstrap/Card";

const WeatherCard = props => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} />
      <Card.Body>
        <Card.Title>{props.data.weather[0].description}</Card.Title>
        <Card.Text>{props.data.main.temp} Fahrenheit</Card.Text>
        <Card.Text>humidity: {props.data.main.humidity} %</Card.Text>
        <Card.Text>wind speed: {props.data.wind.speed} Km/h</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
