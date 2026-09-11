export function criarCameraRotativa(camera, alvo){
 let distancia = 8;
 let rotacaoY = 0;
 let rotacaoX = 0.35;
 let ponteiro = null;
 let ultimoX = 0;
 let ultimoY = 0;
 const sensibilidadeY = 0.03;
 const sensibilidadeX = 0.02;
 const tela = document.querySelector('canvas');

 tela.style.touchAction='none';

 tela.addEventListener('pointerdown',(e)=>{
  if(e.target.closest && e.target.closest('#joystick')) return;
  ponteiro=e.pointerId;
  ultimoX=e.clientX;
  ultimoY=e.clientY;
  tela.setPointerCapture(e.pointerId);
 });

 tela.addEventListener('pointermove',(e)=>{
  if(e.pointerId!==ponteiro)return;
  rotacaoY-=(e.clientX-ultimoX)*sensibilidadeY;
  rotacaoX+=(e.clientY-ultimoY)*sensibilidadeX;
  rotacaoX=Math.max(-1.1,Math.min(1.1,rotacaoX));
  ultimoX=e.clientX;
  ultimoY=e.clientY;
 });

 function soltar(e){ if(e.pointerId===ponteiro) ponteiro=null; }
 tela.addEventListener('pointerup',soltar);
 tela.addEventListener('pointercancel',soltar);

 function atualizar(){
  const horizontal=Math.cos(rotacaoX)*distancia;
  camera.position.set(
   alvo.position.x+Math.sin(rotacaoY)*horizontal,
   alvo.position.y+Math.sin(rotacaoX)*distancia+2,
   alvo.position.z+Math.cos(rotacaoY)*horizontal
  );
  camera.lookAt(alvo.position);
 }

 return {atualizar,getRotacaoY:()=>rotacaoY,getRotacaoX:()=>rotacaoX};
}
