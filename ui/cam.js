export function criarCameraRotativa(camera, alvo){

    let distancia = 8;
    let altura = 4;

    let rotacaoY = 0;
    let rotacaoX = 0;

    let alvoRotacaoY = 0;
    let alvoRotacaoX = 0;

    let ponteiroCamera = null;
    let ultimoX = 0;
    let ultimoY = 0;

    const sensibilidadeX = 0.012;
    const sensibilidadeY = 0.010;
    const suavidade = 0.18;

    document.addEventListener('pointerdown',(e)=>{
        if(e.target.closest('#joystick')) return;

        ponteiroCamera = e.pointerId;
        ultimoX = e.clientX;
        ultimoY = e.clientY;

        e.target.setPointerCapture?.(e.pointerId);
    });

    document.addEventListener('pointermove',(e)=>{
        if(e.pointerId !== ponteiroCamera) return;

        const dx = e.clientX - ultimoX;
        const dy = e.clientY - ultimoY;

        alvoRotacaoY -= dx * sensibilidadeX;
        alvoRotacaoX += dy * sensibilidadeY;

        alvoRotacaoX = Math.max(-1.1, Math.min(1.1, alvoRotacaoX));

        ultimoX = e.clientX;
        ultimoY = e.clientY;
    });

    document.addEventListener('pointerup',(e)=>{
        if(e.pointerId === ponteiroCamera){
            ponteiroCamera = null;
        }
    });

    function atualizar(){

        rotacaoY += (alvoRotacaoY - rotacaoY) * suavidade;
        rotacaoX += (alvoRotacaoX - rotacaoX) * suavidade;

        const alturaAtual = Math.sin(rotacaoX) * distancia;
        const distanciaHorizontal = Math.cos(rotacaoX) * distancia;

        const x = alvo.position.x + Math.sin(rotacaoY) * distanciaHorizontal;
        const z = alvo.position.z + Math.cos(rotacaoY) * distanciaHorizontal;
        const y = alvo.position.y + altura + alturaAtual;

        camera.position.set(x,y,z);
        camera.lookAt(alvo.position);
    }

    return {
        atualizar,
        getRotacaoY:()=>rotacaoY,
        getRotacaoX:()=>rotacaoX
    };
}
