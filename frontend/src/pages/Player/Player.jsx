import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import video1 from '../../videos/video1.mp4'
import video2 from '../../videos/video2.mp4'
import video3 from '../../videos/video3.mp4'
import video4 from '../../videos/video4.mp4'
import './player.css'

const Player = () => {
    const videos=[
    
        {
            url: video1 || "https://youtu.be/LSdpASKfVGo?si=sgjCP_kWlNGWlbC9",
            introDuration: 10, 
          },
          {
            url: video2 || "https://youtu.be/UfPIUvCg3ps?si=SoAzbyjR-HqMm2tO",
            introDuration: 15,
          },
          {
            url: video3 || "https://youtu.be/UP8d21vKvIU?si=JKarvnY8_NK_TECU",
            introDuration: 10, 
          },
          {
            url: video4 || "https://youtu.be/WCnIP_F8n3w?si=tpYy4VwQt33Wbwk1",
            introDuration: 15,
          },
    ]

    const [currentVideo, setCurrentVideo] = useState(0);
    const [skipIntro, setSkipIntro] = useState(false);
    const [videoQuality, setVideoQuality] = useState('auto');
    const [showSkipIntro, setShowSkipIntro] = useState(true);
    

    const handleVideoEnd = () => {
        setCurrentVideo((prevVideo) => (prevVideo + 1) % videos.length);
        setSkipIntro(false);
        setShowSkipIntro(true);
      };

    const handleSkipIntroToggle = () => {
        setSkipIntro(!skipIntro);
        setShowSkipIntro(false);
      };
    
      const handleVideoQualityChange = (quality) => {
        setVideoQuality(quality);
      };
    
      const getCurrentVideoUrl = () => {
        const selectedVideo = videos[currentVideo];
        const introTime = skipIntro ? selectedVideo.introDuration : 0;
        return `${selectedVideo.url}#t=${introTime}`;
      };

      useEffect(() => {
        const randomIndex = Math.floor(Math.random() * videos.length);
        setCurrentVideo(randomIndex);
      }, []);

     
      useEffect(() => {
        setShowSkipIntro(true);
        if (skipIntro) {
          const timeoutId = setTimeout(() => {
            setShowSkipIntro(false);
          }, videos[currentVideo].introDuration * 1000);
          return () => clearTimeout(timeoutId);
        }
    
      }, [skipIntro, currentVideo, videos]);
  return (
    <div className='video-player-container'>
      <ReactPlayer
        url={getCurrentVideoUrl()}
        playing={true}
        controls={true}
        onEnded={handleVideoEnd}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload', 
            },
            tracks: [],
          },
        }}
        width="100%"
        height="100vh"
      />
      <div className="control-btns">
      {showSkipIntro && (
        <div className={`skip-intro-checkbox ${skipIntro ? 'hidden' : ''}`}>
          <label>
            Skip Intro
            <input
              type="checkbox"
              checked={skipIntro}
              onChange={handleSkipIntroToggle}
            />
          </label>
        </div>
      )}
      <div  className='quality-btn'>
       
          <select
            value={videoQuality}
            onChange={(e) => handleVideoQualityChange(e.target.value)}
          >
            <option value="auto">Auto</option>
            <option value="hd">HD</option>
          </select>
       
      </div>
      </div>
      
    </div>
  )
}

export default Player
