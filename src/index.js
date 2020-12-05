import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div className="d-none">Loading</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
