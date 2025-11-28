import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/ProjectsPage.css';
import Navigation from '../../common/jsx/Navigation';
import BackgroundAnimations from '../../common/jsx/BackgroundAnimations';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);
  const statsRef = useRef(null);

  const projects = {
    completed: [
      {
        id: 1,
        title: "Online Doctor Appointment System",
        description: "A comprehensive platform enabling patients to book, manage, and track medical appointments with healthcare providers through an intuitive interface.",
        image: process.env.PUBLIC_URL + '/assets/projects/sams/sams3.png',
        technologies: [],
        liveDemo: "https://plchakradhar.github.io/SAMS/",
        github: "https://github.com/plchakradhar/prescripto-healthcare.git",
        features: [],
        award: false
      },
      {
        id: 2,
        title: "SAMS - Student Attendance Management System",
        description: "Full-stack attendance management system with real-time tracking, reporting, and analytics for educational institutions.",
        images: [
          process.env.PUBLIC_URL + '/assets/projects/sams/sams1.png',
          process.env.PUBLIC_URL + '/assets/projects/sams/sams2.png',
          process.env.PUBLIC_URL + '/assets/projects/sams/sams3.png',
          process.env.PUBLIC_URL + '/assets/projects/sams/sams4.png'
        ],
        technologies: [],
        liveDemo: "https://plchakradhar.github.io/SAMS/",
        github: "https://github.com/plchakradhar/SAMS.git",
        features: [],
        award: true
      },
      {
        id: 3,
        title: "Employee Management System",
        description:"Full-stack employee management system with real-time tracking, reporting, and analytics for IT company.",
        images: [
          process.env.PUBLIC_URL + '/assets/projects/ems/ems1.png',
          process.env.PUBLIC_URL + '/assets/projects/ems/ems2.png',
          process.env.PUBLIC_URL + '/assets/projects/ems/esm3.png',
          process.env.PUBLIC_URL + '/assets/projects/ems/ems4.png',
          process.env.PUBLIC_URL + '/assets/projects/ems/ems5.png',
          process.env.PUBLIC_URL + '/assets/projects/ems/ems6.png'
        ],
        technologies: [],
        liveDemo: "https://plchakradhar.github.io/SAMS/",
        github: "https://github.com/plchakradhar/SAMS.git",
        features: [],
        award: true
      }
    ],
    ongoing: [
      // {
      // id: 3,
      // title: "Random Video Call Platform",
      // description: "A real-time video communication platform with secure peer-to-peer connections and interactive features.",
      // image: "/src/assets/projects/video-call.jpg",
      // technologies: ["WebRTC", "Socket.io", "React", "Node.js", "PostgreSQL"],
      // liveDemo: "#",
      // github: "#",
      // status: "ongoing",
      // progress: 25,
      // features: ["P2P connections", "Screen sharing", "Chat functionality", "User authentication"],
      // award: false
      // }
    ],
    upcoming: [
    // {
    // id: 4,
    // title: "AI-Powered Code Review Assistant",
    // description: "Intelligent code analysis tool that provides automated code reviews and suggestions using machine learning.",
    // image: "/src/assets/projects/ai-code.jpg",
    // technologies: ["Python", "TensorFlow", "FastAPI", "React", "Docker"],
    // liveDemo: "#",
    // github: "#",
    // status: "upcoming",
    // features: ["AI code analysis", "Security detection", "Performance optimization", "GitHub integration"],
    // award: false
    // }
    ]
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
   
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => new Set(prev).add(entry.target));
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
      '.section-header, .project-card, .stat-card'
    );
    animatableElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    if (isMobile) {
      setShowMenu(false);
    }
  };

  const filterProjects = (category) => {
    setActiveFilter(category);
  };

  const ProjectCard = ({ project, index }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    // Auto-slide images every 3 seconds
    useEffect(() => {
      if (!project.images || project.images.length <= 1) return;
      const interval = setInterval(() => {
        if (isHovered) return; // Pause on hover
       
        setCurrentImageIndex((prevIndex) =>
          prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }, [project.images, isHovered]);

    const handleNextImage = () => {
      if (!project.images) return;
      setCurrentImageIndex(prev =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    };

    const handlePrevImage = () => {
      if (!project.images) return;
      setCurrentImageIndex(prev =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    };

    // Fallback if images array is not provided
    const displayImage = project.images
      ? project.images[currentImageIndex]
      : project.image;

    // Determine animation direction based on index
    const animationDirection = index % 2 === 0 ? 'slide-in-left' : 'slide-in-right';

    return (
      <div 
        ref={cardRef}
        key={project.id} 
        className={`project-card ${visibleElements.has(cardRef.current) ? animationDirection : 'hidden'}`}
        data-status={project.status}
      >
        <div className="project-header">
          <div
            className="project-image"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={displayImage}
              alt={project.title}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/400x200/00ff00/000000?text=${project.title.split(' ')[0]}`;
              }}
            />
           
            {/* Image Navigation Dots */}
            {project.images && project.images.length > 1 && (
              <div className="image-dots">
                {project.images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></span>
                ))}
              </div>
            )}
            {/* Navigation Arrows for Manual Control */}
            {project.images && project.images.length > 1 && isHovered && (
              <>
                <button className="nav-arrow prev" onClick={handlePrevImage}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="nav-arrow next" onClick={handleNextImage}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}
            <div className="project-overlay">
              <div className="project-actions">
                {project.liveDemo !== '#' && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="action-btn">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                )}
                {project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="action-btn">
                    <i className="fab fa-github"></i>
                  </a>
                )}
              </div>
            </div>
            {project.award && (
              <div className="award-badge">
                <i className="fas fa-trophy"></i>
                <span>Featured</span>
              </div>
            )}
          </div>
        </div>
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
         
          {project.features && project.features.length > 0 && (
            <div className="project-features">
              {project.features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  <i className="fas fa-check"></i>
                  {feature}
                </span>
              ))}
            </div>
          )}
          {project.technologies && project.technologies.length > 0 && (
            <div className="project-tech">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          )}
          {project.status === 'ongoing' && (
            <div className="project-progress">
              <div className="progress-info">
                <span>Development Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${project.progress}%`,
                    background: '#ffc107'
                  }}
                ></div>
              </div>
            </div>
          )}
          <div className="project-links">
            {project.liveDemo !== '#' && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-link demo">
                <i className="fas fa-external-link-alt"></i>
                Live Demo
              </a>
            )}
            {project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-link code">
                <i className="fab fa-github"></i>
                Source Code
              </a>
            )}
            {project.status === 'upcoming' && (
              <button className="btn-link upcoming">
                <i className="fas fa-clock"></i>
                Coming Soon
              </button>
            )}
          </div>
        </div>
        <div className="project-glow"></div>
      </div>
    );
  };

  const renderProjects = () => {
    let filteredProjects = [];
   
    if (activeFilter === 'all') {
      filteredProjects = [
        ...projects.completed,
        ...projects.ongoing,
        ...projects.upcoming
      ];
    } else {
      filteredProjects = projects[activeFilter] || [];
    }

    return filteredProjects.map((project, index) => (
      <ProjectCard key={project.id} project={project} index={index} />
    ));
  };

  return (
    <div className="projects-page">
      <BackgroundAnimations />
      <Navigation
        showMenu={showMenu}
        isMobile={isMobile}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        currentPage="projects"
      />
      <div className={`content-overlay ${showMenu && isMobile ? 'expanded' : ''}`}>
        <main className="main-content">
          <section ref={sectionRef} className="projects-section">
            <div className={`section-header ${visibleElements.has(sectionRef.current) ? 'fade-in-up' : 'hidden'}`}>
              <h1 className="text-gradient">My <span>Projects</span></h1>
              <p className="subtitle">Building digital solutions that make a difference</p>
              <div className="header-divider"></div>
            </div>
            
            <div className="projects-container">
              <div className="projects-grid">
                {renderProjects()}
              </div>
            </div>
            
            <div ref={statsRef} className="projects-stats">
              <div className={`stat-card ${visibleElements.has(statsRef.current) ? 'slide-in-left' : 'hidden'}`}>
                <div className="stat-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-content">
                  <h3>{projects.completed.length}</h3>
                  <p>Completed</p>
                </div>
              </div>
              <div className={`stat-card ${visibleElements.has(statsRef.current) ? 'fade-in-up' : 'hidden'}`}>
                <div className="stat-icon">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <div className="stat-content">
                  <h3>{projects.ongoing.length}</h3>
                  <p>In Progress</p>
                </div>
              </div>
              <div className={`stat-card ${visibleElements.has(statsRef.current) ? 'fade-in-up' : 'hidden'}`}>
                <div className="stat-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <div className="stat-content">
                  <h3>{projects.upcoming.length}</h3>
                  <p>Coming Soon</p>
                </div>
              </div>
              <div className={`stat-card ${visibleElements.has(statsRef.current) ? 'slide-in-right' : 'hidden'}`}>
                <div className="stat-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div className="stat-content">
                  <h3>{projects.completed.length + projects.ongoing.length + projects.upcoming.length}</h3>
                  <p>Total Projects</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;