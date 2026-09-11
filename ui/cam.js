export function criarCameraRotativa(camera, alvo){

    let distancia = 8;
    let altura = 4;

    let rotacaoY = 0;
    let rotacaoX = 0;

    let arrastando = false;
    let ultimoX = 0;
    let ultimoY = 0;

    window.addEventListener('pointerdown',(e)=>{
        arrastando = true;
        ultimoX = e.clientX;
        ultimoY = e.clientY;
    });

    window.addEventListener('pointermove',(e)=>{

        if(!arrastando) return;

        const dx = e.clientX - ultimoX;
        const dy = e.clientY - ultimoY;

        rotacaoY -= dx * 0.005;
        rotacaoX -= dy * 0.005;

        rotacaoX = Math.max(-1,Math.min(1,rotacaoX));

        ultimoX = e.clientX;
        ultimoY = e.clientY;

    });

    window.addEventListener('pointerup',()=>{
        arrastando = false;
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
