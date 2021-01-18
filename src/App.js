import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/slick.min.css';
// import './assets/css/slick-theme.min.css';
import 'react-datepicker/dist/react-datepicker.css';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
import './App.scss';
import { Provider } from 'react-redux';
import Router from 'routers';

import createStore from './stores/createStore';

function App() {
  const { store, persistor } = createStore();

  return (
    <div className="App">
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Router />
        </Provider>
      </PersistGate>
    </div>
  );
}

export default App;
