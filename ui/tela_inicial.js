export function criarTelaInicial(iniciarJogo){

 const tela = document.createElement('div');
 const botao = document.createElement('button');

 tela.style.position = 'fixed';
 tela.style.inset = '0';
 tela.style.display = 'flex';
 tela.style.alignItems = 'center';
 tela.style.justifyContent = 'center';
 tela.style.background = 'rgba(0,0,0,0.55)';
 tela.style.zIndex = '9999';
 tela.style.touchAction = 'none';

 botao.textContent = 'TOQUE PARA JOGAR';
 botao.style.fontSize = '40px';
 botao.style.fontFamily = 'Arial';
 botao.style.color = 'white';
 botao.style.background = 'transparent';
 botao.style.border = '0';
 botao.style.userSelect = 'none';
 botao.style.touchAction = 'none';

 async function entrar(e){
   e.preventDefault();
   botao.removeEventListener('pointerdown', entrar);

   try{
     if(tela.requestFullscreen){
       await tela.requestFullscreen();
     }else if(document.documentElement.requestFullscreen){
       await document.documentElement.requestFullscreen();
     }else if(document.documentElement.webkitRequestFullscreen){
       document.documentElement.webkitRequestFullscreen();
     }
   }catch(err){
     console.log('Fullscreen bloqueado:', err);
   }

   try{
     if(screen.orientation?.lock){
       await screen.orientation.lock('landscape-primary');
     }
   }catch(err){
     console.log('Orientacao bloqueada:', err);
   }

   tela.remove();
   iniciarJogo();
 }

 botao.addEventListener('pointerdown', entrar, {passive:false});
 tela.appendChild(botao);
 document.body.appendChild(tela);

}
