import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

export function criarMapa(){
 const grupo = new THREE.Group();

 const geometria = new THREE.BoxGeometry(20,0.2,20);
 const material = new THREE.MeshStandardMaterial({color:0x228b22});
 const chao = new THREE.Mesh(geometria,material);
 chao.position.y=-0.1;
 grupo.add(chao);

 return grupo;
}
