import React, { useEffect, useRef, useState } from 'react';
import "../../sass/PostMaker.scss";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CancelIcon from '@mui/icons-material/Cancel';
import ArticleIcon from '@mui/icons-material/Article';
import FadeLoader from "react-spinners/FadeLoader";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Modal } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { toast } from 'react-toastify';

const PostMaker = () => {
  const timeoutRef = useRef(null);//you need to use useRef here coz assume u use let and then assign timeout to
  //to the setTimeout . When the component is re rendered or executed another timeout variable is created and hence the v
  //value gets lost between re renders
  const [openParentModal, setOpenParentModal] = useState(false);
  const [openChildModal, setOpenChildModal] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const apiUrl = `http://localhost:3001/api/users/${user.email}`;

        // Make a GET request to the API
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            // Check if the response contains 'data' property
            if (data && data.data) {
              // Extract 'data.name' and 'data.image' from the response
              const { name, image } = data.data;

              // Update state variables 'name' and 'avatar'
              setName(name);
              setAvatar(image);
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }
    }
    )
  }, []);

  const handlePost = () => {
    console.log("dhukchi ami");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Step 1: Fetch the user's current posts
        fetch(`http://localhost:3001/api/users/${user.email}`)
          .then((response) => response.json())
          .then((data) => {
            //when using console.log to print data dont use an additional string like "data="+data
            if (data && data.data.posts) {
              const currentPosts = data.data.posts;
              console.log(currentPosts)
  
              // Step 2: Append the new post (input value) to the current posts
              const updatedPosts = [...currentPosts, input];
              console.log(updatedPosts)
  
              // Step 3: Send a PUT request to update the user's posts
              fetch(`http://localhost:3001/api/users/${user.email}`, {
                method: "PUT",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ posts: updatedPosts }),
              })
                .then((response) => {
                  if (response.ok) {
                    toast.success("Post Added successfully !")
                    // You can also update the local state or do other actions as needed
                  } else {
                    toast.error("Error while adding post !")
                  }
                })
                .catch((error) => { 
                  console.error("Error:", error);
                });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };
  

  const handleOpenParentModal = () => {
    setOpenParentModal(true);

    // Automatically open the child modal after 1 second
    timeoutRef.current=setTimeout(() => {
      setOpenParentModal(false);
      setOpenChildModal(true);
    }, 1000);
  };

  const handleCloseParentModal = () => {
    setOpenParentModal(false);
    clearTimeout(timeoutRef.current);
  };

  const handleCloseChildModal = () => {
    setInput("");
    setOpenChildModal(false);
  };

  return (
    <div className="post-maker">
      <div className="first-line">
        <img
          src={avatar}
          alt=""
        />
        <button onClick={handleOpenParentModal}>Start your post</button>
        <Modal
          open={openParentModal}
          onClose={handleCloseParentModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
              >
                  <div className="loading-modal">

                      <FadeLoader color="grey" />
                      <CancelIcon sx={{ position: "absolute", left: "94%", top: "2%", cursor: "pointer" }}
                          onClick={handleCloseParentModal} />
          </div>
        </Modal>
        {openChildModal && (
          <Modal
            open={openChildModal}
            onClose={handleCloseChildModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <div className="child-modal">
            <CancelIcon sx={{ position: "absolute", left: "95%", top: "2%", cursor: "pointer" }}
                onClick={handleCloseChildModal} />
              <div className="top-left">
              <img
             src={avatar}
             alt=""
                />
                <div className="naming">
                  <div className="small-top">
                    <span>{name}</span>
                    <ArrowDropDownIcon sx={{ paddingBottom: "2px", cursor: "pointer" ,fontSize:"2.5rem"}} />
                  </div>
                  <span>Post to Anyone</span>
                </div>
              </div>
              <div className="post-input">
                <textarea type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} />
              </div>
              <div className="smiley">
                <InsertEmoticonIcon sx={{ fontSize: "2.5rem" }} />
                <div className="words words-0">Use emoji</div>
              </div>
              <div className="tabs">
                <div className="photo"><InsertPhotoIcon sx={{fontSize:"2.5rem"}} /></div>
                <div className="words words-1">Add media</div>
                <div className="cal"><CalendarMonthIcon sx={{ fontSize: "2.5rem" }} /></div>
                <div className=" words words-2">Create an event</div>
                <div className="celebration"><CelebrationIcon sx={{ fontSize: "2.5rem" }} /></div>
                <div className=" words words-3">Celebrate an occasion</div>
                <div className="tindots"><MoreHorizIcon sx={{ fontSize: "2.5rem" }} /></div>
                <div className=" words words-4">More</div>
              </div>
              <div style={{height:"1px",backgroundColor:"grey"}}/>
              <div className="ending">
                <div className="clock"><AccessTimeFilledIcon sx={{ fontSize: "2.5rem" }} /></div>  
                <div className=" words words-5">Schedule your post</div>
                <button className={`push-post ${input !== "" ? 'active' : ''}`}
                  onClick={() => { handlePost(); handleCloseChildModal(); }}
                >Post</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className="second-line">
          <div className="label">
          <InsertPhotoIcon sx={{ fontSize: "2.5rem",color:"#378fe9" }} />
            Media
          </div>
          <div className="label">
            <BusinessCenterIcon sx={{ fontSize: "2.5rem",color:"#a872e8" }}/>
            Job
          </div>
          <div className="label">
            <ArticleIcon sx={{ fontSize: "2.5rem",color:"#e16745" }}/>
            Add Article
        </div>
      </div>
    </div>
  );
};

export default PostMaker;
