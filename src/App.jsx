import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './index.css';
import 'remixicon/fonts/remixicon.css';
import { motion } from 'framer-motion';
import Modal from './components/Modal';
import Loader from './components/Loader';
import SearchUI from './components/SearchUI';
import Globe from './components/Globe';
import ProjectCard from './components/ProjectCard';
import Navbar from './components/Navbar';
import { projectsData } from './data/projects';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalData, setModalData] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  // QUESTO EFFETTO CONTROLLA DOVE SEI NELLA PAGINA
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'map', 'archive', 'about', 'contact'];
      const scrollPosition = window.scrollY + (window.innerHeight / 2); // Centro dello schermo

      // Caso speciale: se siamo in fondo alla pagina, attiva Contact
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection('contact');
        return;
      }

      // Altrimenti controlla le sezioni
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          // Se lo scroll è dentro questo elemento
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id === 'map' ? 'map' : id); // Mapping ID se necessario
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ReactLenis root>
      <div className="app-container">
        <Loader />

        <Navbar activeSection={activeSection} />

        {/* SEZIONE HERO */}
        <section className="hero" id="home">
          <video 
            className="hero-video" 
            src="https://www.pexels.com/it-it/download/video/30104922/" 
            autoPlay 
            muted 
            loop 
            playsInline
          ></video>
          
          <div className="hero-overlay"></div>
          
          <motion.h1 
            className="chrome-text"
            initial={{ opacity: 0, y: 40 }}      // Parte invisibile e spostato giù
            animate={{ opacity: 1, y: 0 }}       // Arriva visibile e al centro
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} // Curva di animazione "smooth"
          >
            rglr<br/>design
          </motion.h1>
          
          {/* INDICATORE SCROLL ANIMATO */}
          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
              <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
              <p style={{fontFamily: 'var(--font-tech)', fontSize: '0.7rem', letterSpacing: '2px', color: '#ccc', marginTop:'10px'}}>
                  SCROLL TO ENTER
              </p>
          </motion.div>
        </section>

        {/* SEZIONE MAPPA */}
        <section id="map" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>          
          {/* 👇 LA BARRA DI RICERCA */}
          <SearchUI onSelectProject={setModalData} />
          
          <Globe onSelectProject={setModalData} />
        </section>

        {/* SEZIONE ARCHIVE */}
        <section className="content-section" id="archive">
          <h2 className="chrome-text" style={{fontSize: '3rem', marginBottom: '60px'}}>ARCHIVE</h2>
          
          <div className="projects-grid">
            {/* 2. USIAMO SLICE PER MOSTRARE SOLO I PRIMI 'visibleCount' */}
            {projectsData
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordiniamo per data (opzionale)
              .slice(0, visibleCount) 
              .map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => setModalData(project)} 
                />
            ))}
          </div>

          {/* 3. IL PULSANTE LOAD MORE */}
          {/* Mostralo solo se ci sono ancora progetti da caricare */}
          {visibleCount < projectsData.length && (
            <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'50px'}}>
              <button 
                onClick={loadMore}
                id="load-more-btn" // Per mantenere lo stile se avevi CSS specifico
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  padding: '15px 40px',
                  fontFamily: 'var(--font-tech)',
                  cursor: 'pointer',
                  borderRadius: '30px',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = 'var(--accent-red)';
                  e.target.style.background = 'rgba(255, 0, 51, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.target.style.background = 'transparent';
                }}
              >
                LOAD MORE ARCHIVE
              </button>
            </div>
          )}
        </section>

        {/* SEZIONE ABOUT */}
        <AboutSection />

        {/* SEZIONE CONTATTI */}
        <ContactSection />

        {/* MODALE */}
        {modalData && (
          <Modal project={modalData} onClose={() => setModalData(null)} />
        )}
      </div>
    </ReactLenis>
  );
}

export default App;