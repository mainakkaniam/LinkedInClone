import React from 'react'
import PostMaker from './PostMaker'
import LeftProfile from './LeftProfile'
import RightNews from './RightNews'
import "../../sass/HomeComponent.scss"
import PostReader from './PostReader'

const HomeComponent = () => {
  return (
    <div className="home-main">
      <div className="left">
        <LeftProfile/>
      </div>
      <div className="middle" style={{display: "flex",flexDirection:"column"}}>
        <PostMaker />
        <PostReader/>
      </div>
      <div className="right">
        <RightNews/>
      </div>
    </div>
  )
}

export default HomeComponent