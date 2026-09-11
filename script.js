import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

import { criarMapa } from './scripts/mapa/mapa1.js';
import { criarPlayer } from './scripts/player/player.js';

import './ui/controles/joystick_animate.js';
import './ui/controles/botao_pulo.js';
import './ui/controles/touch_drag.js';

import { criarCamera, seguirPlayer } from './ui/cam.js';

const telaInicial = document.getElementById("tela-inicial");

let jogoIniciado = false;
let renderer;

async function entrarTelaCheia(){

  try {

    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {

      await document.documentElement.requestFullscreen({
        navigationUI: "hide"
      });

    }

  } catch (erro) {
    console.log("Fullscreen bloqueado:", erro);
  }

  try {

    if (screen.orientation && screen.orientation.lock) {

      await screen.orientation.lock("landscape-primary");

    }

  } catch (erro) {
    console.log("Rotacao bloqueada:", erro);
  }

}

async function iniciarJogo(e) {

  e.preventDefault();

  if (jogoIniciado) return;

  jogoIniciado = true;

  await entrarTelaCheia();

  telaInicial.style.display = "none";

}


telaInicial.addEventListener("pointerup", iniciarJogo);


const cena = new THREE.Scene();

renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document.body.appendChild(renderer.domElement);

const camera = criarCamera();

const mapa = criarMapa(cena);
cena.add(mapa);

const player = criarPlayer();
cena.add(player);

function animar(){

  requestAnimationFrame(animar);

  player.atualizar();

  seguirPlayer(camera, player);

  renderer.render(cena, camera);

}

animar();