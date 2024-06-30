import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import subscriptionReducer from './slices/subscriptionSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        subscription: subscriptionReducer,
    },
});

export default store;
