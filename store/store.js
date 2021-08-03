import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import count from './counterStore'
import authStore from './authStore'

const reducers = combineReducers({
    count,authStore
})

export const initializeStore = () => {
    return configureStore({
        reducer: reducers
    })
}