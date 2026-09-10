import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

import { criarMapa } from './scripts/mapa/mapa1.js';
import { criarPlayer } from './scripts/player/player.js';

import './ui/controles/joystick_animate.js';
import './ui/controles/botao_pulo.js';
import './ui/controles/touch_drag.js';

import { criarCamera, seguirPlayer } from './ui/cam.js';




// =========================
// TELA INICIAL
// =========================

const telaInicial = document.getElementById(
  "tela-inicial"
);


let jogoIniciado = false;



async function iniciarJogo(e) {

  e.preventDefault();


  if (jogoIniciado) return;


  console.log("TOQUE FUNCIONOU");


  jogoIniciado = true;



  try {


    if (!document.fullscreenElement) {

      await document.documentElement.requestFullscreen();

      console.log("FULLSCREEN OK");

    }



    if (
      screen.orientation &&
      screen.orientation.lock
    ) {

      await screen.orientation.lock(
        "landscape"
      );

      console.log("ROTACAO OK");

    }


  } catch (erro) {


    console.log(
      "Fullscreen/rotação bloqueada:",
      erro
    );


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







// =========================
// THREE.JS
// =========================


const cena = new THREE.Scene();




const renderer = new THREE.WebGLRenderer({

  antialias: true

});



renderer.setPixelRatio(
  window.devicePixelRatio
);



renderer.shadowMap.enabled = true;


renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;



renderer.setSize(
  window.innerWidth,
  window.innerHeight
);



document.body.appendChild(
  renderer.domElement
);







// =========================
// CAMERA
// =========================


const camera = criarCamera();







// =========================
// MAPA
// =========================


const mapa = criarMapa(cena);


cena.add(mapa);







// =========================
// PLAYER
// =========================


const player = criarPlayer();


cena.add(player);







// =========================
// LOOP
// =========================


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