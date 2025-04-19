import React, { useState } from 'react';
import { auth, provider } from '../Firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

// 🔻 Firestore imports –––––––––––––––––––––––––––––––––––
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';
// 🔺 Firestore imports –––––––––––––––––––––––––––––––––––

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    setLoading(true);
    try {
      let result;
      if (isRegister) {
        result = await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Registered successfully!');

        // 🔻 Store new user in Firestore –––––––––––––––––––––––––––––––––––
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          createdAt: new Date(),
        });
        // 🔺 Firestore registration block –––––––––––––––––––––––––––––––––––
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in successfully!');

        // 🔻 Ensure user exists in Firestore –––––––––––––––––––––––––––––––
        const userRef = doc(db, 'users', result.user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: result.user.uid,
            email: result.user.email,
            createdAt: new Date(),
          });
        }
        // 🔺 Firestore login fallback –––––––––––––––––––––––––––––––––––––––
      }

      console.log(result.user);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      toast.success('Signed in with Google!');

      // 🔻 Store Google user in Firestore if new ––––––––––––––––––––––––––
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
        });
      }
      // 🔺 Google sign-in Firestore logic ––––––––––––––––––––––––––––––––––

      console.log(result.user);
      console.log('✅ Google sign-in successful, navigating to /home...');
      navigate('/');
      console.log('✅ Navigation triggered');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8 bg-yellow-100">
      <h2 className="text-3xl font-bold text-black">
        {isRegister ? 'Connect With Government' : 'Connect With Government'}
      </h2>

      {/* Pink Section with Text */}
      <div className="text-center bg-pink-100 text-white p-6 rounded-xl shadow-xl w-80">
        <p className="text-lg mb-4 text-black">
          💬 <strong>Your Voice Can Spark Change</strong>
        </p>
        <p className="text-sm text-gray-600">
          Got a problem in your community? From unsafe streets to delayed services, your concerns matter.
          Login now to report issues directly to the people who can make a difference.
          Together, we’ll create a safer, cleaner, and more efficient place for everyone.
          It starts with you — let’s make it happen.
        </p>
      </div>

      {/* Email and Password Inputs */}
      <input
        type="email"
        placeholder="Email"
        className="px-4 py-2 border rounded-md w-72 mt-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="px-4 py-2 border rounded-md w-72 mt-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Action Buttons */}
      <button
        onClick={handleAuth}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-72 mt-4"
        disabled={loading}
      >
        {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
      </button>

      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 w-72 mt-4"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>

      {/* Toggle Register/Login */}
      <p className="mt-4">
        {isRegister ? 'Already have an account?' : 'New user?'}{' '}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-green-600 hover:underline"
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
