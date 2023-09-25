import React, { useEffect, useState } from 'react'
import HomeComponent from '../components/home/HomeComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import {useNavigate} from "react-router-dom"
import Loader from '../components/common/Loader'
import Navbar from '../components/common/Navbar'

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // Create the request body
        const requestBody = {
          email: user.email,
          _id: user.email, // Assuming user.uid contains the user's unique ID
        };
        // Make a POST request using the Fetch API
        fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            // Handle the response as needed
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          })
          .catch((error) => {
            setLoading(false); // Handle the error and setLoading(false) accordingly
          });
      } else {
        // User is signed out
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      {loading?<Loader/>:<><Navbar/><HomeComponent /></>}
    </div>
  )
}

export default Home