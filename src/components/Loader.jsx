import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei'; // <--- Importa questo

function Loader() {
  const { progress } = useProgress(); // Rileva la % di caricamento del 3D
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Se il 3D è al 100%, aspetta un attimo e poi chiudi
    if (progress === 100) {
      const timer = setTimeout(() => setFinished(true), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div 
      id="site-loader" 
      style={{
        opacity: finished ? 0 : 1,
        visibility: finished ? 'hidden' : 'visible',
        pointerEvents: finished ? 'none' : 'all',
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: '#050505', zIndex: 9999,
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
        transition: 'opacity 0.8s ease, visibility 0.8s ease'
      }}
    >
      <div className="loader-logo" style={{fontSize: '2rem', fontWeight: 800, color: '#fff', animation: 'pulse 1.5s infinite alternate'}}>
        rglr
      </div>
      
      {/* Barra di caricamento reale */}
      <div style={{width: '200px', height: '2px', background: '#333', marginTop: '20px', borderRadius: '2px'}}>
         <div style={{
             width: `${progress}%`, 
             height: '100%', 
             background: '#FF0033', 
             transition: 'width 0.2s ease'
         }}></div>
      </div>

      <div className="loader-text" style={{marginTop: '10px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#666'}}>
        INITIALIZING... {Math.round(progress)}%
      </div>
    </div>
  );
}

export default Loader;