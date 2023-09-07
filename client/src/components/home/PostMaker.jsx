import React, { useRef, useState } from 'react';
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
import { handlePost } from '../../api/FirestoreAPI';

const PostMaker = () => {
  const timeoutRef = useRef(null);//you need to use useRef here coz assume u use let and then assign timeout to
  //to the setTimeout . When the component is re rendered or executed another timeout variable is created and hence the v
  //value gets lost between re renders
  const [openParentModal, setOpenParentModal] = useState(false);
  const [openChildModal, setOpenChildModal] = useState(false);
  const [input, setInput] = useState("");

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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGv0ZIrLidHrXmxdSY38qwW3_FyQZhJo-sFQ&usqp=CAU"
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
             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGv0ZIrLidHrXmxdSY38qwW3_FyQZhJo-sFQ&usqp=CAU"
             alt=""
                />
                <div className="naming">
                  <div className="small-top">
                    <span>Lionel Messi</span>
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
                  onClick={() => { handlePost(input); handleCloseChildModal(); }}
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
