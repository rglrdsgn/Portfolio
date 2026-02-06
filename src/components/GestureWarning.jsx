import React from 'react';

function GestureWarning({ visible }) {
  return (
    <div 
      id="gesture-warning" 
      className={visible ? 'visible' : ''}
      style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.85)', color: '#fff', padding: '15px 25px',
        borderRadius: '30px', fontFamily: 'var(--font-tech)', fontSize: '0.8rem',
        pointerEvents: 'none', transition: 'opacity 0.3s ease', zIndex: 9000,
        border: '1px solid var(--accent-red)',
        opacity: visible ? 1 : 0
      }}
    >
      Use two fingers to move the map
    </div>
  );
}

export default GestureWarning;