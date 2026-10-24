import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Radio, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { CipherReveal } from './CipherGhostText';

// Self-contained Web Audio Sci-Fi Synthesizer (Zero external files needed)
function playSciFiChime(type = 'chime') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'shockwave') {
      // Deep sub-bass pulse + rising harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
    } else if (type === 'mode') {
      // Crisp holographic beep
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    } else {
      // Tactile click chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1020, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // Ignore audio restrictions gracefully
  }
}

export default function FounderComposition({ className = "" }) {
  const mountRef = useRef(null);
  const cardRef = useRef(null);
  const [activeShapeMode, setActiveShapeMode] = useState('knot'); // 'knot' | 'crystal' | 'sphere'
  const [isShockwave, setIsShockwave] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [coreStats, setCoreStats] = useState({ fps: 60, vertices: 2480, rpm: "42 RPM" });

  // Refs to communicate with Three.js animation loop without rebuilding canvas
  const threeState = useRef({
    shockwaveScale: 1,
    shockwaveTarget: 1,
    currentMode: 'knot',
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    rotVelX: 0,
    rotVelY: 0,
    switchShapeTrigger: null
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 540;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. Main Geometric Sculptural Cores (Switchable)
    // Mode A: Torus Knot
    const knotGroup = new THREE.Group();
    const knotGeo = new THREE.TorusKnotGeometry(0.9, 0.26, 128, 24, 2, 3);
    const knotSolidMat = new THREE.MeshBasicMaterial({
      color: 0x171714,
      wireframe: false,
      transparent: true,
      opacity: 0.92
    });
    const knotSolid = new THREE.Mesh(knotGeo, knotSolidMat);
    const knotWireMat = new THREE.MeshBasicMaterial({
      color: 0xC8FF3D,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const knotWire = new THREE.Mesh(knotGeo, knotWireMat);
    knotGroup.add(knotSolid);
    knotGroup.add(knotWire);
    masterGroup.add(knotGroup);

    // Mode B: Icosahedron Crystal
    const crystalGroup = new THREE.Group();
    const crystalGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const crystalSolidMat = new THREE.MeshBasicMaterial({
      color: 0x171714,
      wireframe: false,
      transparent: true,
      opacity: 0.92
    });
    const crystalSolid = new THREE.Mesh(crystalGeo, crystalSolidMat);
    const crystalWireMat = new THREE.MeshBasicMaterial({
      color: 0xC8FF3D,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const crystalWire = new THREE.Mesh(crystalGeo, crystalWireMat);
    crystalGroup.add(crystalSolid);
    crystalGroup.add(crystalWire);
    crystalGroup.visible = false;
    masterGroup.add(crystalGroup);

    // Mode C: Quantum Hyper Sphere
    const sphereGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(1.1, 24, 24);
    const sphereSolidMat = new THREE.MeshBasicMaterial({
      color: 0x171714,
      wireframe: false,
      transparent: true,
      opacity: 0.9
    });
    const sphereSolid = new THREE.Mesh(sphereGeo, sphereSolidMat);
    const sphereWireMat = new THREE.MeshBasicMaterial({
      color: 0xC8FF3D,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const sphereWire = new THREE.Mesh(sphereGeo, sphereWireMat);
    sphereGroup.add(sphereSolid);
    sphereGroup.add(sphereWire);
    sphereGroup.visible = false;
    masterGroup.add(sphereGroup);

    // 3. Gyroscopic Orbital Rings (3 Axial Gimbals)
    const ringGroup = new THREE.Group();
    masterGroup.add(ringGroup);

    // Ring 1 (X)
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.012, 16, 90);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x77766F, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.2;
    ringGroup.add(ring1);

    // Ring 2 (Y) - Electric Lime #C8FF3D
    const ring2Geo = new THREE.TorusGeometry(1.4, 0.014, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xC8FF3D, transparent: true, opacity: 0.85 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 2.5;
    ringGroup.add(ring2);

    // Ring 3 (Z) - Outer Horizon
    const ring3Geo = new THREE.TorusGeometry(1.85, 0.01, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x171714, transparent: true, opacity: 0.25 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ringGroup.add(ring3);

    // Satellite Beacons on the rings
    const beaconGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xC8FF3D });
    const beacon1 = new THREE.Mesh(beaconGeo, beaconMat);
    const beacon2 = new THREE.Mesh(beaconGeo, beaconMat);
    ringGroup.add(beacon1);
    ringGroup.add(beacon2);

    // 4. Swirling Particle Cloud (600 Points)
    const particleCount = 450;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.6 + Math.random() * 0.9;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      particlePositions[i] = x;
      particlePositions[i + 1] = y;
      particlePositions[i + 2] = z;
      particleOriginals[i] = x;
      particleOriginals[i + 1] = y;
      particleOriginals[i + 2] = z;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.024,
      color: 0xC8FF3D,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // 5. Drag & Rotate Physics Controls
    const onMouseDown = (e) => {
      threeState.current.isDragging = true;
      threeState.current.prevMouseX = e.clientX;
      threeState.current.prevMouseY = e.clientY;
    };
    const onMouseMove = (e) => {
      if (!threeState.current.isDragging) return;
      const dx = e.clientX - threeState.current.prevMouseX;
      const dy = e.clientY - threeState.current.prevMouseY;
      threeState.current.rotVelY += dx * 0.003;
      threeState.current.rotVelX += dy * 0.003;
      threeState.current.prevMouseX = e.clientX;
      threeState.current.prevMouseY = e.clientY;
    };
    const onMouseUp = () => {
      threeState.current.isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 6. Function to swap active 3D geometry
    threeState.current.switchShapeTrigger = (mode) => {
      knotGroup.visible = mode === 'knot';
      crystalGroup.visible = mode === 'crystal';
      sphereGroup.visible = mode === 'sphere';
      threeState.current.currentMode = mode;
    };

    // 7. Render Loop with Elastic Spring Physics
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth inertia rotation
      masterGroup.rotation.y += 0.008 + threeState.current.rotVelY;
      masterGroup.rotation.x += 0.004 + threeState.current.rotVelX;
      threeState.current.rotVelY *= 0.92;
      threeState.current.rotVelX *= 0.92;

      // Gyro gimbal rings counter-rotation
      ring1.rotation.z = elapsed * 0.22;
      ring2.rotation.z = -elapsed * 0.35;
      ring3.rotation.y = elapsed * 0.15;

      // Satellite beacons movement along orbit
      beacon1.position.x = Math.cos(elapsed * 1.2) * 1.65;
      beacon1.position.y = Math.sin(elapsed * 1.2) * 0.45;
      beacon1.position.z = Math.sin(elapsed * 1.2) * 1.65;

      beacon2.position.x = Math.sin(elapsed * 0.9) * 1.4;
      beacon2.position.y = Math.cos(elapsed * 0.9) * 1.4;
      beacon2.position.z = Math.cos(elapsed * 0.9) * 0.5;

      // Shockwave burst spring animation
      const targetScale = threeState.current.shockwaveTarget;
      threeState.current.shockwaveScale += (targetScale - threeState.current.shockwaveScale) * 0.14;
      masterGroup.scale.set(
        threeState.current.shockwaveScale,
        threeState.current.shockwaveScale,
        threeState.current.shockwaveScale
      );

      // Settle shockwave back to 1
      if (Math.abs(targetScale - 1) > 0.01) {
        threeState.current.shockwaveTarget += (1 - targetScale) * 0.1;
      }

      // Swirling particles dynamic pulsing
      const pos = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        const ox = particleOriginals[i];
        const oy = particleOriginals[i + 1];
        const oz = particleOriginals[i + 2];
        const wave = Math.sin(elapsed * 2 + i) * 0.12;
        pos[i] = ox * (1 + wave * (targetScale > 1.2 ? 1.8 : 0.8));
        pos[i + 1] = oy * (1 + wave * (targetScale > 1.2 ? 1.8 : 0.8));
        pos[i + 2] = oz * (1 + wave * (targetScale > 1.2 ? 1.8 : 0.8));
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeo.dispose();
      crystalGeo.dispose();
      sphereGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      beaconGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  // Trigger Shockwave Warp on Click
  const handleTriggerShockwave = () => {
    setIsShockwave(true);
    threeState.current.shockwaveTarget = 1.45;
    threeState.current.rotVelY += 0.08;
    if (soundEnabled) playSciFiChime('shockwave');
    setTimeout(() => setIsShockwave(false), 600);
  };

  // Switch Shape Mode
  const handleSwitchMode = (mode) => {
    setActiveShapeMode(mode);
    if (threeState.current.switchShapeTrigger) {
      threeState.current.switchShapeTrigger(mode);
    }
    if (soundEnabled) playSciFiChime('mode');
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full max-w-[480px] h-[520px] sm:h-[600px] flex flex-col items-center justify-between p-6 select-none ${className}`}
    >
      {/* 1. Top HUD Controls Bar */}
      <div className="w-full flex items-center justify-between z-20 font-mono text-xs text-[#77766F] bg-white/60 p-2.5 rounded-full border border-[#77766F]/25 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2 px-2">
          <span className="w-2 h-2 rounded-full bg-[#C8FF3D] animate-ping"></span>
          <span className="text-[#171714] font-bold">KINETIC 3D HYPER-CORE</span>
        </div>

        {/* Audio FX Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 rounded-full hover:bg-[#171714] hover:text-[#C8FF3D] transition-colors cursor-pointer"
          title={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
        >
          {soundEnabled ? <Volume2 size={14} className="text-[#171714]" /> : <VolumeX size={14} className="text-[#77766F]" />}
        </button>
      </div>

      {/* 2. Interactive 3D WebGL Canvas Centerpiece */}
      <div
        ref={mountRef}
        onClick={handleTriggerShockwave}
        className="relative z-10 w-full h-[360px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing group"
        title="Drag to orbit 360° • Click to trigger shockwave burst"
      >
        {/* Subtle Halo Glow Behind the 3D Core */}
        <div className="absolute w-60 h-60 rounded-full bg-[#C8FF3D]/15 blur-3xl pointer-events-none -z-10 group-hover:bg-[#C8FF3D]/25 transition-all duration-500" />
        
        {/* Shockwave Visual Ring Ripple */}
        {isShockwave && (
          <div className="absolute inset-0 rounded-full border-2 border-[#C8FF3D] animate-ping pointer-events-none" />
        )}
      </div>

      {/* 3. Floating 3D Mode Selector Buttons (Below Core) */}
      <div className="w-full z-20 flex flex-col gap-3 font-mono">
        <div className="flex items-center justify-center gap-2">
          {[
            { id: 'knot', label: 'QUANTUM TORUS' },
            { id: 'crystal', label: 'HYPER CRYSTAL' },
            { id: 'sphere', label: 'SOLAR FIELD' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleSwitchMode(mode.id)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                activeShapeMode === mode.id
                  ? 'bg-[#171714] text-[#C8FF3D] shadow-md border border-[#171714]'
                  : 'bg-white/70 text-[#77766F] hover:text-[#171714] border border-[#77766F]/25 hover:bg-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* 4. Bottom Interactive Cue & Telemetry */}
        <div className="flex items-center justify-between text-[11px] text-[#77766F] px-3 pt-2 border-t border-[#77766F]/20">
          <span className="flex items-center gap-1.5">
            <Zap size={12} className="text-[#C8FF3D]" /> Drag to Orbit • Click to Warp
          </span>
          <span className="text-[#171714] font-semibold">
            THREE.JS 60FPS
          </span>
        </div>
      </div>
    </div>
  );
}
