export function criarCameraRotativa(camera, alvo){

    let distancia = 8;

    let rotacaoY = 0;
    let rotacaoX = 0.35;

    let alvoRotacaoY = 0;
    let alvoRotacaoX = 0.35;

    let ponteiroCamera = null;
    let ultimoX = 0;
    let ultimoY = 0;

    const sensibilidadeY = 0.04;
    const sensibilidadeX = 0.025;
    const suavidade = 0.45;

    document.addEventListener('pointerdown',(e)=>{
        if(e.target.closest('#joystick')) return;

        ponteiroCamera = e.pointerId;
        ultimoX = e.clientX;
        ultimoY = e.clientY;

        if(e.target.setPointerCapture){
            e.target.setPointerCapture(e.pointerId);
        }
    }, {passive:false});

    document.addEventListener('pointermove',(e)=>{
        if(e.pointerId !== ponteiroCamera) return;

        const dx = e.clientX - ultimoX;
        const dy = e.clientY - ultimoY;

        alvoRotacaoY -= dx * sensibilidadeY;
        alvoRotacaoX += dy * sensibilidadeX;

        alvoRotacaoX = Math.max(-1.2, Math.min(1.2, alvoRotacaoX));

        ultimoX = e.clientX;
        ultimoY = e.clientY;
    }, {passive:false});

    document.addEventListener('pointerup',(e)=>{
        if(e.pointerId === ponteiroCamera){
            ponteiroCamera = null;
        }
    });

    function atualizar(){

        rotacaoY += (alvoRotacaoY - rotacaoY) * suavidade;
        rotacaoX += (alvoRotacaoX - rotacaoX) * suavidade;

        const horizontal = Math.cos(rotacaoX) * distancia;

        const x = alvo.position.x + Math.sin(rotacaoY) * horizontal;
        const y = alvo.position.y + Math.sin(rotacaoX) * distancia + 2;
        const z = alvo.position.z + Math.cos(rotacaoY) * horizontal;

        camera.position.set(x,y,z);
        camera.lookAt(alvo.position);
    }

    return {
        atualizar,
        getRotacaoY:()=>rotacaoY,
        getRotacaoX:()=>rotacaoX
    };
}
