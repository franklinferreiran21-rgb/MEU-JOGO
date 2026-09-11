export function criarCameraRotativa(camera, alvo){

 let distancia = 8;
 let rotacaoY = 0;
 let rotacaoX = 0.35;
 let ponteiro = null;
 let ultimoX = 0;
 let ultimoY = 0;

 const sensibilidadeY = 0.012;
 const sensibilidadeX = 0.010;

 const canvas = camera;

 document.addEventListener('pointerdown',(e)=>{
   if(e.target.closest('#joystick')) return;

   ponteiro = e.pointerId;
   ultimoX = e.clientX;
   ultimoY = e.clientY;
 });

 document.addEventListener('pointermove',(e)=>{
   if(e.pointerId !== ponteiro) return;

   const dx = e.clientX - ultimoX;
   const dy = e.clientY - ultimoY;

   rotacaoY -= dx * sensibilidadeY;
   rotacaoX += dy * sensibilidadeX;

   rotacaoX = Math.max(-1.2, Math.min(1.2, rotacaoX));

   ultimoX = e.clientX;
   ultimoY = e.clientY;
 });

 document.addEventListener('pointerup',(e)=>{
   if(e.pointerId === ponteiro) ponteiro = null;
 });

 function atualizar(){
   const horizontal = Math.cos(rotacaoX) * distancia;

   camera.position.x = alvo.position.x + Math.sin(rotacaoY) * horizontal;
   camera.position.y = alvo.position.y + Math.sin(rotacaoX) * distancia + 2;
   camera.position.z = alvo.position.z + Math.cos(rotacaoY) * horizontal;

   camera.lookAt(alvo.position);
 }

 return {
   atualizar,
   getRotacaoY:()=>rotacaoY,
   getRotacaoX:()=>rotacaoX
 };
}
