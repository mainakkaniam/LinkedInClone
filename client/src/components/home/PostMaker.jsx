import React, { useRef, useState } from 'react';
import "../../sass/PostMaker.scss";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CancelIcon from '@mui/icons-material/Cancel';
import ArticleIcon from '@mui/icons-material/Article';
import FadeLoader from "react-spinners/FadeLoader";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Modal } from '@mui/material';

const PostMaker = () => {
  const timeoutRef = useRef(null);//you need to use useRef here coz assume u use let and then assign timeout to
  //to the setTimeout . When the component is re rendered or executed another timeout variable is created and hence the v
  //value gets lost between re renders
  const [openParentModal, setOpenParentModal] = useState(false);
  const [openChildModal, setOpenChildModal] = useState(false);

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
                onClick={handleCloseParentModal} />
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
                <input type="text" />
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className="second-line">
        {/* Icons and labels */}
      </div>
    </div>
  );
};

export default PostMaker;
