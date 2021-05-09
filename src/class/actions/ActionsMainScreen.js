import { URLS } from './../constants';
import { dispatchFetchGet } from './ActionsUtils';
import {
  GET_SHOW_IMAGE_BEGIN, GET_SHOW_IMAGE_SUCCESS, GET_SHOW_IMAGE_FAILURE,
  GET_SHOW_INFO_BEGIN, GET_SHOW_INFO_SUCCESS, GET_SHOW_INFO_FAILURE,
  GET_SHOW_SEASONS_BEGIN, GET_SHOW_SEASONS_SUCCESS, GET_SHOW_SEASONS_FAILURE,
  GET_SHOW_SEASON_EPS_BEGIN, GET_SHOW_SEASONS_EPS_SUCCESS, GET_SHOW_SEASONS_EPS_FAILURE,
  SET_CURRENT_SEASON
} from './../constants/ActionTypes';

//:: Get Main Image URL
const acGetImageUrlBegin = () => ({ type: GET_SHOW_IMAGE_BEGIN });
const acGetImageUrlSuccess = data => ({
  type: GET_SHOW_IMAGE_SUCCESS,
  payload: data
});
const acGetImageUrlFailure = err => ({
  type: GET_SHOW_IMAGE_FAILURE,
  payload: err
});

export const acGetImageUrl = showId => {
  return dispatchFetchGet(
    `${URLS.HOST}${URLS.SHOW}/${showId}${URLS.IMAGE}`,
    acGetImageUrlBegin,
    acGetImageUrlSuccess,
    acGetImageUrlFailure,
  );
}

//:: Get Show Information
const acGetShowInfoBegin = () => ({ type: GET_SHOW_INFO_BEGIN });
const acGetShowInfoSuccess = data => ({
  type: GET_SHOW_INFO_SUCCESS,
  payload: data
});
const acGetShowInfoFailure = err => ({
  type: GET_SHOW_INFO_FAILURE,
  payload: err
});

export const acGetShowInfo = showId => {
  return dispatchFetchGet(
    `${URLS.HOST}${URLS.SHOW}/${showId}`,
    acGetShowInfoBegin,
    acGetShowInfoSuccess,
    acGetShowInfoFailure,
  );
}

//:: Get Show Seasons
const acGetShowSeasonsBegin = () => ({ type: GET_SHOW_SEASONS_BEGIN });
const acGetShowSeasonsSuccess = data => ({
  type: GET_SHOW_SEASONS_SUCCESS,
  payload: data
});
const acGetShowSeasonsFailure = err => ({
  type: GET_SHOW_SEASONS_FAILURE,
  payload: err
});

export const acGetShowSeasons = showId => {
  return dispatchFetchGet(
    `${URLS.HOST}${URLS.SHOW}/${showId}${URLS.SEASONS}`,
    acGetShowSeasonsBegin,
    acGetShowSeasonsSuccess,
    acGetShowSeasonsFailure,
  );
}

//:: Get Season Episodes
const acGetSeasonEpsBegin = () => ({ type: GET_SHOW_SEASON_EPS_BEGIN });
const acGetSeasonEpsSuccess = (seasonId, data) => ({
  type: GET_SHOW_SEASONS_EPS_SUCCESS,
  payload: { seasonId, data }
});
const acGetSeasonEpsFailure = err => ({
  type: GET_SHOW_SEASONS_EPS_FAILURE,
  payload: err
});

export const acGetSeasonEps = seasonId => {
  return dispatchFetchGet(
    `${URLS.HOST}${URLS.SEASONS}/${seasonId}${URLS.EPS}`,
    acGetSeasonEpsBegin,
    resp => acGetSeasonEpsSuccess(seasonId, resp),
    acGetSeasonEpsFailure
  );
}

export const acSetCurrentSeason = sId => ({
  type: SET_CURRENT_SEASON,
  payload: sId
})