// main.js - O Cérebro do Jogo

// Importando as classes dos seus respectivos arquivos
import Mapa from './mapa/mapa.js';
import Joystick from './ui/joystick.js';
import Player from './player/player.js';
import CameraOrbit from './ui/cam.js';

const tamanhoMapa = 200; 

// 1. Instancia o Mapa
const mapa = new Mapa(tamanhoMapa);
const scene = mapa.getScene(); 

// 2. Configura a Câmera Base e Renderizador
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 3. Instancia Player, Controles e Câmera Orbital
const joystick = new Joystick();
const player = new Player(scene);
const cam = new CameraOrbit(camera, document.getElementById('camera-zone'));

// 4. Redimensionamento
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 5. Game Loop
function gameLoop() {
    requestAnimationFrame(gameLoop);

    player.update(joystick.getVector(), cam.getYaw(), tamanhoMapa);
    cam.update(player);

    renderer.render(scene, camera);
}

// Iniciar!
gameLoop();
