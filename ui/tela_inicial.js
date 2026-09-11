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

 tela.innerHTML = 'TOQUE PARA JOGAR';

 async function entrar(){
   try{
     if(document.documentElement.requestFullscreen){
       await document.documentElement.requestFullscreen();
     }
   }catch(e){}

   try{
     if(screen.orientation?.lock){
       await screen.orientation.lock('landscape');
     }
   }catch(e){}

   tela.remove();
   iniciarJogo();
 }

 tela.addEventListener('pointerdown', entrar);
 document.body.appendChild(tela);

}
