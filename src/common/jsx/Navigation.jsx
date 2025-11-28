import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

const Navigation = ({ showMenu, isMobile, toggleMenu, closeMenu, currentPage }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const backgroundMusicRef = useRef(null);

  // Initialize music state from localStorage and setup audio
  useEffect(() => {
    // Create audio element
    backgroundMusicRef.current = new Audio(import.meta.env.BASE_URL + 'sounds/background-music.mp3');
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.3;

    // Load music state from localStorage
    const savedMusicState = localStorage.getItem('musicPlaying');
    if (savedMusicState !== null) {
      const musicState = JSON.parse(savedMusicState);
      setIsMusicPlaying(musicState);
      
      // Start music if it was playing
      if (musicState) {
        backgroundMusicRef.current.play().catch(e => {
          console.log('Autoplay failed, will play on user interaction:', e);
        });
      }
    }

    return () => {
      // Cleanup when component unmounts
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  const toggleBackgroundMusic = () => {
    const newState = !isMusicPlaying;
    setIsMusicPlaying(newState);
    localStorage.setItem('musicPlaying', JSON.stringify(newState));
    
    if (backgroundMusicRef.current) {
      if (newState) {
        backgroundMusicRef.current.play().catch(e => {
          console.log('Music play failed:', e);
        });
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  };

  // Function to manually start music (can be called from other components if needed)
  const startMusic = () => {
    if (backgroundMusicRef.current && !isMusicPlaying) {
      backgroundMusicRef.current.play().catch(e => {
        console.log('Music start failed:', e);
      });
      setIsMusicPlaying(true);
      localStorage.setItem('musicPlaying', 'true');
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        <i className={`fas ${showMenu ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Floating Navigation - Side Menu */}
      <nav className={`floating-nav ${showMenu ? 'show' : isMobile ? 'hidden' : ''}`}>
        <div className="nav-content">
          <div className="nav-header">
            <h2>PL'S World</h2>
          </div>
          
          <div className="nav-links">
            <Link 
              to="/" 
              className={currentPage === 'home' ? 'active' : ''} 
              onClick={closeMenu}
            >
              <i className="fas fa-home"></i>
              <span>HOME</span>
            </Link>
            <Link 
              to="/about" 
              className={currentPage === 'about' ? 'active' : ''} 
              onClick={closeMenu}
            >
              <i className="fas fa-user"></i>
              <span>ABOUT</span>
            </Link>
            <Link 
              to="/projects" 
              className={currentPage === 'projects' ? 'active' : ''} 
              onClick={closeMenu}
            >
              <i className="fas fa-project-diagram"></i>
              <span>PROJECTS</span>
            </Link>
            <Link 
              to="/achievements" 
              className={currentPage === 'achievements' ? 'active' : ''} 
              onClick={closeMenu}
            >
              <i className="fas fa-trophy"></i>
              <span>ACHIEVEMENTS</span>
            </Link>
            <Link 
              to="/techstackpage" 
              className={currentPage === 'techstackpage' ? 'active' : ''} 
              onClick={closeMenu}
            >
              <i className="fas fa-code"></i>
              <span>TECH STACK</span>
            </Link>
            <Link 
              to="/ContactPage" 
              className={currentPage === 'ContactPage' ? 'active' : ''} 
              onClick={closeMenu}
            >
              <i className="fas fa-envelope"></i>
              <span>CONTACT</span>
            </Link>
          </div>
          
          <div className="nav-footer">
            <div className="social-links">
              <a href="https://github.com/plchakradhar" target="_blank" rel="noopener noreferrer" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                <i className="fab fa-instagram"></i>
              </a>
              {/* Music Control Button - Icon Only */}
              <button 
                className={`music-control ${isMusicPlaying ? 'pulse' : ''}`}
                onClick={toggleBackgroundMusic}
                title={isMusicPlaying ? "Music On" : "Music Off"}
              >
                <i className={isMusicPlaying ? "fas fa-volume-up" : "fas fa-volume-mute"}></i>
              </button>
            </div>
            <p>&copy; 2025 P.LAKSHMI CHAKRADHAR<br />All Rights Reserved</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;