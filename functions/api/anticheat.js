export async function onRequestPost(context) {
    try {
        // Recebe os dados enviados pelo main.js do jogador
        const requisicao = await context.request.json();
        const { posicaoAntiga, posicaoNova, tempoDecorridoMs } = requisicao;

        // --- A VARIÁVEL BLINDADA ---
        // O hacker não tem como ver ou alterar isso pelo F12
        const SPEED_MAX = 0.99; 
        
        // Calcula a distância matemática máxima baseada no tempo
        // 60 frames por segundo (1000ms / 60)
        const frames = tempoDecorridoMs / (1000 / 60); 
        
        // Adicionamos +1.5 de tolerância para o caso de a internet do jogador dar uma leve engasgada (lag)
        const distanciaMaximaPermitida = (SPEED_MAX * frames) + 1.5; 

        // Calcula a distância real que o jogador andou lá no celular dele
        const dx = posicaoNova.x - posicaoAntiga.x;
        const dz = posicaoNova.z - posicaoAntiga.z;
        const distanciaPercorrida = Math.sqrt(dx * dx + dz * dz);

        // O JULGAMENTO
        if (distanciaPercorrida > distanciaMaximaPermitida) {
            return new Response(JSON.stringify({ 
                status: "HACK_DETECTADO", 
                posicaoCorreta: posicaoAntiga // Devolve a coordenada antes dele hackear
            }), { headers: { 'Content-Type': 'application/json' } });
        }

        // Se estiver tudo certo, apenas dá o OK
        return new Response(JSON.stringify({ status: "OK" }), { 
            headers: { 'Content-Type': 'application/json' } 
        });
        
    } catch (erro) {
        return new Response(JSON.stringify({ status: "ERRO_NA_API" }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}
