import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// import storage from 'redux-persist/lib/storage'
import authStore from './authStore'
import {persistReducer} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {getItem(_key) {return Promise.resolve(null);}, setItem(_key, value) {return Promise.resolve(value);}, removeItem(_key) {return Promise.resolve();},};
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const reducers = combineReducers({
    authStore
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
