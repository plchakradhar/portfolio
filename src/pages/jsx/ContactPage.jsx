import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ContactPage.css';
import Navigation from '../../common/jsx/Navigation';
import BackgroundAnimations from '../../common/jsx/BackgroundAnimations';

const ContactPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Your contact details - Update these with your actual information
  const contactDetails = {
    email: 'plchakradhar@gmail.com', // Replace with your Gmail
    location: 'Proddatur, India',
    github: 'plchakradhar',
    linkedin: 'plchakradhar',
    instagram: 'pl.chakradhar'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email content
    const emailSubject = `Portfolio Contact: ${formData.subject}`;
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from your portfolio contact form.
    `.trim();

    // Encode for mailto URL
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);

    // Create mailto link
    const mailtoLink = `mailto:${contactDetails.email}?subject=${encodedSubject}&body=${encodedBody}`;

    // Open email client
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  const handleSocialClick = (platform) => {
    const urls = {
      github: `https://github.com/${contactDetails.github}`,
      linkedin: `https://linkedin.com/in/${contactDetails.linkedin}`,
      instagram: `https://instagram.com/${contactDetails.instagram}`
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <div className="contact-page">
      <BackgroundAnimations />
      <Navigation 
        showMenu={showMenu}
        isMobile={isMobile}
        toggleMenu={() => setShowMenu(!showMenu)}
        closeMenu={() => isMobile && setShowMenu(false)}
        currentPage="contact"
      />

      <div className={`content-overlay ${showMenu && isMobile ? 'expanded' : ''}`}>
        <main className="main-content">
          <section className="contact-section">
            {/* Header */}
            <div className="section-header">
              <h1 className="text-gradient">
                Get In <span>Touch</span>
              </h1>
              <p className="subtitle">
                Have a project in mind? Let's discuss how we can work together to bring your ideas to life!
              </p>
              <div className="header-divider"></div>
            </div>

            {/* Contact Container */}
            <div className="contact-container">
              {/* Contact Information */}
              <div className="contact-info">
                <div className="info-header">
                  <h2>Contact Information</h2>
                  <p>Feel free to reach out through any of these channels</p>
                </div>

                <div className="contact-details">
                  <a href={`mailto:${contactDetails.email}`} className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <h3>Email</h3>
                      <p>{contactDetails.email}</p>
                    </div>
                  </a>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-text">
                      <h3>Location</h3>
                      <p>{contactDetails.location}</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-text">
                      <h3>Response Time</h3>
                      <p>Within 24 hours</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="contact-text">
                      <h3>Availability</h3>
                      <p>Open for new projects</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="social-links">
                  <a 
                    href="#" 
                    className="social-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick('github');
                    }}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a 
                    href="#" 
                    className="social-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick('linkedin');
                    }}
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a 
                    href="#" 
                    className="social-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick('instagram');
                    }}
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href={`mailto:${contactDetails.email}`} 
                    className="social-link"
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-section">
                <div className="form-header">
                  <h2>Send Message</h2>
                  <p>Fill out the form and I'll get back to you ASAP</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell me about your project, timeline, budget, or any specific requirements..."
                      required
                      minLength="10"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Preparing Email...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message via Gmail
                      </>
                    )}
                  </button>

                  {isSubmitted && (
                    <div className="success-message">
                      {/* <h3>✅ Message Ready!</h3> */}
                      {/* <p>Your email client is opening with the message pre-filled. Please review and click send to complete the process.</p> */}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Map Section */}
            {/* <div className="map-section">
              <h2>Location</h2>
              <div className="map-placeholder">
                <i className="fas fa-map-marked-alt"></i>
                <h3>Based in {contactDetails.location}</h3>
                <p>Available for remote work and collaborations worldwide</p>
              </div>
            </div> */}

            {/* CTA Section */}
            {/* <div className="cta-section">
              <div className="cta-content">
                <h2>Ready to Start Your Project?</h2>
                <p>
                  I'm currently available for freelance work and new opportunities. 
                  Whether you have a project in mind or just want to chat about potential collaboration, I'd love to hear from you!
                </p>
                <div className="cta-buttons">
                  <a 
                    href={`mailto:${contactDetails.email}`} 
                    className="cta-btn primary"
                  >
                    <i className="fas fa-envelope"></i>
                    Send Direct Email
                  </a>
                  <Link to="/projects" className="cta-btn secondary">
                    <i className="fas fa-project-diagram"></i>
                    View My Work
                  </Link>
                  <a 
                    href={`https://github.com/${contactDetails.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-btn primary"
                  >
                    <i className="fab fa-github"></i>
                    Check GitHub
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

export default ContactPage;