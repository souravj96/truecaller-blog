import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../Reducer';

import rootSaga from '../Saga';

const LOCAL_STORAGE_NAME = "Truecaller"

const persistConfig = {
  key: LOCAL_STORAGE_NAME,
  storage: storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(
    persistedReducer,
    applyMiddleware(
      sagaMiddleware,
    ),
  );
}
else {
  store = createStore(
    persistedReducer,
    applyMiddleware(
      sagaMiddleware,
      createLogger(),
    ),
  );
}
const persistor = persistStore(store)
persistor.persist()
sagaMiddleware.run(rootSaga);

export {
  store,
  persistor
}