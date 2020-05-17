/**
 *
 * Dashboard
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GraphLine from 'components/GraphLine';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core/styles';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getCountries, selectCountry } from './actions';

const { withProps, withHandlers } = require('recompose');
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '10px',
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));
export function Dashboard(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  const classes = useStyles();

  const [currency, setCurrency] = React.useState('mexico');

  useEffect(() => {
    props.dispatch(getCountries());
    props.dispatch(selectCountry(currency));
  }, []);

  const handleChange = event => {
    setCurrency(event.target.value);
    props.dispatch(selectCountry(event.target.value));
  };
  let MapWithAMarkerClusterer = null;
  if (Object.keys(props.dashboard.countryData) !== 0) {
    MapWithAMarkerClusterer = compose(
      withProps({
        googleMapURL:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDppSf7HY24R1RT7beJKYyom7KUw2QAdiI&v=3.exp',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `40vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withHandlers({
        onMarkerClustererClick: () => markerClusterer => {
          const clickedMarkers = markerClusterer.getMarkers();
          console.log(
            `Current clicked markers length: ${clickedMarkers.length}`,
          );
          console.log(clickedMarkers);
        },
      }),
      withScriptjs,
      withGoogleMap,
    )(data => (
      <GoogleMap
        defaultZoom={4}
        defaultCenter={{
          lat:
            Object.keys(data.markers).length !== 0
              ? parseFloat(data.markers[0].Lat)
              : 0,
          lng:
            Object.keys(data.markers).length !== 0
              ? parseFloat(data.markers[0].Lon)
              : 0,
        }}
      >
        <MarkerClusterer averageCenter>
          {data.markers.map(marker => (
            <Marker
              key={marker.lat}
              position={{
                lat: parseFloat(marker.Lat),
                lng: parseFloat(marker.Lon),
              }}
            />
          ))}
        </MarkerClusterer>
      </GoogleMap>
    ));
  }
  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            PY2LAB
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item xs={12} sm={2}>
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom justify="center">
            COVID-19
          </Typography>
          {/* <SelectCountry data={props.dashboard.countries} /> */}
          <br />
          <TextField
            id="standard-select-currency-native"
            select
            label="Country"
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {props.dashboard.countries.map(option => (
              <option key={option.Country} value={option.Slug}>
                {option.Country}
              </option>
            ))}
          </TextField>
        </div>
      </Grid>
      <Grid item xs={12} sm={10}>
        {Object.keys(props.dashboard.countryData) !== 0 ? (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <MapWithAMarkerClusterer
                  markers={
                    Object.keys(props.dashboard.countryData).length !== 0
                      ? [props.dashboard.countryData.pop()]
                      : []
                  }
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <MapWithAMarkerClusterer
                  markers={
                    Object.keys(props.dashboard.countryData).length !== 0
                      ? [props.dashboard.countryData.pop()]
                      : []
                  }
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper className={classes.paper}>
                <GraphLine data={props.dashboard.countryData} />
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboard: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Dashboard);
