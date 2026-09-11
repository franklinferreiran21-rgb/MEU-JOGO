import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';


let angulo = 0;
let anguloY = 0;


const distancia = 5;
const altura = 2;



export function criarCamera() {

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );


  return camera;

}



export function seguirPlayer(camera, player) {


  const x = Math.sin(angulo) * distancia;
  const z = Math.cos(angulo) * distancia;



  camera.position.x = player.position.x - x;

  camera.position.y =
    player.position.y + altura + anguloY;

  camera.position.z =
    player.position.z + z;



  camera.lookAt(
    player.position
  );


}



export function girarCamera(x, y) {


  angulo += x;


  anguloY += y;



  anguloY = Math.max(
    -1.2,
    Math.min(1.2, anguloY)
  );


}



export function getAnguloCamera() {

  return angulo;

}