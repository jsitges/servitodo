export default function professionals(state = [], action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return action.professionals;

    default:
      return state;
  }
}
