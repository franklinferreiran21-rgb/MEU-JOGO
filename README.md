# 🕹️ Motor 3D com Three.js (Mobile First)

Um mini-motor de jogo 3D rodando direto no navegador, criado com HTML, CSS, JavaScript Vanilla e a biblioteca gráfica **Three.js**. 

O projeto tem foco total em dispositivos móveis, apresentando controles na tela e sistema de câmera orbital, no estilo Free Fire.

## 🚀 Funcionalidades
- **Câmera Orbital em 3ª Pessoa**: Deslize o dedo pela tela para girar a visão 360º ao redor do personagem.
- **Joystick Virtual**: Movimentação fluída calculando eixos X e Y.
- **Multitouch Avançado**: Suporte para usar o joystick e girar a câmera simultaneamente com dois dedos.
- **Movimentação Relativa**: O personagem se move e rotaciona com base na direção em que a câmera está apontando.
- **Arquitetura Modular**: Código limpo, utilizando ES6 Modules (Classes separadas por responsabilidade).

## 📁 Estrutura do Projeto
- `index.html`: Ponto de entrada limpo.
- `main.js`: Game Loop e inicialização das instâncias.
- `/mapa`: Geração da cena, luzes, chão plano e limites do mundo.
- `/player`: Lógica de movimentação, interpolação de rotação (Flip de visão) e física.
- `/ui`: Elementos de interface (Joystick, Câmera e eventos de toque por Pointer ID).

## 🛠️ Como jogar / rodar localmente
Por utilizar `type="module"`, os scripts precisam ser abertos via servidor web para evitar bloqueio de CORS.
Você pode acessar a versão hospedada aqui: **[COLOQUE O LINK DO SEU GITHUB PAGES AQUI]**
