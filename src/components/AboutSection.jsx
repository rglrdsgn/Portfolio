import React from 'react';

function AboutSection() {
  return (
    <section className="content-section" id="about" style={{background: '#080808', minHeight: 'auto', padding: '150px 5%'}}>        
      <div className="contact-container">
        <h2 className="chrome-text" style={{fontSize: '3rem'}}>ABOUT</h2>
        <p style={{fontFamily: 'var(--font-tech)', marginTop: '20px', color: '#888', lineHeight: '1.6'}}>
            Specializing in Professional Kit Design & Hyper-realistic 3D Mockups. Available for Club Commissions and Digital Assets.
        </p>
      </div>
    </section>
  );
}
export default AboutSection;