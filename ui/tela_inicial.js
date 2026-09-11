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

 async function entrar(e){

   e.preventDefault();
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

     await new Promise(r => setTimeout(r, 300));

     alert(document.fullscreenElement ? 'FULLSCREEN OK' : 'FULLSCREEN FALHOU');

   }catch(err){
     alert('ERRO FULLSCREEN: ' + err.message);
   }

   try{
     if(screen.orientation?.lock){
       await screen.orientation.lock('landscape-primary');
     }
   }catch(err){
     console.log('Rotação bloqueada:', err);
   }

   tela.remove();
   iniciarJogo();
 }

 tela.addEventListener('pointerdown', entrar, {passive:false});
 document.body.appendChild(tela);

}
