import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import count from './counterStore'
import authStore from './authStore'
import {persistReducer} from "redux-persist";

const reducers = combineReducers({
    count,authStore
})

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const initializeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
    })
}