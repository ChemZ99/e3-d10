import { Button, Container, Form, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveInput = value => {
    dispatch({ type: "ADD_CITY", payload: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    navigate("/results");
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Search any city to have a forecast</Form.Label>
          <Form.Control onChange={event => saveInput(event.target.value)} placeholder="Enter your city here" />
          <Form.Text className="text-muted">We will find the future weather for you</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
};

export default SearchPage;
