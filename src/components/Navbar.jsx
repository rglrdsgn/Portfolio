import { motion } from 'framer-motion'; // Assicurati di aver installato framer-motion

function Navbar({ activeSection }) {
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Lista delle voci di menu per generarle dinamicamente
  const navItems = [
    { id: 'home', icon: 'ri-home-5-fill', text: 'HOME' },
    { id: 'map', icon: 'ri-earth-fill', text: 'WORLD' },
    { id: 'archive', icon: 'ri-layout-grid-fill', text: 'ARCHIVE' },
    { id: 'about', icon: 'ri-user-3-line', text: 'ABOUT' },
  ];

  return (
    <header id="site-header">
      <div className="logo-container">
        <a href="#" className="logo-link">
          <img src="/assets/logo.png" alt="rglr" id="site-logo" />
        </a>
      </div>

      <nav className="nav-wrapper">
        <div className="nav-dock glass-panel main-dock" style={{position: 'relative'}}>
          
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <div 
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`} 
                onClick={() => scrollToSection(item.id)}
                style={{position: 'relative', zIndex: 1}} // Z-index per stare sopra al blob
              >
                {/* IL BLOB MAGICO (Nav Indicator) */}
                {isActive && (
                  <motion.div
                    layoutId="nav-blob" // Questo ID magico fa scivolare l'elemento tra i vari item!
                    className="nav-indicator"
                    style={{
                      position: 'absolute',
                      top: '0px', left: '0', right: '0', bottom: '0px', // Adatta allo stile CSS
                      height: 'auto', width: '100%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '30px',
                      zIndex: -1 // Sta dietro al testo
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  />
                )}
                
                <i className={`${item.icon} nav-icon`}></i>
                <span className="nav-text">{item.text}</span>
              </div>
            );
          })}

        </div>
        
        {/* Pulsante Contatti separato */}
        <div 
          className={`contact-pill glass-panel ${activeSection === 'contact' ? 'active' : ''}`} 
          onClick={() => scrollToSection('contact')}
        >
            <i className="ri-chat-3-fill contact-icon"></i>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;