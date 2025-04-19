import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching issues from Firebase
export const fetchIssues = createAsyncThunk('issues/fetchIssues', async () => {
  const snapshot = await getDocs(collection(db, 'issues'));
  
  // Log the snapshot to check the raw data
  console.log('Fetched snapshot:', snapshot);
  
  const issues = snapshot.docs.map(doc => {
    const data = doc.data();
    
    // Convert any Firestore Timestamps to ISO string format (string)
    if (data.createdAt && data.createdAt instanceof Object && data.createdAt.seconds) {
      data.createdAt = data.createdAt.toDate().toISOString();  // Convert Firestore Timestamp to string
    }
    
    return {
      id: doc.id,
      ...data,
    };
  });
  
  // Log the issues data before returning
  console.log('Mapped issues:', issues);

  return issues;
});

// You can optionally export the raw function if needed elsewhere
export const fetchIssuesFromFirebase = async () => {
  const snapshot = await getDocs(collection(db, 'issues'));
  
  // Log the snapshot to check the raw data
  console.log('Fetched snapshot (raw):', snapshot);
  
  const issues = snapshot.docs.map(doc => {
    const data = doc.data();
    
    // Convert any Firestore Timestamps to ISO string format (string)
    if (data.createdAt && data.createdAt instanceof Object && data.createdAt.seconds) {
      data.createdAt = data.createdAt.toDate().toISOString();  // Convert Firestore Timestamp to string
    }
    
    return {
      id: doc.id,
      ...data,
    };
  });
  
  // Log the issues data before returning
  console.log('Mapped issues (raw function):', issues);

  return issues;
};
