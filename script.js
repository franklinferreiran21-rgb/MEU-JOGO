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

    const elemento = renderer?.domElement || document.documentElement;

    if (!document.fullscreenElement && elemento.requestFullscreen) {

      await elemento.requestFullscreen({
        navigationUI: "hide"
      });

    }

    if (screen.orientation && screen.orientation.lock) {

      await screen.orientation.lock("landscape");

    }

  } catch (erro) {

    console.log("Fullscreen/rotacao bloqueada:", erro);

  }

}


async function iniciarJogo(e) {

  e.preventDefault();

  if (jogoIniciado) return;

  jogoIniciado = true;

  await entrarTelaCheia();

  telaInicial.style.display = "none";

}


telaInicial.addEventListener("click", iniciarJogo);
telaInicial.addEventListener("touchstart", iniciarJogo, { passive:false });


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