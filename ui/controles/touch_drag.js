import { girarCamera } from '../cam.js';

let toqueCamera = null;

let ultimaX = 0;
let ultimaY = 0;


document.addEventListener("touchstart", (e) => {

  for (const toque of e.changedTouches) {

    if (toque.target.closest(".touch-block")) {
      continue;
    }


    toqueCamera = toque.identifier;


    ultimaX = toque.clientX;
    ultimaY = toque.clientY;

  }

}, { passive: false });



document.addEventListener("touchmove", (e) => {

  if (toqueCamera === null) return;


  for (const toque of e.changedTouches) {

    if (toque.identifier !== toqueCamera) {
      continue;
    }


    e.preventDefault();


    const movimentoX = toque.clientX - ultimaX;
    const movimentoY = toque.clientY - ultimaY;


    girarCamera(
      movimentoX * 0.005,
      movimentoY * 0.005
    );


    ultimaX = toque.clientX;
    ultimaY = toque.clientY;

  }

}, { passive: false });



document.addEventListener("touchend", (e) => {

  for (const toque of e.changedTouches) {

    if (toque.identifier === toqueCamera) {

      toqueCamera = null;

    }

  }

});