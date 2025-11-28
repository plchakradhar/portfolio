import React, { useState, useEffect, useRef } from 'react';
import '../css/AboutPage.css';
import Navigation from '../../common/jsx/Navigation';
import BackgroundAnimations from '../../common/jsx/BackgroundAnimations';

const AboutPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  
  const sectionRefs = {
    personal: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    skills: useRef(null),
    languages: useRef(null)
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    // Observe all sections
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
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

  // Skills data with icons
  const skillCategories = [
    {
      title: "Development",
      icon: "fas fa-laptop-code",
      skills: [
        { name: "Full Stack Web Development", percentage: 80, icon: "fas fa-code" },
        { name: "Competitive Programming", percentage: 70, icon: "fas fa-trophy" },
        { name: "Database Management", percentage: 70, icon: "fas fa-database" }
      ]
    },
    {
      title: "Creative & Security",
      icon: "fas fa-shield-alt",
      skills: [
        { name: "Cyber Security", percentage: 40, icon: "fas fa-user-shield" },
        { name: "Video Editing", percentage: 85, icon: "fas fa-video" },
        { name: "Photo Editing & Design", percentage: 85, icon: "fas fa-palette" }
      ]
    }
  ];

  return (
    <div className="about-page">
      {/* Common Background Animations */}
      <BackgroundAnimations />

      {/* Common Navigation */}
      <Navigation 
        showMenu={showMenu}
        isMobile={isMobile}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        currentPage="about"
      />

      {/* Main Content */}
      <div className={`content-overlay ${showMenu && isMobile ? 'expanded' : ''}`}>
        <main className="main-content">
          <section className="about-section">
            {/* Section Header */}
            <div className="section-header animate-fade-in">
              <h1 className="text-gradient">About <span>Me</span></h1>
              <p className="subtitle">Get to know me better</p>
              <div className="header-divider"></div>
            </div>

            {/* Personal Info Section */}
            <div 
              id="personal"
              ref={sectionRefs.personal}
              className={`personal-info scroll-animation ${isVisible.personal ? 'animate-left' : ''}`}
            >
              <div className="info-card">
                <div className="info-image">
                  <img 
                    src={process.env.PUBLIC_URL + '/assets/chakri-profile.jpg'} 
                    alt="P. Lakshmi Chakradhar" 
                    className="profile-img"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500/00ff00/000000?text=P.+LAKSHMI+CHAKRADHAR';
                    }}
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="info-content">
                  <div className="info-header">
                    <h1>Pothuganti Lakshmi Chakradhar</h1>
                    <h3 className="text-gradient">BTech Computer Science Engineer</h3>
                  </div>
                  
                  <p className="bio">
                    Innovative problem solver passionate about developing cutting-edge solutions and exploring emerging technologies. 
                    With a strong foundation in computer science and hands-on experience in various domains, I strive to create impactful solutions.
                  </p>
                  
                  <div className="personal-details">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <i className="fas fa-birthday-cake"></i>
                      </div>
                      <div className="detail-text">
                        <span className="detail-label">Date of Birth</span>
                        <p className="detail-value">18 August 2006</p>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="detail-text">
                        <span className="detail-label">Email</span>
                        <p className="detail-value">plchakradhar@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-icon">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div className="detail-text">
                        <span className="detail-label">Phone</span>
                        <p className="detail-value">+91 9398429136</p>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="detail-text">
                        <span className="detail-label">Location</span>
                        <p className="detail-value">Proddatur, India</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="resume-buttons">
                    <a href="/assets/PothugantiLakshmiChakradharResume.pdf" className="btn btn-primary" download>
                      <i className="fas fa-download"></i> Download Resume
                    </a>
                    <a href="/assets/PothugantiLakshmiChakradharResume.pdf" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-eye"></i> View Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div 
              id="experience"
              ref={sectionRefs.experience}
              className={`experience-section scroll-animation ${isVisible.experience ? 'animate-right' : ''}`}
            >
              <div className="section-title-container">
                <h2 className="section-title">
                  <i className="fas fa-briefcase"></i> Work Experience
                </h2>
                <div className="title-divider"></div>
              </div>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content-wrapper">
                    <div className="timeline-date">2023 - 2024</div>
                    <div className="timeline-content">
                      <h3>CodeOn Technologies</h3>
                      <div className="timeline-company">Web Development Intern</div>
                      <p className="timeline-description">
                        Web Development & UI/UX Design – Built and optimized responsive web pages using HTML, CSS, and JavaScript, 
                        enhanced interfaces with modern, user-friendly designs and animations, and collaborated with a team to 
                        integrate APIs and test real-world application functionalities.
                      </p>
                      <div className="tech-used">
                        <span className="tech-tag">Figma</span>
                        <span className="tech-tag">HTML</span>
                        <span className="tech-tag">CSS</span>
                        <span className="tech-tag">JavaScript</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div 
              id="education"
              ref={sectionRefs.education}
              className={`education-section scroll-animation ${isVisible.education ? 'animate-left' : ''}`}
            >
              <div className="section-title-container">
                <h2 className="section-title">
                  <i className="fas fa-graduation-cap"></i> Education
                </h2>
                <div className="title-divider"></div>
              </div>
              
              <div className="education-grid">
                <div className="education-card">
                  <div className="edu-header">
                    <div className="edu-logo">
                      <i className="fas fa-university"></i>
                    </div>
                    <div className="edu-title">
                      <h3>KL University</h3>
                      <h4>BTech in Computer Science & Engineering</h4>
                    </div>
                  </div>
                  <div className="edu-details">
                    <div className="edu-detail">
                      <i className="fas fa-calendar-alt"></i>
                      <span>2024 - PRESENT</span>
                    </div>
                    <div className="edu-detail">
                      <i className="fas fa-percentage"></i>
                      <span>GPA: 9.02/10</span>
                    </div>
                  </div>
                  {/* <div className="edu-status current">Current</div> */}
                </div>
                
                <div className="education-card">
                  <div className="edu-header">
                    <div className="edu-logo">
                      <i className="fas fa-school"></i>
                    </div>
                    <div className="edu-title">
                      <h3>SV Govt. Polytechnic</h3>
                      <h4>Diploma In Computer Engineering</h4>
                    </div>
                  </div>
                  <div className="edu-details">
                    <div className="edu-detail">
                      <i className="fas fa-calendar-alt"></i>
                      <span>2021 - 2024</span>
                    </div>
                    <div className="edu-detail">
                      <i className="fas fa-percentage"></i>
                      <span>GPA: 7.4/10</span>
                    </div>
                  </div>
                  {/* <div className="edu-status completed">Completed</div> */}
                </div>
                
                <div className="education-card">
                  <div className="edu-header">
                    <div className="edu-logo">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="edu-title">
                      <h3>Sri Chaitanya Techno School</h3>
                      <h4>High School (10th Grade)</h4>
                    </div>
                  </div>
                  <div className="edu-details">
                    <div className="edu-detail">
                      <i className="fas fa-calendar-alt"></i>
                      <span>2020 - 2021</span>
                    </div>
                    <div className="edu-detail">
                      <i className="fas fa-percentage"></i>
                      <span>Marks: 597/600</span>
                    </div>
                  </div>
                  {/* <div className="edu-status completed">Completed</div> */}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div 
              id="skills"
              ref={sectionRefs.skills}
              className={`skills-section scroll-animation ${isVisible.skills ? 'animate-right' : ''}`}
            >
              <div className="section-title-container">
                <h2 className="section-title">
                  <i className="fas fa-code"></i> Technical Skills
                </h2>
                <div className="title-divider"></div>
              </div>
              
              <div className="skills-categories">
                {skillCategories.map((category, index) => (
                  <div key={index} className="skill-category">
                    <div className="category-header">
                      <i className={category.icon}></i>
                      <h3>{category.title}</h3>
                    </div>
                    <div className="skills-container">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="skill-item">
                          <div className="skill-info">
                            <div className="skill-icon">
                              <i className={skill.icon}></i>
                            </div>
                            <div className="skill-details">
                              <span className="skill-name">{skill.name}</span>
                              <span className="skill-percentage">{skill.percentage}%</span>
                            </div>
                          </div>
                          <div className="skill-bar">
                            <div 
                              className="skill-progress" 
                              style={{ width: `${skill.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div 
              id="languages"
              ref={sectionRefs.languages}
              className={`languages-section scroll-animation ${isVisible.languages ? 'animate-left' : ''}`}
            >
              <div className="section-title-container">
                <h2 className="section-title">
                  <i className="fas fa-language"></i> Languages
                </h2>
                <div className="title-divider"></div>
              </div>
              
              <div className="languages-grid">
                <div className="language-card">
                  <div className="language-header">
                    <div className="language-info">
                      <i className="fas fa-flag-usa"></i>
                      <span className="language-name">English</span>
                    </div>
                    <span className="language-level">Fluent</span>
                  </div>
                  <div className="language-progress">
                    <div className="progress-dots">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-circle active"></i>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="language-card">
                  <div className="language-header">
                    <div className="language-info">
                      <i className="fas fa-flag"></i>
                      <span className="language-name">Telugu</span>
                    </div>
                    <span className="language-level">Native</span>
                  </div>
                  <div className="language-progress">
                    <div className="progress-dots">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-circle active"></i>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="language-card">
                  <div className="language-header">
                    <div className="language-info">
                      <i className="fas fa-flag"></i>
                      <span className="language-name">Hindi</span>
                    </div>
                    <span className="language-level">Basic</span>
                  </div>
                  <div className="language-progress">
                    <div className="progress-dots">
                      <i className="fas fa-circle active"></i>
                      <i className="fas fa-circle"></i>
                      <i className="fas fa-circle"></i>
                      <i className="fas fa-circle"></i>
                      <i className="fas fa-circle"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AboutPage;