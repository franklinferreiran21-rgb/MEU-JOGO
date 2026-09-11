// main.js - O Cérebro do Jogo

const tamanhoMapa = 200; 

// Instancia o Mapa
const mapa = new Mapa(tamanhoMapa);
const scene = mapa.getScene(); 

// Configura a Câmera e Renderizador
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Instancia Player, Controles e Câmera Orbital
const joystick = new Joystick();
const player = new Player(scene);
const cam = new CameraOrbit(camera, document.getElementById('camera-zone'));

// Redimensionamento (Importante para quando a tela deitar)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- SISTEMA DA TELA INICIAL (FULLSCREEN E PAISAGEM) ---
const startScreen = document.getElementById('start-screen');

startScreen.addEventListener('click', async () => {
    try {
        // 1. Pede para entrar em Tela Cheia (Fullscreen)
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) { // Safari/Antigos
            await docEl.webkitRequestFullscreen();
        }

        // 2. Força a tela a deitar (Modo Paisagem)
        // Isso requer que o Fullscreen já esteja ativo no mobile
        if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape');
        }
    } catch (erro) {
        console.warn("O navegador bloqueou o fullscreen ou a rotação automática.", erro);
    }

    // 3. Esconde a tela inicial para liberar o jogo
    startScreen.style.display = 'none';
});

// --- GAME LOOP ---
function gameLoop() {
    requestAnimationFrame(gameLoop);

    // Se a tela inicial ainda estiver visível, o jogo fica "pausado" (não move o player)
    if (startScreen.style.display !== 'none') {
        renderer.render(scene, camera);
        return; 
    }

    // Atualiza lógica apenas quando estiver jogando
    player.update(joystick.getVector(), cam.getYaw(), tamanhoMapa);
    cam.update(player);

    renderer.render(scene, camera);
}

// Iniciar!
gameLoop();
