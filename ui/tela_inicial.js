export function criarTelaInicial(iniciarJogo){

 const botao = document.createElement('button');

 botao.innerText = 'TOQUE PARA JOGAR';
 botao.style.position = 'fixed';
 botao.style.inset = '0';
 botao.style.width = '100%';
 botao.style.height = '100%';
 botao.style.background = 'rgba(0,0,0,0.55)';
 botao.style.color = 'white';
 botao.style.fontSize = '40px';
 botao.style.border = '0';
 botao.style.zIndex = '9999';
 botao.style.touchAction = 'none';

 async function entrar(){

   botao.disabled = true;

   try{
     // fullscreen no documento, nao no botao
     if(!document.fullscreenElement){
       if(document.documentElement.requestFullscreen){
         await document.documentElement.requestFullscreen();
       }else if(document.documentElement.webkitRequestFullscreen){
         document.documentElement.webkitRequestFullscreen();
       }
     }
   }catch(e){
     console.log('Fullscreen:', e);
   }

   try{
     if(screen.orientation && screen.orientation.lock){
       await screen.orientation.lock('landscape-primary');
     }
   }catch(e){
     console.log('Rotacao:', e);
   }

   botao.style.display = 'none';
   iniciarJogo();
 }

 botao.addEventListener('pointerup', entrar, {passive:false});
 document.body.appendChild(botao);

}
