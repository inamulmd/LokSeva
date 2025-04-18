import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../features/issues/issuesSlice';  // Import only the reducer

export const store = configureStore({
  reducer: {
    issues: issuesReducer,  // Add the issues reducer here
  },
   // Thunk is included by default, but just for clarity:
   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

});

export default store;
