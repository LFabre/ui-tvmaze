
export const RESPONSE_TYPE = {
  JSON: 'json',
  TEXT: 'text',
  NONE: 'none',
  RESPONSE: 'response',
}

/**
 * Used Inside Fetch Flow. Used to handle Errors.
 *
 * @author Lucas Fabre
 * @date 2021-05-09
 * @param {object} res Fetch Response Object
 * @return {object} Promisse
 */
const _handleFetchErrors = res => {
  return new Promise((resolve, reject) => {
    if (res.ok)
      return resolve(res);

    reject(res);
  })
}

/**
 * This method is a way to help with fetch actions.
 * When using fetch we usually want to dispatch 3 actions: 
 * The first when the fetch starts, the second when a successful
 * result is returned and the third one if our fetch fails.
 * This method handles the second and third case, dispatch 
 * the onSuccess and onFailure actions.
 * It also handle Json and Text bodies parsing, and provides an easy
 * way to handl errors.
 *
 * @author Lucas Fabre
 * @date 2021-05-09
 * @param {function} fetchCall
 * @param {function} dispatch Redux Dispatch function
 * @param {function} onSucces On Success Action Constructor
 * @param {function} onFailure On Failure Action Constructor
 * @param {string} [respType=RESPONSE_TYPE.JSON]
 * @return {object} Promisse
 */
const _fetchFlow = (fetchCall, dispatch, onSucces, onFailure, respType = RESPONSE_TYPE.JSON) => {
  return new Promise((resolve, reject) => {
    fetchCall()
      .then(_handleFetchErrors)
      .then(res => {
        if (res.status === 204 && respType !== RESPONSE_TYPE.NONE) {
          console.warn('Trying to get data from a 204 Response!');
          return undefined;
        }

        switch (respType) {
          case RESPONSE_TYPE.JSON: return res.json();
          case RESPONSE_TYPE.TEXT: return res.text();
          case RESPONSE_TYPE.NONE: return undefined;
          default: return res;
        }
      })
      .then(result => {
        dispatch(onSucces(result));
        resolve(result);
      })
      .catch(err => {
        dispatch(onFailure(err));
        reject(err);
      })
  })
}

/**
 * This method dispatches the onBegin action and calls fetchFlow 
 * to handle success and failure cases from an asynchronous data fetch.
 * The dispatch parameter is received from redux library. 
 *
 * @author Lucas Fabre
 * @date 2021-05-09
 * @param {function} fetchCall
 * @param {function} onBegin
 * @param {function} onSucces
 * @param {function} onFailure
 * @param {string} [respType=RESPONSE_TYPE.JSON]
 * @return {object} Promisse
 */
const _dispatchFetch = (fetchCall, onBegin, onSucces, onFailure, respType = RESPONSE_TYPE.JSON) => {
  return dispatch => {
    dispatch(onBegin());
    return _fetchFlow(fetchCall, dispatch, onSucces, onFailure, respType);
  }
}

/**
 * Simplifies the dispatchFetch call by creating a GET request.
 *
 * @author Lucas Fabre
 * @date 2021-05-09
 * @param {string} url
 * @param {function} onBegin
 * @param {function} onSucces
 * @param {function} onFailure
 * @param {string} [respType=RESPONSE_TYPE.JSON]
 * @return {object} Promisse
 */
export const dispatchFetchGet = (url, onBegin, onSucces, onFailure, respType = RESPONSE_TYPE.JSON) => {
  const fCall = () => fetch(url, { method: 'GET', credentials: 'same-origin' });
  return _dispatchFetch(fCall, onBegin, onSucces, onFailure, respType);
}
