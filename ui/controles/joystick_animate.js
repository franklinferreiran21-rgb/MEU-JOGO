import { moverJoystick } from './joystick.js';


const base = document.createElement("div");
const stick = document.createElement("div");


base.className = "joystick touch-block";
stick.className = "joystick-stick";


base.appendChild(stick);
document.body.appendChild(base);



let ativo = false;
let toqueJoystick = null;

const limite = 50;



base.addEventListener("touchstart", (e) => {

  const toque = e.changedTouches[0];

  toqueJoystick = toque.identifier;

  ativo = true;

  e.preventDefault();

}, { passive: false });



base.addEventListener("touchmove", (e) => {

  if (!ativo) return;


  e.preventDefault();


  for (const toque of e.changedTouches) {


    if (toque.identifier !== toqueJoystick) {
      continue;
    }


    const rect = base.getBoundingClientRect();


    let x = toque.clientX - (rect.left + rect.width / 2);
    let y = toque.clientY - (rect.top + rect.height / 2);



    const distancia = Math.sqrt(
      x * x + y * y
    );



    if (distancia > limite) {

      x = (x / distancia) * limite;
      y = (y / distancia) * limite;

    }



    stick.style.transform =
      `translate(${x}px, ${y}px)`;


    moverJoystick(
      x / limite,
      y / limite
    );

  }


}, { passive: false });



base.addEventListener("touchend", (e) => {


  for (const toque of e.changedTouches) {


    if (toque.identifier === toqueJoystick) {


      toqueJoystick = null;

      ativo = false;


      stick.style.transform =
        "translate(0px, 0px)";


      moverJoystick(0, 0);

    }

  }


});