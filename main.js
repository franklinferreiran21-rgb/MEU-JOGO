import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { criarMapa } from './mapas/mapa1.js';
import { criarPlayer } from './player/player.js';
import { criarJoystick } from './ui/joystick.js';
import { criarCameraRotativa } from './ui/cam.js';
import { criarTelaInicial } from './ui/tela_inicial.js';

function iniciarJogo(){

const cena = new THREE.Scene();
cena.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

cena.add(new THREE.DirectionalLight(0xffffff,2));
cena.add(new THREE.AmbientLight(0xffffff,0.5));
cena.add(criarMapa());

const player = criarPlayer();
cena.add(player);

const joystick = criarJoystick();
const cam = criarCameraRotativa(camera, player);

function animar(){
 requestAnimationFrame(animar);
 player.atualizar(joystick, cam.getRotacaoY());
 cam.atualizar();
 renderer.render(cena,camera);
}
animar();

addEventListener('resize',()=>{
 renderer.setSize(innerWidth, innerHeight);
 camera.aspect = innerWidth / innerHeight;
 camera.updateProjectionMatrix();
});

}

criarTelaInicial(iniciarJogo);
