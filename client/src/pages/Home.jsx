import React, { useEffect, useState } from 'react'
import HomeComponent from '../components/HomeComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import {useNavigate} from "react-router-dom"
import Loader from '../components/common/Loader'

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      } else {
        // User is signed out
        navigate("/login");
      }
    })}, [])
  

  return (
    <div>
      {loading?<Loader/>:<HomeComponent />}
    </div>
  )
}

export default Home