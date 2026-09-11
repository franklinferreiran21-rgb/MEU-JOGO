import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

export function criarPlayer(){
 const geometria = new THREE.BoxGeometry(0.8,2,0.8);
 const material = new THREE.MeshStandardMaterial({color:0xff0000});
 const player = new THREE.Mesh(geometria,material);
 player.position.y = 1;

 player.velocidade = 0.08;
 player.velY = 0;
 player.noChao = false;

 player.atualizar = function(joystick, cameraRotacao = 0, objetosColisao = []){
   const x = joystick.x;
   const z = -joystick.y;

   const cos = Math.cos(cameraRotacao);
   const sin = Math.sin(cameraRotacao);

   const movX = x * cos + z * sin;
   const movZ = z * cos - x * sin;

   const antigoX = player.position.x;
   const antigoZ = player.position.z;

   player.position.x += movX * player.velocidade;
   player.position.z += movZ * player.velocidade;

   if(colidiu(player, objetosColisao)){
     player.position.x = antigoX;
     player.position.z = antigoZ;
   }

   player.velY -= 0.01;
   player.position.y += player.velY;

   if(player.position.y < 1){
     player.position.y = 1;
     player.velY = 0;
     player.noChao = true;
   }

   if(Math.abs(x)>0.1 || Math.abs(z)>0.1){
     player.rotation.y = Math.atan2(movX,movZ);
   }
 };

 return player;
}

function colidiu(obj, lista){
 const caixa = new THREE.Box3().setFromObject(obj);
 for(const item of lista){
   const outra = new THREE.Box3().setFromObject(item);
   if(caixa.intersectsBox(outra)) return true;
 }
 return false;
}
