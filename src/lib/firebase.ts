
"use client";

import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDIpVM4lnKJI9DSsF7fMRBEubVr3r91tys",
  authDomain: "cosmivity-119a8.firebaseapp.com",
  databaseURL: "https://cosmivity-119a8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cosmivity-119a8",
  storageBucket: "cosmivity-119a8.appspot.com",
  messagingSenderId: "417029336062",
  appId: "1:417029336062:web:01089cdf21d3e9b0862eaf",
  measurementId: "G-XBN7P1GQVS"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
