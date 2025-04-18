// src/features/issues/issuesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIssuesFromFirebase } from './issuesAPI';

// Async thunk to fetch issues from Firebase
export const fetchIssues = createAsyncThunk('issues/fetch', async () => {
  return await fetchIssuesFromFirebase();
});

const issuesSlice = createSlice({
  name: 'issues',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {
    // Manually set the issues list (e.g., from a custom API or admin input)
    setIssues: (state, action) => {
      state.items = action.payload;
    },
    // Add a new issue to the local Redux state
    addIssue: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIssues.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchIssues.rejected, state => {
        state.status = 'failed';
      });
  },
});

// Export actions
export const { setIssues, addIssue } = issuesSlice.actions;

// Export reducer
export default issuesSlice.reducer;
