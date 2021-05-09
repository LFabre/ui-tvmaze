/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

import i18n from './locale/i18n'
import App from './components/app/App';
import reportWebVitals from './components/app/reportWebVitals';

import './css/Main.css';
import './css/Default.css';
import './css/Overwrite.css';
import './css/MainScreen.css';
import './css/DetailScreen.css';

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
