import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "../../sass/Navbar.scss";

const Navbar = () => {
    const [dots, setDots] = useState(false);
    const [modal,setModal] = useState(false);

  useEffect(() => {
      document.addEventListener("click", handleClick, true);
  }, []);
    
  const refOne = useRef(null);
  const refTwo=useRef(null);

    const handleClick = (e) => {
        if (!refOne.current.contains(e.target)) {
            console.log("outside")
            setModal(false)
        }
      else setModal(true);
      
      if (!refTwo.current.contains(e.target))
        if (dots)
          setDots(false);
  }
  
  const handleSecondClick = () => {
    setDots(!dots);
  }

  return (
    <div className="navbar" style={{ display: "flex" }}>
      <div className="smalogo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6qkY04vjIEAe7Jgu5DIGQXxXnIkGwMOExg&usqp=CAU" alt="" />
      </div>
      <div className="total-input" >
              <div className={`input-storer ${modal ? 'expanded' : ''}`} style={{ display: "flex" }}>
          <div className="search-icon">
            <SearchIcon />
          </div>
          <input type="text" placeholder="Search"   ref={refOne} />
        </div>
        {modal && <div className="modal"></div>}
      </div>
      <div className="icons">
        <div className="search-for-small-screen common">
        <SearchIcon fontSize='large'/>
          Search
        </div>
        <div className="home common" >
          <HomeRoundedIcon fontSize='large'/>
          Home
        </div>
        <div className="people common">
          <PeopleAltIcon fontSize='large'/>
          My Network
        </div>
        <div className="job common">
          <BusinessCenterIcon fontSize='large'/>
          Jobs
        </div>
        <div className="chat common">
          <MessageRoundedIcon fontSize='large'/>
          Messaging
        </div>
        <div className="notifications common">
          <NotificationsRoundedIcon fontSize='large'/>
          Notifications
        </div>
        <div className="me common">
          <Person2RoundedIcon fontSize='large'/>
          Me
        </div>
        <div className={`might-be-replaced ${dots ? 'dropdown' : ''}`}>
        <div className="business common">
          <AppsRoundedIcon fontSize='large'/>
          For Business
        </div>
        <div className="premium common">
          Try Premium for Free
        </div>
        </div>
        <div className="three-dots" ref={refTwo} onClick={handleSecondClick}>
          <MoreHorizIcon fontSize="large" />
        </div>
      </div>
      <div className="chat2">
          <MessageRoundedIcon fontSize='large'/>
        </div>
    </div>
  );
}

export default Navbar;
