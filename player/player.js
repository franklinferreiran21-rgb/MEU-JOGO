import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

export function criarPlayer(){

 const geometria = new THREE.BoxGeometry(0.8,2,0.8);
 const material = new THREE.MeshStandardMaterial({color:0xff0000});

 const player = new THREE.Mesh(geometria,material);
 player.position.y=1;

 player.velocidade = 0.08;

 player.atualizar = function(joystick){

   const x = joystick.x;
   const z = joystick.y;

   player.position.x += x * player.velocidade;
   player.position.z += z * player.velocidade;

   // Faz o player virar para a direção do movimento
   if(Math.abs(x) > 0.1 || Math.abs(z) > 0.1){

      const angulo = Math.atan2(x, z);
      player.rotation.y = angulo;

   }

 };

 return player;
}
