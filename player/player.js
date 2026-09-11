class Player {
    constructor(scene) {
        this.speed = 0.09;
        
        // Dimensões do retângulo em pé (Largura, Altura, Profundidade)
        this.width = 1;
        this.height = 2;
        this.depth = 1;

        // O "mesh" principal (Container)
        this.mesh = new THREE.Group();
        
        // Deixa ele exatamente encostado no chão
        this.mesh.position.y = this.height / 2;

        // O "corpo" visual (Retângulo)
        const geometria = new THREE.BoxGeometry(this.width, this.height, this.depth);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff88, roughness: 0.4 });
        this.body = new THREE.Mesh(geometria, material);
        this.body.castShadow = true;

        // Adicionando um "Rosto/Visor" vermelho para marcar a frente da visão
        const visorGeo = new THREE.BoxGeometry(0.8, 0.3, 0.4);
        const visorMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        
        // Posiciona o visor perto do topo e na frente (-Z)
        visor.position.set(0, this.height / 2 - 0.3, -this.depth / 2 - 0.1); 
        this.body.add(visor);

        this.mesh.add(this.body); 
        scene.add(this.mesh);
    }

        update(joystickVector, cameraYaw, mapSize) {
        // Se o controle está solto, não faz nada
        if (joystickVector.x === 0 && joystickVector.y === 0) return;

        const joyX = joystickVector.x;
        const joyY = -joystickVector.y;

        // Força do analógico
        const force = Math.min(1, Math.sqrt(joyX * joyX + joyY * joyY));
        
        // A CORREÇÃO ESTÁ AQUI:
        // Passamos -joyX para o atan2. Isso alinha o joystick com a rotação anti-horária do Three.js
        const joyAngle = Math.atan2(-joyX, joyY);
        
        const moveAngle = cameraYaw + joyAngle;

        // A CORREÇÃO DO MOVIMENTO:
        // Em Three.js, a direção "frente" baseada em um ângulo usa valores negativos de Seno e Cosseno
        this.mesh.position.x -= Math.sin(moveAngle) * this.speed * force;
        this.mesh.position.z -= Math.cos(moveAngle) * this.speed * force; 

        // Colisão com as bordas do mapa
        const limite = mapSize / 2 - (this.width / 2);
        this.mesh.position.x = Math.max(-limite, Math.min(this.mesh.position.x, limite));
        this.mesh.position.z = Math.max(-limite, Math.min(this.mesh.position.z, limite));

        // FLIP DE VISÃO (Giro do corpo)
        let diff = moveAngle - this.mesh.rotation.y;
        
        // Normaliza para ele não dar uma volta completa à toa
        diff = Math.atan2(Math.sin(diff), Math.cos(diff)); 
        
        this.mesh.rotation.y += diff * 0.25; 
    }

}
