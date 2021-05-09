import { URLS } from './../constants';
import { dispatchFetchGet } from './ActionsUtils';
import {
  GET_EP_INFO_BEGIN, GET_EP_INFO_SUCCESS, GET_EP_INFO_FAILURE
} from './../constants/ActionTypes';


const acGetEpInfoBegin = () => ({ type: GET_EP_INFO_BEGIN });
const acGetEpInfoSucces = data => ({
  type: GET_EP_INFO_SUCCESS,
  payload: data
});
const acGetEpInfoFailure = err => ({
  type: GET_EP_INFO_FAILURE,
  payload: err
});

export const acGetEpInfo = episodeId => {
  return dispatchFetchGet(
    `${URLS.HOST}${URLS.EPS}/${episodeId}`,
    acGetEpInfoBegin,
    acGetEpInfoSucces,
    acGetEpInfoFailure,
  );
}