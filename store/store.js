import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
// import storage from 'redux-persist/lib/storage'
import userStore from './userStore'
import {persistReducer, FLUSH,  REHYDRATE,  PAUSE,  PERSIST,  PURGE,  REGISTER} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import businessStore from "./businessStore";
import invoiceStore from "./invoiceStore";

const createNoopStorage = () => {
    return {getItem(_key) {return Promise.resolve(null);}, setItem(_key, value) {return Promise.resolve(value);}, removeItem(_key) {return Promise.resolve();},};
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const reducers = combineReducers({
    userStore, businessStore,invoiceStore
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
        middleware: (getDefaultMiddleware) =>    getDefaultMiddleware({      serializableCheck: {        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],      },    }),
    })
}
