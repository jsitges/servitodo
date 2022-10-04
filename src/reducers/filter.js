export default function filter(state = "", action) {
  switch (action.type) {
    case "UPDATE_FILTER":
      return action.filter;

    default:
      return state;
  }
}
