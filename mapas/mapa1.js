import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

export function criarMapa(){
 const grupo = new THREE.Group();

 const geometria = new THREE.BoxGeometry(20,0.2,20);
 const material = new THREE.MeshStandardMaterial({color:0x228b22});
 const chao = new THREE.Mesh(geometria,material);
 chao.position.y=-0.1;
 grupo.add(chao);

 const paredeMaterial = new THREE.MeshStandardMaterial({color:0x777777});
 const paredes=[
  [20,2,0,0,1,-10],
  [20,2,0,0,1,10],
  [2,2,20,-10,1,0],
  [2,2,20,10,1,0]
 ];

 paredes.forEach(p=>{
  const parede=new THREE.Mesh(new THREE.BoxGeometry(p[0],p[1],p[2]),paredeMaterial);
  parede.position.set(p[3],p[4],p[5]);
  grupo.add(parede);
 });

 return grupo;
}
