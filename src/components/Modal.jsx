import React, { useState, useEffect } from 'react';

function Modal({ project, onClose }) {
  // Stato per gestire cosa stiamo vedendo: 'hub' (lista) o 'project' (dettaglio)
  // Se il dato passato non è un hub, andiamo direttamente al dettaglio
  const [activeProject, setActiveProject] = useState(project.isHub ? null : project);
  
  // Se è un progetto singolo, prepara la galleria
  const gallery = activeProject ? (activeProject.gallery || [activeProject.img]) : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset quando cambia il progetto selezionato dall'esterno
  useEffect(() => {
    setActiveProject(project.isHub ? null : project);
    setCurrentIndex(0);
  }, [project]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % gallery.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  // --- VISTA HUB (LISTA PROGETTI) ---
  if (project.isHub && !activeProject) {
    return (
      <div className="project-modal-overlay active" onClick={onClose}>
        <div className="project-modal glass-panel active" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close" onClick={onClose}>×</div>
            
            <div className="hub-container active" style={{padding:'40px', height:'100%', overflowY:'auto'}}>
                <h2 className="modal-title-lg">{project.title}</h2>
                <span className="modal-loc" style={{color:'#888'}}>SELECT PROJECT TO INITIALIZE</span>
                
                <div className="hub-grid" style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'20px', marginTop:'30px'}}>
                    {project.subProjects.map(sub => (
                        <div key={sub.id} className="hub-item" onClick={() => setActiveProject(sub)}>
                            <img src={sub.img} className="hub-thumb" style={{width:'100%', height:'120px', objectFit:'cover'}} />
                            <div className="hub-info" style={{padding:'15px'}}>
                                <div className="hub-title" style={{color:'#fff', fontWeight:'bold'}}>{sub.title}</div>
                                <div className="hub-subtitle" style={{color:'#888', fontSize:'0.7rem'}}>VIEW PROJECT</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- VISTA PROGETTO SINGOLO ---
  // (Questo è simile a prima, ma con il tasto "BACK TO HUB" se necessario)
  return (
    <div className="project-modal-overlay active" onClick={onClose}>
      <div className="project-modal glass-panel active" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close" onClick={onClose}>×</div>

        {/* CAROUSEL */}
        <div className="carousel-header active" style={{ position: 'relative', height: '350px', overflow: 'hidden' }}>
           {gallery.length > 0 && (
             <img src={gallery[currentIndex]} className="carousel-slide active" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
           )}
           {gallery.length > 1 && (
             <div className="carousel-nav">
               <div className="carousel-btn" onClick={prevSlide}><i className="ri-arrow-left-s-line"></i></div>
               <div className="carousel-btn" onClick={nextSlide}><i className="ri-arrow-right-s-line"></i></div>
             </div>
           )}
        </div>

        {/* BODY */}
        <div className="modal-body active">
            {/* Tasto Back to Hub */}
            {project.isHub && (
                <div 
                  className="back-btn" 
                  onClick={() => setActiveProject(null)} // Torna alla vista Hub
                  style={{display:'inline-flex', alignItems:'center', gap:'5px', color:'#888', cursor:'pointer', marginBottom:'20px', fontSize:'0.8rem'}}
                >
                    <i className="ri-arrow-left-line"></i> BACK TO {project.title}
                </div>
            )}

            <h2 className="modal-title-lg" style={{display:'flex', alignItems:'center', gap:'15px'}}>
                 {activeProject.logo && <img src={activeProject.logo} className="modal-logo-img" />}
                 {activeProject.title}
            </h2>
            
            <span className="modal-loc">{activeProject.location}</span>
            <p className="modal-desc">{activeProject.desc}</p>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="thumbnails-row" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {gallery.map((src, idx) => (
                  <img 
                    key={idx} 
                    src={src} 
                    onClick={() => setCurrentIndex(idx)}
                    className={`thumb-img ${idx === currentIndex ? 'active' : ''}`}
                    style={{ width: '60px', height: '40px', objectFit: 'cover', cursor: 'pointer', opacity: idx === currentIndex ? 1 : 0.5, border: idx === currentIndex ? '2px solid red' : 'none' }}
                  />
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Modal;