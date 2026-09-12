import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAx55ZeeI8Q1_xpkikA-bIAWz4yRYxHeI",
  authDomain: "meu-jogo-43bcc.firebaseapp.com",
  databaseURL: "https://meu-jogo-43bcc-default-rtdb.firebaseio.com",
  projectId: "meu-jogo-43bcc",
  storageBucket: "meu-jogo-43bcc.firebasestorage.app",
  messagingSenderId: "4349336361",
  appId: "1:4349336361:web:822bcf091759f56d167538"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ... (Mantenha todo o seu código de mapa, cena, câmera e tela inicial aqui) ...


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

// --- SISTEMA MULTIPLAYER / SEGURANÇA ---
const playerRef = ref(db, 'jogadores/player1');

// O cliente escuta o servidor: se o banco mudar, o boneco move!
onValue(playerRef, (snapshot) => {
    const dados = snapshot.val();
    if (dados) {
        player.mesh.position.x = dados.x;
        player.mesh.position.z = dados.z;
        player.mesh.rotation.y = dados.rotY;
    }
});

// --- GAME LOOP ---
function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (startScreen.style.display !== 'none') {
        renderer.render(scene, camera);
        return; 
    }

    // Calcula para onde o joystick quer ir
    const novoMovimento = player.calcularMovimento(joystick.getVector(), cam.getYaw(), tamanhoMapa);
    
    // Se houve movimento, envia para a nuvem
    if (novoMovimento) {
        set(playerRef, novoMovimento);
    }

    cam.update(player);
    renderer.render(scene, camera);
}

gameLoop();