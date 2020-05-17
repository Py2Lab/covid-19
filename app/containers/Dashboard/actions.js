/*
 *
 * Dashboard actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function getCountries() {
  return {
    type: constants.GET_COUNTRIES_INIT,
  };
}

export function selectCountry(country) {
  return {
    type: constants.SELECT_COUNTRY_INIT,
    country,
  };
}
