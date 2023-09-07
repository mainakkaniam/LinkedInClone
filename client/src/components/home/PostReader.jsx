import React, { useEffect, useState } from 'react'
import "../../sass/PostReader.scss"
import ClampLines from 'react-clamp-lines';
import { readDoc } from '../../api/FirestoreAPI'
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const PostReader = () => {
  const [truncated, setTruncated] = useState(true);
  const [nobutton, setNoButton] = useState(false);
    const text=`React is the most popular frontend JS library as of today,
    from early age startups to giant tech companies,
    most of them are using React in production.
    And with it's new versions coming in,
    it will continue to dominate the frontend space, even more!
    
    React FTW 🚀
    
    If you're starting today,
    go ahead and start learning React,
    once you're confident with react, only then move to a React framework!
    
    Cheers`;
    useEffect(() => {
        async function fetchData() {
            try {
              const documents = await readDoc();
              console.log(documents); // Use the documents array here
            } catch (error) {
              console.error("Error fetching data: ", error);
            }
          }
          
          fetchData();
    }, [])
    
  return (
      <div className="post-reader">
          <div className="top-left2">
              <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGv0ZIrLidHrXmxdSY38qwW3_FyQZhJo-sFQ&usqp=CAU" alt="" />
              <div className="description">
                  <div className="name">
                      Henry Ruthville
                  </div>
                  <div className="about">
                      Cofounder of multi....
                  </div>
              </div>
      </div>
      <div className="top-right">
        <MoreHorizIcon/>
        <CancelIcon />
      </div>
      <div className="post">
        <p className={truncated?"p":""}>
        {text}
        </p>
        <button className={`more ${nobutton ? "nobutton" : ""}`}
          onClick={() => {
            setTruncated(false);
            setNoButton(true);
        }}>see more</button>                     
      </div>
      <div className="border" style={{height: "1px",backgroundColor: "grey",marginTop: "28px",marginBottom: "10px"}} />
      <div className="icons" style={{ width: "100%" }}>
        <div><ThumbUpAltOutlinedIcon fontSize="large" />
              Like
        </div>
        <div><MessageOutlinedIcon fontSize="large" />
             Comment
        </div>
        <div><RepeatOutlinedIcon fontSize="large" />
        Repost
        </div>
        <div><SendOutlinedIcon fontSize="large" />
        Share
        </div>
      </div>
    </div>
  )
}

export default PostReader