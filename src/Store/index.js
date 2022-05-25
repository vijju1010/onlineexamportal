import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';
import examReducer from './exams.slice';
export const store = configureStore({
    reducer: {
        user: userReducer,
        exam: examReducer,
    },
});
