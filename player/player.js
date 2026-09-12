class Player {
    constructor(scene) {
        this.speed = 0.999;
        
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

        // Substitua o antigo update() por este calcularMovimento()
    calcularMovimento(joystickVector, cameraYaw, mapSize) {
        if (joystickVector.x === 0 && joystickVector.y === 0) return null;

        const joyX = joystickVector.x;
        const joyY = -joystickVector.y;
        const force = Math.min(1, Math.sqrt(joyX * joyX + joyY * joyY));
        
        const joyAngle = Math.atan2(-joyX, joyY);
        const moveAngle = cameraYaw + joyAngle;

        let proximoX = this.mesh.position.x - Math.sin(moveAngle) * this.speed * force;
        let proximoZ = this.mesh.position.z - Math.cos(moveAngle) * this.speed * force; 

        // Colisão mapa
        const limite = mapSize / 2 - (this.width / 2);
        proximoX = Math.max(-limite, Math.min(proximoX, limite));
        proximoZ = Math.max(-limite, Math.min(proximoZ, limite));

        // Rotação
        let diff = moveAngle - this.mesh.rotation.y;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff)); 
        let proximaRotY = this.mesh.rotation.y + diff * 0.25; 

        // Retorna as coordenadas calculadas em vez de aplicá-las
        return { x: proximoX, z: proximoZ, rotY: proximaRotY };
    }
}