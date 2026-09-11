class CameraOrbit {
    constructor(threeCamera, touchElement) {
        this.camera = threeCamera;
        this.touchElement = touchElement;
        
        this.radius = 12; 
        this.theta = 0;   
        this.phi = Math.PI / 3; 
        
        this.target = new THREE.Vector3(); 
        this.isDragging = false;
        this.previousPos = { x: 0, y: 0 };
        
        this.sensitivity = 0.006; 
        this.pointerId = null; 

        this.initEvents();
    }

    initEvents() {
        this.touchElement.addEventListener('pointerdown', (e) => {
            if (this.isDragging) return; 

            this.isDragging = true;
            this.pointerId = e.pointerId; 
            this.previousPos = { x: e.clientX, y: e.clientY };
        });

        document.addEventListener('pointermove', (e) => {
            if (!this.isDragging || e.pointerId !== this.pointerId) return;

            const deltaX = e.clientX - this.previousPos.x;
            const deltaY = e.clientY - this.previousPos.y;

            this.theta -= deltaX * this.sensitivity;
            this.phi -= deltaY * this.sensitivity;

            const minPhi = 0.1; 
            const maxPhi = Math.PI / 2 - 0.1; 
            this.phi = Math.max(minPhi, Math.min(this.phi, maxPhi));

            this.previousPos = { x: e.clientX, y: e.clientY };
        });

        document.addEventListener('pointerup', (e) => {
            if (e.pointerId === this.pointerId) {
                this.isDragging = false;
                this.pointerId = null;
            }
        });

        document.addEventListener('pointercancel', (e) => {
            if (e.pointerId === this.pointerId) {
                this.isDragging = false;
                this.pointerId = null;
            }
        });
    }

    update(player) {
        const playerPos = player.mesh.position.clone();
        playerPos.y += 1; 
        
        // Copia a posição sem delay (sem lerp)
        this.target.copy(playerPos); 

        const x = this.target.x + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
        const y = this.target.y + this.radius * Math.cos(this.phi);
        const z = this.target.z + this.radius * Math.sin(this.phi) * Math.cos(this.theta);

        this.camera.position.set(x, y, z);
        this.camera.lookAt(this.target);
    }

    getYaw() {
        return this.theta;
    }
}
