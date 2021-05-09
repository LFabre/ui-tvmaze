import { stripHtml } from './../utils';
import {
  GET_EP_INFO_BEGIN, GET_EP_INFO_SUCCESS, GET_EP_INFO_FAILURE
} from './../constants/ActionTypes';

const initState = {
  episodeInfo: null,
  isLoadingEpispdeInfo: false,
  errorEpispdeInfo: null
}

const ReducerDetailScreen = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_EP_INFO_BEGIN: {
      return {
        ...state,
        episodeInfo: null,
        isLoadingEpispdeInfo: true,
        errorEpispdeInfo: null
      }
    }
    case GET_EP_INFO_SUCCESS: {
      return {
        ...state,
        episodeInfo: {
          id: payload.id,
          name: payload.name,
          image: payload.image ? payload.image.original : null,
          runtime: payload.runtime,
          season: payload.season,
          number: payload.number,
          airdate: payload.airdate,
          summary: stripHtml(payload.summary)
        },
        isLoadingEpispdeInfo: false,
        errorEpispdeInfo: null
      }
    }
    case GET_EP_INFO_FAILURE: {
      return {
        ...state,
        isLoadingEpispdeInfo: false,
        errorEpispdeInfo: payload
      }
    }
    default: {
      return state;
    }
  }
}

export default ReducerDetailScreen;