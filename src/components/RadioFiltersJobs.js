import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { updateFilter } from "../actions/professionals";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function RadioFiltersJobs(props) {
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
          value="completed"
          control={<GreenRadio />}
          label="Completed"
        />
        <FormControlLabel
          value="pending"
          control={<GreenRadio />}
          label="Pending"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default connect(null, { updateFilter })(RadioFiltersJobs);
