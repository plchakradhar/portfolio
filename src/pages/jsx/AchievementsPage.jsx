import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/AchievementsPage.css';
import Navigation from '../../common/jsx/Navigation';
import BackgroundAnimations from '../../common/jsx/BackgroundAnimations';

const AchievementsPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const observerRef = useRef(null);

  // Achievements Data
  const achievements = [
    {
      id: 1,
      title: "Orcale Certified Associate",
      image: import.meta.env.BASE_URL + 'assets/certificates/global-oracle.jpg',
      certificateLink: "https://brm-certview.oracle.com/ords/certview/ecertificate?ssn=OC7159408&trackId=OCI25CAA&key=ba2714a642974791d7653beaa72e261110c35fdd",
      category: "Frontend"
    },
    {
      id: 2,
      title: "Cyber Security Analyst Job Simulation",
      image: import.meta.env.BASE_URL + 'assets/certificates/forage.png',
      certificateLink: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_SoXApy3sshTmjpXHn_1751900699946_completion_certificate.pdf",
      category: "Backend"
    },
    {
      id: 3,
      title: "Jenkins - From Zero to Hero Specialization",
      image: import.meta.env.BASE_URL + 'assets/certificates/learnkarts.png',
      certificateLink: "https://www.coursera.org/account/accomplishments/specialization/certificate/E9CLN28MMDJG",
      category: "Programming"
    },
    {
      id: 4,
      title: "CI/CD Pipeline with Docker",
      image: import.meta.env.BASE_URL + 'assets/certificates/cicd.png',
      certificateLink: "https://www.coursera.org/account/accomplishments/verify/7TNIWNDDMCR7",
      category: "Security"
    },
    {
      id: 5,
      title: "Fundamentals of Ansible",
      image: import.meta.env.BASE_URL + 'assets/certificates/redhat.png',
      certificateLink: "https://coursera.org/share/0a44f6756afbace88c569adfa6777f52",
      category: "Database"
    },
    {
      id: 6,
      title: "Advanced Exploitation and Scripting Techniques",
      image: import.meta.env.BASE_URL + 'assets/certificates/packt.png',
      certificateLink: "https://coursera.org/share/60f681feeabb0176f9a09a344917baf0",
      category: "DevOps"
    },
    {
      id: 7,
      title: "Real-Time Cyber Threat Detection and Mitigation",
      image: import.meta.env.BASE_URL + 'assets/certificates/threatdetection.png',
      certificateLink: "https://coursera.org/share/fe0b50d7716cd79ef60ddd15f683aa7b",
      category: "Cloud"
    },
    {
      id: 8,
      title: "CI/CD with Jenkins",
      image: import.meta.env.BASE_URL + 'assets/certificates/cicdjenkins.png',
      certificateLink: "https://coursera.org/share/2a08b0beb4e2e763d58e88271e20cafb",
      category: "Programming"
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Initialize intersection observer
    initScrollAnimations();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const initScrollAnimations = () => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setAnimatedElements(prev => new Set(prev).add(id));
            }
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all scroll-animate elements
    setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        observerRef.current.observe(el);
      });
    }, 100);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    if (isMobile) {
      setShowMenu(false);
    }
  };

  const renderAchievements = () => {
    return achievements.map((achievement, index) => (
      <div 
        key={achievement.id} 
        className="achievement-card scroll-animate"
        data-id={achievement.id}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <a 
          href={achievement.certificateLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="certificate-link"
        >
          <div className="certificate-image-container">
            <img
              src={achievement.image}
              alt={achievement.title}
              className="certificate-image"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/300x200/001a00/00ff00?text=${encodeURIComponent(achievement.title)}`;
              }}
              loading="lazy"
            />
            <div className="view-icon">
              <i className="fas fa-external-link-alt"></i>
            </div>
          </div>
          <div className="certificate-title">
            <h3>{achievement.title}</h3>
          </div>
        </a>
      </div>
    ));
  };

  // Calculate stats
  const totalAchievements = achievements.length;
  const categories = [...new Set(achievements.map(a => a.category))];
  const categoryCount = categories.length;

  return (
    <div className="achievements-page">
      <BackgroundAnimations />
      <Navigation 
        showMenu={showMenu}
        isMobile={isMobile}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        currentPage="achievements"
      />

      <div className={`content-overlay ${showMenu && isMobile ? 'expanded' : ''}`}>
        <main className="main-content">
          <section className="achievements-section">
            {/* Header */}
            <div className="section-header scroll-animate" data-direction="up">
              <h1 className="text-gradient">
                My <span>Achievements</span>
              </h1>
              <p className="subtitle">
                Verified certifications showcasing my expertise and continuous learning journey
              </p>
              <div className="header-divider"></div>
            </div>

            {/* Achievements Grid */}
            <div className="achievements-container">
              <div className="achievements-grid">
                {renderAchievements()}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AchievementsPage;