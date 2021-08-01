import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import count from './counterStore'

const reducers = combineReducers({
    count,
})

export const initializeStore = () => {
    return configureStore({
        reducer: reducers
    })
}