// main.js - O Cérebro do Jogo

const tamanhoMapa = 200; 

// 1. Instancia o Mapa
const mapa = new Mapa(tamanhoMapa);
const scene = mapa.getScene(); 

// 2. Configura a Câmera e Renderizador
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
