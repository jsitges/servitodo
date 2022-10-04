import { combineReducers } from "redux";
import auth from "./auth";
import professionals from "./professionals";
import query from "./query";
import filter from "./filter";

export default combineReducers({
  auth: auth,
  professionals: professionals,
  query: query,
  filter: filter,
});
