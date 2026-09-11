export function criarJoystick(){

    const joystick = {
        x: 0,
        y: 0,
        ativo: false
    };

    const base = document.createElement('div');
    const bola = document.createElement('div');

    base.id = 'joystick';
    bola.id = 'joystick-bola';

    base.appendChild(bola);
    document.body.appendChild(base);

    Object.assign(base.style, {
        position:'fixed',
        left:'30px',
        bottom:'30px',
        width:'120px',
        height:'120px',
        borderRadius:'50%',
        background:'rgba(255,255,255,0.2)',
        touchAction:'none'
    });

    Object.assign(bola.style, {
        position:'absolute',
        left:'40px',
        top:'40px',
        width:'40px',
        height:'40px',
        borderRadius:'50%',
        background:'rgba(255,255,255,0.6)'
    });

    let inicioX = 0;
    let inicioY = 0;

    base.addEventListener('pointerdown',(e)=>{
        joystick.ativo = true;
        inicioX = e.clientX;
        inicioY = e.clientY;
        base.setPointerCapture(e.pointerId);
    });

    base.addEventListener('pointermove',(e)=>{
        if(!joystick.ativo) return;

        let dx = e.clientX - inicioX;
        let dy = e.clientY - inicioY;

        const limite = 40;
        const distancia = Math.min(Math.hypot(dx,dy), limite);

        const angulo = Math.atan2(dy,dx);

        dx = Math.cos(angulo) * distancia;
        dy = Math.sin(angulo) * distancia;

        joystick.x = dx / limite;
        joystick.y = dy / limite;

        bola.style.transform = `translate(${dx}px,${dy}px)`;
    });

    base.addEventListener('pointerup',()=>{
        joystick.ativo = false;
        joystick.x = 0;
        joystick.y = 0;
        bola.style.transform = 'translate(0,0)';
    });

    return joystick;
}
