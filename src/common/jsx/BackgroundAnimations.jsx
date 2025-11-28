import React from 'react';
import '../css/BackgroundAnimations.css';

// Import your video from assets folder
// import backgroundVideo from '../../assets/background-video.mp4';

const BackgroundAnimations = () => {
  return (
    <>
      {/* Video Background */}
      <div className="video-background">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Fallback image
        >
          {/* Use the imported video */}
          <source src="/assets/background-video.mp4" type="video/mp4" />
          {/* Add fallback content */}
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Semi-transparent Black Overlay */}
      <div className="overlay"></div>
      
      {/* Optional: Subtle Hacking Effects */}
      <div className="hacking-effects">
        <div className="scan-line"></div>
        <div className="binary-dots"></div>
      </div>
    </>
  );
};

export default BackgroundAnimations;