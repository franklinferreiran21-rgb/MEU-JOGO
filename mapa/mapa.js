class Mapa {
    constructor(size) {
        this.size = size;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb); // Céu

        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(luzAmbiente);

        const luzDirecional = new THREE.DirectionalLight(0xffffff, 0.8);
        luzDirecional.position.set(50, 100, 50);
        luzDirecional.castShadow = true;
        this.scene.add(luzDirecional);

        const geometriaChao = new THREE.PlaneGeometry(this.size, this.size);
        const materialChao = new THREE.MeshStandardMaterial({ 
            color: 0x2e8b57, 
            roughness: 0.8
        });
        
        this.chao = new THREE.Mesh(geometriaChao, materialChao);
        this.chao.rotation.x = -Math.PI / 2; 
        this.chao.receiveShadow = true;
        this.scene.add(this.chao);

        const grid = new THREE.GridHelper(this.size, this.size / 2, 0x000000, 0x000000);
        grid.position.y = 0.01; 
        grid.material.opacity = 0.2; 
        grid.material.transparent = true;
        this.scene.add(grid);
    }

    getScene() {
        return this.scene;
    }
}
