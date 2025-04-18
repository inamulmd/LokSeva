import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching issues from Firebase
export const fetchIssues = createAsyncThunk('issues/fetchIssues', async () => {
  const snapshot = await getDocs(collection(db, 'issues'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// You can optionally export the raw function if needed elsewhere
export const fetchIssuesFromFirebase = async () => {
  const snapshot = await getDocs(collection(db, 'issues'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
