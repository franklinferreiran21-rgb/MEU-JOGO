export function criarTelaInicial(iniciarJogo){

 const tela = document.createElement('div');

 tela.style.position = 'fixed';
 tela.style.inset = '0';
 tela.style.display = 'flex';
 tela.style.alignItems = 'center';
 tela.style.justifyContent = 'center';
 tela.style.background = 'rgba(0,0,0,0.55)';
 tela.style.color = 'white';
 tela.style.fontSize = '40px';
 tela.style.fontFamily = 'Arial';
 tela.style.zIndex = '9999';
 tela.style.userSelect = 'none';
 tela.style.touchAction = 'none';

 tela.innerHTML = 'TOQUE PARA JOGAR';

 async function entrar(){

   tela.removeEventListener('pointerdown', entrar);

   try{
     const elemento = document.documentElement;

     if(!document.fullscreenElement){
       if(elemento.requestFullscreen){
         await elemento.requestFullscreen();
       }else if(elemento.webkitRequestFullscreen){
         elemento.webkitRequestFullscreen();
       }
     }
   }catch(e){
     console.log('Fullscreen bloqueado', e);
   }

   try{
     if(screen.orientation && screen.orientation.lock){
       await screen.orientation.lock('landscape');
     }
   }catch(e){
     console.log('Rotação bloqueada', e);
   }

   iniciarJogo();
 }

 tela.addEventListener('pointerdown', entrar);
 document.body.appendChild(tela);

}
