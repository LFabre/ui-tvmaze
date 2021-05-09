import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Store from '../../class/store/Store';

//:: Constants
import { ROUTER } from '../../class/constants';

//:: Components
import { MainScreen, DetailScreen } from '../screen';

function App() {
  return (
    <React.StrictMode>
      <Provider store={Store}>
        <BrowserRouter>
          <div className='App'>
            <Switch>
              <Route
                path={`${ROUTER.DETAIL}/:episodeId(\\d+)`}
                component={DetailScreen}
              />
              <Route
                path={'/:id(\\d+)?'}
                component={MainScreen}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
