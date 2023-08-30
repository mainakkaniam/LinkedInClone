import { useEffect, useState } from 'react';
import RegisterComponent from '../components/RegisterComponent'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import {useNavigate} from "react-router-dom"
import Loader from '../components/common/Loader';

const Register = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        navigate("/home");
      } else {
        // User is signed out or not present
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    })
  }, [])
  
  return (
      <div>
          {loading?<Loader/>:<RegisterComponent/>}
    </div>
  )
}

export default Register