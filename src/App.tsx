import React, { useEffect, useRef } from 'react'; // фреймворк
import * as THREE from 'three'; // библиотека для работы с WebGL
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


/**
 * Как создать проект
 * 1) необходимо установить Node.js версии 23+
 * 2) создаем проект с помощью команды npm create vite@latest, выбираем npm, React + Typescript
 * 3) добавляем нашу библиотеку с помощью npm install three
 * 4) Добавляем в App.tsx код ниже ->
 * 5) запускаем проект с помощью команды npm run dev
 * 6) открываем ссылку localhost:5173 в браузере
 * 7) радуемся жизни:)
 */

const App = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    // ref - это ссылка на ноду для того чтобы добавить туда элемент <canvas> для работы с графикой


    useEffect(() => { // <- useEffect - это "функция" которая позволяет контролировать операции при рендеринге
        const scene = new THREE.Scene(); // создаем сцену
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100); // добавляем камеру
        camera.position.set(0, 0, 3); // ставим изначальную позицию камеры

        const renderer = new THREE.WebGLRenderer({ antialias: true }); // создаем рендерер для WebGL
        renderer.setSize(window.innerWidth, window.innerHeight); // задаем размеры сцене равными размерам экрана
        mountRef.current?.appendChild(renderer.domElement); // добавляем через ref нашу сцену

        const light = new THREE.DirectionalLight(0xffffff, 1); //добавляем освещение на сцену
        light.position.set(1, 1, 1).normalize(); // нормализация света
        scene.add(light); // включаем свет

        const textureLoader = new THREE.TextureLoader(); // функция для загрузки текстур
        const texture1 = textureLoader.load('Picture1.jpg'); // загружаем текстуры
        const texture2 = textureLoader.load('Picture2.jpg');
        const texture3 = textureLoader.load("cucumber.jpg")
        texture3.center.set(.5,.5); // ставим центр текстуры по центру для вращения
        texture3.rotation = THREE.MathUtils.degToRad(90); // вращаем на 90 градусов



        const materials = [ // массив текстур граней куба
            new THREE.MeshBasicMaterial({ map: texture3 }),
            new THREE.MeshBasicMaterial({ map: texture3 }),
            new THREE.MeshBasicMaterial({ map: texture3 }),
            new THREE.MeshBasicMaterial({ map: texture3 }),
            new THREE.MeshBasicMaterial({ map: texture3 }),
            new THREE.MeshBasicMaterial({ map: texture3 })
        ];
        
        const geometry = new THREE.BoxGeometry(1, 1, 1); // задаем геометрию (единичный куб)
        const cube = new THREE.Mesh(geometry, materials); // создаем мэш с геометрией куба и нашими текстурами
        scene.add(cube); // добавляем на сцену

        const controls = new OrbitControls(camera, renderer.domElement); // добавляем возможность двигать мышкой

        const animate = () => { // анимируем вращение
            requestAnimationFrame(animate);
            cube.rotation.x -= 0.01;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => { // если меняем ширину экрана - меняются размеры сцены
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            mountRef.current?.removeChild(renderer.domElement); // когда закрываем страницу - убираем нашу сцену
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={mountRef} />; 
};

export default App;
