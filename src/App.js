import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './Store'
import Navigation from './Navigation'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={true} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
