import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

import { getJoystick } from '../../ui/controles/joystick.js';
import { getAnguloCamera } from '../../ui/cam.js';
import { consumirPulo } from '../../ui/controles/pulo.js';



export function criarPlayer() {


  const geometria = new THREE.BoxGeometry(1, 2, 1);


  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });



  const player = new THREE.Mesh(
    geometria,
    material
  );



  const olho = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0x0000ff
    })
  );



  olho.position.set(
    0,
    0.5,
    -0.5
  );


  player.add(olho);



  player.position.set(
    0,
    1,
    0
  );



  // =================
  // FÍSICA DO PULO
  // =================

  let velocidadeY = 0;

  const gravidade = -0.01;

  const forcaPulo = 0.25;

  let noChao = true;




  function atualizar() {



    // =================
    // PULO
    // =================

    if (consumirPulo() && noChao) {

      velocidadeY = forcaPulo;

      noChao = false;

    }



    // gravidade

    velocidadeY += gravidade;

    player.position.y += velocidadeY;



    // chão

    if (player.position.y <= 1) {

      player.position.y = 1;

      velocidadeY = 0;

      noChao = true;

    }





    // =================
    // MOVIMENTO
    // =================

    const controle = getJoystick();

    const anguloCamera = getAnguloCamera();


    const velocidade = 0.05;



    if (
      controle.x !== 0 ||
      controle.y !== 0
    ) {



      const frenteX = Math.sin(anguloCamera);

      const frenteZ = -Math.cos(anguloCamera);



      const ladoX = Math.cos(anguloCamera);

      const ladoZ = Math.sin(anguloCamera);





      const movimentoX =
        (frenteX * -controle.y) +
        (ladoX * controle.x);



      const movimentoZ =
        (frenteZ * -controle.y) +
        (ladoZ * controle.x);





      player.position.x += movimentoX * velocidade;

      player.position.z += movimentoZ * velocidade;





      const rotacao = Math.atan2(
        movimentoX,
        movimentoZ
      ) + Math.PI;



      player.rotation.y = rotacao;


    }


  }




  player.atualizar = atualizar;


  return player;

}