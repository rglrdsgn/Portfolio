import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { latLonToVector3 } from '../utils/geo';
import * as THREE from 'three';

// Componente per il singolo Marker animato
function PulsingMarker({ position, onClick, isHub }) {
  const meshRef = useRef();
  // Creiamo un "tempo" casuale di partenza così non pulsano tutti identici
  const randomOffset = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Funzione seno per pulsare: va da 0.8 a 1.2 di scala
    const scale = 1 + Math.sin(t * 2 + randomOffset) * 0.3;
    if (meshRef.current) {
        meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'grab'}
    >
      <sphereGeometry args={[0.04, 16, 16]} />
      {/* Se è HUB è Rosso acceso, altrimenti Arancione/Rosso */}
      <meshBasicMaterial color={isHub ? "#ff0000" : "#ff3333"} toneMapped={false} />
    </mesh>
  );
}

// Componente Principale
function GlobeMarkers({ projects, onSelect }) {
  return (
    <group>
      {projects.map((project, i) => {
        // ... (Logica coordinate identica a prima) ...
        const phi = (90 - project.lat) * (Math.PI / 180);
        const theta = (project.lon + 180) * (Math.PI / 180);
        const r = 1.5; 
        const x = -(r * Math.sin(phi) * Math.cos(theta));
        const z = (r * Math.sin(phi) * Math.sin(theta));
        const y = (r * Math.cos(phi));

        return (
            <PulsingMarker 
                key={project.id || i}
                position={[x, y, z]} 
                isHub={project.isHub}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(project);
                }}
            />
        );
      })}
    </group>
  );
}

export default GlobeMarkers;