import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

export function criarPlayer(){

 const geometria = new THREE.BoxGeometry(0.8,2,0.8);
 const material = new THREE.MeshStandardMaterial({color:0xff0000});

 const player = new THREE.Mesh(geometria,material);
 player.position.y=1;

 // Olho do player
 const olhoGeometria = new THREE.SphereGeometry(0.12,16,16);
 const olhoMaterial = new THREE.MeshStandardMaterial({color:0xffffff});
 const olho = new THREE.Mesh(olhoGeometria, olhoMaterial);

 olho.position.set(0,0.45,0.42);
 player.add(olho);

 // Pupila
 const pupilaGeometria = new THREE.SphereGeometry(0.05,16,16);
 const pupilaMaterial = new THREE.MeshStandardMaterial({color:0x000000});
 const pupila = new THREE.Mesh(pupilaGeometria, pupilaMaterial);

 pupila.position.set(0,0,0.1);
 olho.add(pupila);

 player.velocidade = 0.08;

 player.atualizar = function(joystick){

   const x = joystick.x;
   const z = joystick.y;

   player.position.x += x * player.velocidade;
   player.position.z += z * player.velocidade;

   if(Math.abs(x) > 0.1 || Math.abs(z) > 0.1){

      const angulo = Math.atan2(x, z);
      player.rotation.y = angulo;

   }

 };

 return player;
}
