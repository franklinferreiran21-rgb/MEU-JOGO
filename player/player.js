class Player {
    constructor(scene) {
        this.speed = 0.25;
        
        this.width = 1;
        this.height = 2;
        this.depth = 1;

        this.mesh = new THREE.Group();
        this.mesh.position.y = this.height / 2;

        const geometria = new THREE.BoxGeometry(this.width, this.height, this.depth);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff88, roughness: 0.4 });
        this.body = new THREE.Mesh(geometria, material);
        this.body.castShadow = true;

        const visorGeo = new THREE.BoxGeometry(0.8, 0.3, 0.4);
        const visorMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        
        visor.position.set(0, this.height / 2 - 0.3, -this.depth / 2 - 0.1); 
        this.body.add(visor);

        this.mesh.add(this.body); 
        scene.add(this.mesh);
    }

    update(joystickVector, cameraYaw, mapSize) {
        if (joystickVector.x === 0 && joystickVector.y === 0) return;

        const joyX = joystickVector.x;
        const joyY = -joystickVector.y;

        const force = Math.min(1, Math.sqrt(joyX * joyX + joyY * joyY));
        
        // Eixo X invertido para consertar a "miragem" na rotação
        const joyAngle = Math.atan2(-joyX, joyY);
        
        const moveAngle = cameraYaw + joyAngle;

        // Movimentação subtraindo para acompanhar o Three.js
        this.mesh.position.x -= Math.sin(moveAngle) * this.speed * force;
        this.mesh.position.z -= Math.cos(moveAngle) * this.speed * force; 

        // Colisão mapa
        const limite = mapSize / 2 - (this.width / 2);
        this.mesh.position.x = Math.max(-limite, Math.min(this.mesh.position.x, limite));
        this.mesh.position.z = Math.max(-limite, Math.min(this.mesh.position.z, limite));

        // Flip da Visão
        let diff = moveAngle - this.mesh.rotation.y;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff)); 
        this.mesh.rotation.y += diff * 0.25; 
    }
}
