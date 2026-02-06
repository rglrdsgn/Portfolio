import React from 'react';

function ContactSection() {
  const year = new Date().getFullYear();

  return (
    <>
    <section className="content-section" id="contact" style={{background: '#080808', minHeight: 'auto', padding: '150px 5%'}}>
        <div className="contact-container">
            <h2 className="chrome-text" style={{fontSize: '3rem'}}>CONTACT</h2>
            <div className="social-grid">
                <a href="https://instagram.com/rglrdesign" className="social-btn" target="_blank" rel="noreferrer"><i className="ri-instagram-line"></i></a>
                <a href="https://wa.me/+393454811136" className="social-btn" target="_blank" rel="noreferrer"><i className="ri-whatsapp-fill"></i></a>
                <a href="mailto:rglrdsgn@gmail.com" className="social-btn"><i className="ri-mail-fill"></i></a>
                <a href="https://twitter.com/rglrdesign" className="social-btn" target="_blank" rel="noreferrer"><i className="ri-twitter-x-line"></i></a>
                <a href="https://www.linkedin.com/in/alessio-cotardo-a47708247" className="social-btn" target="_blank" rel="noreferrer"><i className="ri-linkedin-fill"></i></a>
            </div>
        </div>
    </section>

    <footer>
        &copy; {year} rglr design. All rights reserved.
    </footer>
    </>
  );
}
export default ContactSection;