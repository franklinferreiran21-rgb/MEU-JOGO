import { ativarPulo } from './pulo.js';


const botao = document.getElementById(
  "botao-pulo"
);


if (botao) {

  botao.addEventListener(
    "touchstart",
    (e) => {

      e.preventDefault();

      ativarPulo();

      console.log("botão pulo");

    },
    {
      passive: false
    }
  );

}