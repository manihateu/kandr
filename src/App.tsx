import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const App = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 3);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        const textureLoader = new THREE.TextureLoader();
        const texture1 = textureLoader.load('Picture1.jpg');
        const texture2 = textureLoader.load('Picture2.jpg');

        const materials = [
            new THREE.MeshBasicMaterial({ map: texture1 }),
            new THREE.MeshBasicMaterial({ map: texture2 }),
            new THREE.MeshBasicMaterial({ map: texture1 }),
            new THREE.MeshBasicMaterial({ map: texture2 }),
            new THREE.MeshBasicMaterial({ map: texture1 }),
            new THREE.MeshBasicMaterial({ map: texture2 })
        ];

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        const controls = new OrbitControls(camera, renderer.domElement);

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default App;
