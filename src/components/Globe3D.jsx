import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D Interactive Rotating Wireframe Globe
 * Customized with lime #C8FF3D accent and dark charcoal wireframe.
 */
export default function Globe3D({ size = 70, locationName = "Amsterdam, Netherlands" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 2.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(1, 18, 18);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x171714,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeGlobe = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(wireframeGlobe);

    // Ring orbits
    const ringGeo = new THREE.RingGeometry(1.02, 1.05, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x77766F,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    globeGroup.add(ring);

    // Electric Lime #C8FF3D Location Pin Dot
    const pinGeo = new THREE.SphereGeometry(0.07, 12, 12);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xC8FF3D });
    const pin = new THREE.Mesh(pinGeo, pinMat);
    const lat = 52 * (Math.PI / 180);
    const lon = 5 * (Math.PI / 180);
    pin.position.set(
      Math.cos(lat) * Math.sin(lon) * 1.02,
      Math.sin(lat) * 1.02,
      Math.cos(lat) * Math.cos(lon) * 1.02
    );
    globeGroup.add(pin);

    let reqId;
    let targetRotationSpeed = 0.008;

    const onMouseEnter = () => { targetRotationSpeed = 0.025; };
    const onMouseLeave = () => { targetRotationSpeed = 0.008; };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    let currentRotationSpeed = 0.008;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * 0.05;
      globeGroup.rotation.y += currentRotationSpeed;
      globeGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15 + 0.2;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      wireframeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
    };
  }, [size]);

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div
        ref={mountRef}
        style={{ width: size, height: size }}
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        title={`Located in ${locationName}`}
      />
      <div className="text-left font-sans">
        <span className="block text-[11px] uppercase font-mono tracking-wider text-[#77766F]">Location</span>
        <span className="block text-xs font-semibold text-[#171714]">{locationName}</span>
      </div>
    </div>
  );
}
