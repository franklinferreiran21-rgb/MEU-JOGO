import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

import { criarMapa } from './scripts/mapa/mapa1.js';
import { criarPlayer } from './scripts/player/player.js';

import './ui/controles/joystick_animate.js';
import './ui/controles/botao_pulo.js';
import './ui/controles/touch_drag.js';

import { criarCamera, seguirPlayer } from './ui/cam.js';


const telaInicial = document.getElementById("tela-inicial");

let jogoIniciado = false;


async function iniciarJogo(e) {

  e.preventDefault();

  if (jogoIniciado) return;

  jogoIniciado = true;

  try {

    if (!document.fullscreenElement) {

      await document.documentElement.requestFullscreen({
        navigationUI: "hide"
      });

    }

    await new Promise(resolve => setTimeout(resolve, 500));

    if (screen.orientation && screen.orientation.lock) {

      await screen.orientation.lock("landscape");

    }

    console.log("Fullscreen e rotacao OK");

  } catch (erro) {

    console.log("Fullscreen/rotacao bloqueada:", erro);

  }

  telaInicial.style.display = "none";

}


telaInicial.addEventListener(
  "pointerdown",
  iniciarJogo
);


document.addEventListener(
  "fullscreenchange",
  () => {

    if (!document.fullscreenElement) {

      jogoIniciado = false;
      telaInicial.style.display = "flex";

    }

  }
);


const cena = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
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


function animar() {

  requestAnimationFrame(animar);

  player.atualizar();

  seguirPlayer(
    camera,
    player
  );

  renderer.render(
    cena,
    camera
  );

}

animar();