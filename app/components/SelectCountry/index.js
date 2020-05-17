/**
 *
 * SelectCountry
 *
 */

/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function CountrySelect(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const handleChange = event => {
    setValue(event.target.value);
  };
  console.log(value);
  return (
    <Autocomplete
      id="country-select-demo"
      style={{ width: 300 }}
      options={props.data}
      classes={{
        option: classes.option,
      }}
      value={value}
      autoHighlight
      onChange={handleChange}
      getOptionLabel={option => option.Country}
      renderOption={option => <React.Fragment>{option.Country}</React.Fragment>}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
CountrySelect.propTypes = {
  data: PropTypes.object,
};
