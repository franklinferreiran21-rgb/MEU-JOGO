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
     if(!document.fullscreenElement){
       if(botao.requestFullscreen){
         await botao.requestFullscreen();
       }else if(document.documentElement.requestFullscreen){
         await document.documentElement.requestFullscreen();
       }
     }
   }catch(e){
     console.log('Fullscreen:', e);
   }

   setTimeout(async()=>{
     try{
       if(screen.orientation && screen.orientation.lock){
         await screen.orientation.lock('landscape-primary');
       }
     }catch(e){
       console.log('Rotacao:', e);
     }

     // esconder ao inves de remover para nao perder fullscreen no mobile
     botao.style.display = 'none';
     iniciarJogo();
   },200);
 }

 botao.addEventListener('pointerup', entrar, {passive:false});
 document.body.appendChild(botao);

}
