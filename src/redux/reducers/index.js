const initialState = {
  city: "",
  lat: 0,
  lon: 0,
  currentWeather: {},
  forecast: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "ADD_LAT":
      return {
        ...state,
        lat: action.payload,
      };
    case "ADD_LON":
      return {
        ...state,
        lon: action.payload,
      };
    case "ADD_CURRENT_WEATHER":
      return {
        ...state,
        currentWeather: action.payload,
      };
    case "ADD_FORECAST":
      return {
        ...state,
        forecast: action.payload,
      };
    case "RESET":
      return {
        city: "",
        lat: "",
        lon: "",
        currentWeather: {},
        forecast: [],
      };
    default:
      return state;
  }
};

export default mainReducer;
