export function criarCameraRotativa(camera, alvo){

    let distancia = 8;
    let altura = 4;

    let rotacaoY = 0;
    let rotacaoX = 0;

    let ponteiroCamera = null;
    let ultimoX = 0;
    let ultimoY = 0;

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

        // Rotacao horizontal (eixo Y)
        rotacaoY -= dx * 0.008;

        // Rotacao vertical (eixo X)
        rotacaoX -= dy * 0.006;
        rotacaoX = Math.max(-1.1, Math.min(1.1, rotacaoX));

        ultimoX = e.clientX;
        ultimoY = e.clientY;
    });

    document.addEventListener('pointerup',(e)=>{
        if(e.pointerId === ponteiroCamera){
            ponteiroCamera = null;
        }
    });

    function atualizar(){

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
