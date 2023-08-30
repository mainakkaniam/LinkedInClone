import { useEffect, useState } from 'react';
import LoginComponent from '../components/LoginComponent'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import {useNavigate} from "react-router-dom"
import Loader from '../components/common/Loader';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        navigate("/home");
      } else {
        // User is signed out
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    })
  }, [])
  
  return (
      <div>
          {loading?<Loader/>:<LoginComponent/>}
    </div>
  )
}

export default Login