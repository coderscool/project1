import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import picturRrducer from './../features/pictur/picturSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pictur: picturRrducer
  },
});
