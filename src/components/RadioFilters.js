import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import { updateFilter } from "../actions/professionals";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { Typography, Divider } from "@material-ui/core";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function RadioFilters(props) {
  const [value, setValue] = React.useState("all");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.updateFilter(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="filter"
        name="filter"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="all" control={<GreenRadio />} label="All" />
        <FormControlLabel
          value="distance"
          control={<GreenRadio />}
          label="Distance"
        />
        <FormControlLabel
          value="price"
          control={<GreenRadio />}
          label="Price"
        />
        <FormControlLabel
          value="rating"
          control={<GreenRadio />}
          label="Rating"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default connect(null, { updateFilter })(RadioFilters);
