import { configureStore } from '@reduxjs/toolkit';
import postreducer from './src/features/postSlice';
import authreducer from './src/features/authSlice'

const store=configureStore({
    reducer:{
        messages:postreducer,
        auth:authreducer
    }
})

export default store;