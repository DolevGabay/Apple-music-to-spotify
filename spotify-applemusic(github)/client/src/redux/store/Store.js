import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import transferReducer from '../reducers/transferReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: local storage

const persistConfig = {
    key: 'matandolev',
    storage
};

const rootReducer = combineReducers({
    auth: authReducer,
    transfer: transferReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

const persistor = persistStore(store);

export {store, persistor};