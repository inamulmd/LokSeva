

const token = import.meta.env.VITE_IPINFO_KEY;

import { useState, useEffect } from 'react';

const UseLocation = () => {
  const [location, setLocation] = useState({ lat: '',
     lng: '',
     city: '',
     region: '',
     country: '',
     });

  const fetchLocation = async () => {
    try {
      const token = import.meta.env.VITE_IPINFO_KEY;
      const response = await fetch(`https://ipinfo.io/json?token=${token}`);
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data.loc) {
        throw new Error("Location data not available");
      }
  
      const [lat, lng] = data.loc.split(',');
      setLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        city: data.city || '',
        region: data.region || '',
        country: data.country || '',
      });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };
  
  

  return { location, fetchLocation };
};

export default UseLocation;
