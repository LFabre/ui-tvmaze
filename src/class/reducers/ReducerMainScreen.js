import { stripHtml } from './../utils';
import {
  GET_SHOW_IMAGE_BEGIN, GET_SHOW_IMAGE_SUCCESS, GET_SHOW_IMAGE_FAILURE,
  GET_SHOW_INFO_BEGIN, GET_SHOW_INFO_SUCCESS, GET_SHOW_INFO_FAILURE,
  GET_SHOW_SEASONS_BEGIN, GET_SHOW_SEASONS_SUCCESS, GET_SHOW_SEASONS_FAILURE,
  GET_SHOW_SEASON_EPS_BEGIN, GET_SHOW_SEASONS_EPS_SUCCESS, GET_SHOW_SEASONS_EPS_FAILURE,
  SET_CURRENT_SEASON
} from './../constants/ActionTypes';

const initState = {
  imageUrl: null,
  isLoadingImageUrl: false,
  errorImageUrl: null,

  showInfo: null,
  isLoadingShowInfo: false,
  errorShowInfo: false,

  seasons: [],
  isLoadingSeasons: false,
  errorSeasons: null,

  seasonEps: {},
  isLoadingSeasonEps: false,
  errorSeasonEps: false
}

const ReducerMainScreen = (state = initState, { type, payload }) => {
  switch (type) {

    //:: Image Actions
    case GET_SHOW_IMAGE_BEGIN: {
      return {
        ...state,
        isLoadingImageUrl: true,
        errorImageUrl: null
      }
    }
    case GET_SHOW_IMAGE_SUCCESS: {

      // Based on TvMaze Docs. the second element of the array
      // contains the background image      
      let url = payload[1].resolutions.original.url

      return {
        ...state,
        imageUrl: url,
        isLoadingImageUrl: false,
        errorImageUrl: null
      }
    }
    case GET_SHOW_IMAGE_FAILURE: {
      return {
        ...state,
        isLoadingImageUrl: false,
        errorImageUrl: payload
      }
    }

    //:: Show Information Actions
    case GET_SHOW_INFO_BEGIN: {
      return {
        ...state,
        isLoadingShowInfo: true,
        errorShowInfo: null,
      }
    }
    case GET_SHOW_INFO_SUCCESS: {
      // Filtering only information to be rendered
      const showInfo = {
        genres: payload.genres.join(', '),
        rating: payload.rating.average,
        summary: stripHtml(payload.summary),
        language: payload.language,
        name: payload.name,
        type: payload.type,
        premiered: payload.premiered.slice(0, 4), // Year Only
      }

      return {
        ...state,
        showInfo,
        isLoadingShowInfo: false,
        errorShowInfo: null,
      }
    }
    case GET_SHOW_INFO_FAILURE: {
      return {
        ...state,
        isLoadingShowInfo: false,
        errorShowInfo: payload,
      }
    }

    //:: Get Show Seasons
    case GET_SHOW_SEASONS_BEGIN: {
      return {
        ...state,
        isLoadingSeasons: true,
        errorSeasons: null,
      }
    }
    case GET_SHOW_SEASONS_SUCCESS: {
      return {
        ...state,
        seasons: payload.map(e => e.id),
        isLoadingSeasons: false,
        errorSeasons: null,
      }
    }
    case GET_SHOW_SEASONS_FAILURE: {
      return {
        ...state,
        isLoadingSeasons: false,
        errorSeasons: payload,
      }
    }

    // Seaons Eps
    case GET_SHOW_SEASON_EPS_BEGIN: {
      return {
        ...state,
        isLoadingSeasonEps: true,
        errorSeasonEps: null
      }
    }
    case GET_SHOW_SEASONS_EPS_SUCCESS: {
      const { seasonId, data } = payload;

      return {
        ...state,
        seasonEps: {
          ...state.seasonEps,
          [seasonId]: data.map(ep => ({
            id: ep.id,
            name: ep.name,
            image: ep.image ? ep.image.medium : null,
            runtime: ep.runtime,
            summary: stripHtml(ep.summary)
          }))
        },
        isLoadingSeasonEps: false,
        errorSeasonEps: null
      }
    }
    case GET_SHOW_SEASONS_EPS_FAILURE: {
      return {
        ...state,
        isLoadingSeasonEps: false,
        errorSeasonEps: payload
      }
    }

    //Current Season
    case SET_CURRENT_SEASON: {
      return {
        ...state,
        currentSeason: payload
      }
    }

    default: {
      return state;
    }
  }
}

export default ReducerMainScreen;