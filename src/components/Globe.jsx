import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import GlobeMarkers from './GlobeMarkers';
import { projectsData } from '../data/projects';
import GestureWarning from './GestureWarning';
import { clusterProjects } from '../utils/clustering';

function EarthMesh() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [
    '/assets/earth_atmos_2048.jpg',
    '/assets/earth_normal_2048.jpg'
  ]);
  
  return (
    <group>
        {/* TERRA */}
        <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <meshPhongMaterial 
                map={colorMap} 
                normalMap={normalMap} 
                shininess={10} 
                color="white"
                emissive={0x112244}
                emissiveIntensity={0.1}
            />
        </mesh>
        
        {/* ATMOSFERA (Bagliore) */}
        <mesh>
            <sphereGeometry args={[1.53, 64, 64]} />
            <meshLambertMaterial 
                color={0x44aaff} transparent opacity={0.2} blending={2} side={1} 
            />
        </mesh>
        
        {/* ALONE ESTERNO (Nuovo) */}
        <mesh scale={[1.05, 1.05, 1.05]}>
             <sphereGeometry args={[1.5, 64, 64]} />
             <meshBasicMaterial color={0x0044ff} transparent opacity={0.05} blending={10} side={5} />
        </mesh>
    </group>
  );
}

function Globe({ onSelectProject }) {
  const [warningVisible, setWarningVisible] = useState(false);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  
  const markers = useMemo(() => clusterProjects(projectsData), []);

  useEffect(() => {
    if (warningVisible) {
      const timer = setTimeout(() => setWarningVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [warningVisible]);

  // 👇 2. LOGICA AGGIORNATA
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // 1 Dito: Mostra avviso e DISABILITA rotazione
      setWarningVisible(true);
      setControlsEnabled(false); 
    } else {
      // 2+ Dita: Nascondi avviso e ABILITA rotazione
      setWarningVisible(false);
      setControlsEnabled(true);
    }
  };

  const handleTouchEnd = () => {
    // Quando stacchi il dito, riabilita tutto (per l'autorotazione o il mouse)
    setWarningVisible(false);
    setControlsEnabled(true);
  };

  return (
    <div 
      style={{ width: '100%', height: '100%', backgroundColor: 'transparent', position:'relative' }}
      // Usa onTouchStart e onTouchEnd sul div contenitore
      onTouchStart={handleTouchStart} 
      onTouchEnd={handleTouchEnd}
    >
      <GestureWarning visible={warningVisible} />

      <Canvas camera={{ position: [0, 0, 4.8] }} style={{width: '100%', height: '100%'}}>
        <ambientLight intensity={0.6} />
        
        <directionalLight position={[5, 3, 5]} intensity={2.5} color={0xffffff} />

        <spotLight position={[-5, 5, -5]} intensity={25} color="#0044ff" angle={0.5} penumbra={1} />       
        
        <Suspense fallback={null}>
            <EarthMesh />
            <GlobeMarkers projects={markers} onSelect={onSelectProject} />
        </Suspense>
        
        {/* 👇 3. COLLEGA LO STATO ALLA PROPRIETÀ ENABLED */}
        <OrbitControls 
          enabled={controlsEnabled} 
          autoRotate={controlsEnabled} // Opzionale: ferma anche l'autorotazione se stai toccando male
          autoRotateSpeed={0.8} 
          enableZoom={false} 
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.1} 
        />
      </Canvas>
    </div>
  );
}

export default Globe;