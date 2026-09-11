import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

export function criarPlayer(){

 const geometria = new THREE.BoxGeometry(0.8,2,0.8);
 const material = new THREE.MeshStandardMaterial({color:0xff0000});

 const player = new THREE.Mesh(geometria,material);
 player.position.y=1;

 return player;
}
