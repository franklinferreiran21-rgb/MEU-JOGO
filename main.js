// 1. IMPORTAÇÕES DO FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// 2. CHAVES DO FIREBASE
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
const playerRef = ref(db, 'jogadores/player1/posicao');

// --- CÓDIGO DA ENGINE 3D E MAPA ---
const tamanhoMapa = 200; 
const mapa = new Mapa(tamanhoMapa);
const scene = mapa.getScene(); 
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const joystick = new Joystick();
const player = new Player(scene);
const cam = new CameraOrbit(camera, document.getElementById('camera-zone'));

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- TELA INICIAL ---
const startScreen = document.getElementById('start-screen');
startScreen.addEventListener('click', async () => {
    try {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) await docEl.requestFullscreen();
        else if (docEl.webkitRequestFullscreen) await docEl.webkitRequestFullscreen();
        if (screen.orientation && screen.orientation.lock) await screen.orientation.lock('landscape');
    } catch (erro) { console.warn("Fullscreen bloqueado", erro); }
    startScreen.style.display = 'none';
});

// --- SISTEMA ANTI-CHEAT (A POLÍCIA INVISÍVEL) ---
let ultimaPosicaoRegistrada = { x: 0, z: 0 };
let ultimoTempoRegistrado = Date.now();

setInterval(async () => {
    const tempoAtual = Date.now();
    const posicaoAtual = { x: player.mesh.position.x, z: player.mesh.position.z };
    const tempoDecorridoMs = tempoAtual - ultimoTempoRegistrado;

    // Só envia para a API se o jogador tiver andado
    if (posicaoAtual.x !== ultimaPosicaoRegistrada.x || posicaoAtual.z !== ultimaPosicaoRegistrada.z) {
        try {
            const resposta = await fetch('/api/anticheat', {
                method: 'POST',
                body: JSON.stringify({
                    posicaoAntiga: ultimaPosicaoRegistrada,
                    posicaoNova: posicaoAtual,
                    tempoDecorridoMs: tempoDecorridoMs
                })
            });

            const resultado = await resposta.json();

            if (resultado.status === "HACK_DETECTADO") {
                console.warn("HACK DETECTADO! Velocidade adulterada. Punindo jogador...");
                
                // 1. Reseta a posição na tela do hacker (puxa ele pra trás)
                player.mesh.position.x = resultado.posicaoCorreta.x;
                player.mesh.position.z = resultado.posicaoCorreta.z;

                // 2. Grava no Firebase que ele foi resetado, para os outros jogadores não verem ele lá na frente
                set(playerRef, {
                    x: resultado.posicaoCorreta.x,
                    z: resultado.posicaoCorreta.z,
                    rotY: player.mesh.rotation.y
                });
                
                // Atualiza a posição local para não disparar falsos positivos
                posicaoAtual.x = resultado.posicaoCorreta.x;
                posicaoAtual.z = resultado.posicaoCorreta.z;
            }
        } catch (e) {
            console.error("Erro ao contatar API do Cloudflare", e);
        }
    }

    ultimaPosicaoRegistrada = { ...posicaoAtual };
    ultimoTempoRegistrado = tempoAtual;
}, 1); // Aciona o Cloudflare a cada 2 segundos

// --- GAME LOOP ---
function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (startScreen.style.display !== 'none') {
        renderer.render(scene, camera);
        return; 
    }

    const joyVector = joystick.getVector();

    // Se o jogador estiver movendo o controle
    if (joyVector.x !== 0 || joyVector.y !== 0) {
        // O player se move na tela usando a variável local (para ficar lisinho)
        player.update(joyVector, cam.getYaw(), tamanhoMapa);

        // Salva a nova coordenada no Firebase para o multiplayer
        set(playerRef, {
            x: player.mesh.position.x,
            z: player.mesh.position.z,
            rotY: player.mesh.rotation.y
        });
    }

    cam.update(player);
    renderer.render(scene, camera);
}

gameLoop();
