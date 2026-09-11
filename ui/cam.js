export function criarCameraRotativa(camera, alvo){

    let distancia = 8;
    let altura = 4;

    let rotacaoY = 0;
    let rotacaoX = 0;

    let ponteiroCamera = null;
    let ultimoX = 0;
    let ultimoY = 0;

    // area da camera: qualquer toque fora do joystick
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

        rotacaoY -= dx * 0.008;
        rotacaoX -= dy * 0.006;

        rotacaoX = Math.max(-1, Math.min(1, rotacaoX));

        ultimoX = e.clientX;
        ultimoY = e.clientY;

    });


    document.addEventListener('pointerup',(e)=>{

        if(e.pointerId !== ponteiroCamera) return;

        ponteiroCamera = null;

    });


    function atualizar(){

        const x = alvo.position.x + Math.sin(rotacaoY) * distancia;
        const z = alvo.position.z + Math.cos(rotacaoY) * distancia;

        camera.position.set(
            x,
            alvo.position.y + altura,
            z
        );

        camera.lookAt(alvo.position);
    }


    return {
        atualizar
    };
}
