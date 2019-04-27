import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';

import './index.css';
import App from './App';

const config = {
  apiKey: 'AIzaSyCELOFzCBh_8iMVcGKm8K9UON1AhB86x3A',
  projectId: 'runescore'
};

firebase.initializeApp(config);

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>,
  document.getElementById('root')
);
