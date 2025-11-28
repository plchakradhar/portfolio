import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/TechStackPage.css';
import Navigation from '../../common/jsx/Navigation';
import BackgroundAnimations from '../../common/jsx/BackgroundAnimations';

const TechStackPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Enhanced Tech Stack Data with more technologies
const techStack = [
    { name: 'HTML5', icon: 'fab fa-html5', class: 'html5' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', class: 'css3' },
    { name: 'JavaScript', icon: 'fab fa-js-square', class: 'javascript' },
    // { name: 'TypeScript', icon: 'fab fa-js-square', class: 'typescript' },
    { name: 'React', icon: 'fab fa-react', class: 'react' },
    { name: 'Node.js', icon: 'fab fa-node-js', class: 'nodejs' },
    { name: 'Python', icon: 'fab fa-python', class: 'python' },
    { name: 'Java', icon: 'fab fa-java', class: 'java' },
    { name: 'C', icon: 'fas fa-c', class: 'c' },
    { name: 'C++', icon: 'fas fa-code', class: 'cplusplus' },
    { name: 'XAMPP', icon: 'fas fa-server', class: 'xampp' },
    { name: 'MongoDB', icon: 'fas fa-database', class: 'mongodb' },
    { name: 'MySQL', icon: 'fas fa-database', class: 'mysql' },
    { name: 'Git', icon: 'fab fa-git-alt', class: 'git' },
    { name: 'Docker', icon: 'fab fa-docker', class: 'docker' },
    // { name: 'AWS', icon: 'fab fa-aws', class: 'aws' },
    { name: 'GitHub', icon: 'fab fa-github', class: 'github' },
    { name: 'NPM', icon: 'fab fa-npm', class: 'npm' },
    { name: 'Linux', icon: 'fab fa-linux', class: 'linux' },
    // { name: 'Redux', icon: 'fab fa-react', class: 'redux' },
    // { name: 'Sass', icon: 'fab fa-sass', class: 'sass' },
    // { name: 'Bootstrap', icon: 'fab fa-bootstrap', class: 'bootstrap' }
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedTechStack = [...techStack, ...techStack, ...techStack];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    if (isMobile) {
      setShowMenu(false);
    }
  };

  const renderTechStack = () => {
    return duplicatedTechStack.map((tech, index) => (
      <div key={`${tech.name}-${index}`} className="tech-item">
        <div className={`tech-icon ${tech.class}`}>
          <i className={tech.icon}></i>
        </div>
        <span className="tech-name">{tech.name}</span>
      </div>
    ));
  };

  return (
    <div className="techstack-page">
      <BackgroundAnimations />
      <Navigation 
        showMenu={showMenu}
        isMobile={isMobile}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        currentPage="techstack"
      />

      <div className={`content-overlay ${showMenu && isMobile ? 'expanded' : ''}`}>
        <main className="main-content">
          <section className="techstack-section">
            {/* Header */}
            <div className="section-header">
              <h1 className="text-gradient">
                My <span>Tech Stack</span>
              </h1>
              {/* <p className="subtitle">
                Technologies, languages, and tools I work with to build amazing digital experiences
              </p> */}
              <div className="header-divider"></div>
            </div>

            {/* Tech Stack Scrolling Section with Unified Background */}
            <div className="tech-stack-section">
              {/* <h2 className="section-title">Technologies & Tools</h2> */}
              <div className="scrolling-section-wrapper">
                <div className="scrolling-container">
                  <div className="tech-stack-scroll">
                    {renderTechStack()}
                  </div>
                </div>
              </div>
            </div>

            

            {/* Heatmaps Section */}
            <div className="heatmaps-section">
              <h2 className="section-title">Coding Activity</h2>
              <div className="heatmaps-grid">
                {/* GitHub Heatmap */}
                <div className="heatmap-card">
                  <div className="heatmap-header">
                    <div className="heatmap-icon">
                      <i className="fab fa-github"></i>
                    </div>
                    <h3 className="heatmap-title">GitHub Contributions</h3>
                  </div>
                  <div className="heatmap-container">
                    <div className="heatmap-placeholder">
                      <i className="fas fa-chart-bar" style={{fontSize: '2rem', marginBottom: '1rem', display: 'block'}}></i>
                      GitHub Contribution Heatmap
                      <br />
                      <span style={{fontSize: '0.9rem', opacity: '0.7'}}>
                        Click button to view profile
                      </span>
                    </div>
                  </div>
                  <a 
                    href="https://github.com/plchakradhar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="heatmap-link"
                  >
                    View GitHub Profile
                  </a>
                </div>

                {/* LeetCode Heatmap */}
                <div className="heatmap-card">
                  <div className="heatmap-header">
                    <div className="heatmap-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <h3 className="heatmap-title">CodeChef Activity</h3>
                  </div>
                  <div className="heatmap-container">
                    <div className="heatmap-placeholder">
                      <i className="fas fa-laptop-code" style={{fontSize: '2rem', marginBottom: '1rem', display: 'block'}}></i>
                      CodeChef Submission Heatmap
                      <br />
                      <span style={{fontSize: '0.9rem', opacity: '0.7'}}>
                        Problem solving activity
                      </span>
                    </div>
                  </div>
                  <a 
                    href="https://www.codechef.com/users/klu2300039016" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="heatmap-link"
                  >
                    View CodeChef Profile
                  </a>
                </div>

                {/* HackerRank Heatmap */}
                <div className="heatmap-card">
                  <div className="heatmap-header">
                    <div className="heatmap-icon">
                      <i className="fab fa-hackerrank"></i>
                    </div>
                    <h3 className="heatmap-title">HackerRank Progress</h3>
                  </div>
                  <div className="heatmap-container">
                    <div className="heatmap-placeholder">
                      <i className="fas fa-chart-line" style={{fontSize: '2rem', marginBottom: '1rem', display: 'block'}}></i>
                      HackerRank Coding Activity
                      <br />
                      <span style={{fontSize: '0.9rem', opacity: '0.7'}}>
                        Challenge participation
                      </span>
                    </div>
                  </div>
                  <a 
                    href="https://www.hackerrank.com/profile/plchakradhar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="heatmap-link"
                  >
                    View HackerRank Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
              <h2 className="section-title">Coding Statistics</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Technologies</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Years Coding</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Commits</div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            {/* <div className="cta-section">
              <div className="cta-content">
                <h2>Ready to Build Something Amazing?</h2>
                <p>
                  With a diverse tech stack and continuous learning mindset, I'm always ready to take on new challenges 
                  and create innovative solutions. Let's collaborate on your next project!
                </p>
                <div className="cta-buttons">
                  <Link to="/projects" className="cta-btn primary">
                    <i className="fas fa-project-diagram"></i>
                    View Projects
                  </Link>
                  <Link to="/contact" className="cta-btn secondary">
                    <i className="fas fa-paper-plane"></i>
                    Get In Touch
                  </Link>
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-btn primary"
                  >
                    <i className="fab fa-github"></i>
                    GitHub
                  </a>
                </div>
              </div>
            </div> */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default TechStackPage;