/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  countries: [],
  countryData: [],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.DEFAULT_ACTION:
        break;
      case constants.GET_COUNTRIES_SUCCESS:
        draft.countries = action.response;
        break;
      case constants.SELECT_COUNTRY_SUCCESS:
        draft.countryData = action.response;
        break;
    }
  });

export default dashboardReducer;
