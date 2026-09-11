class Mapa {
    constructor(size) {
        this.size = size;

        // 1. Cria a Cena Principal do jogo
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb); // Cor do céu
        
        // A linha que criava a neblina (this.scene.fog = ...) foi removida daqui!

        // 2. Adiciona as Luzes do mapa
        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(luzAmbiente);

        const luzDirecional = new THREE.DirectionalLight(0xffffff, 0.8);
        luzDirecional.position.set(50, 100, 50);
        luzDirecional.castShadow = true;
        this.scene.add(luzDirecional);

        // 3. Cria o Chão
        const geometriaChao = new THREE.PlaneGeometry(this.size, this.size);
        const materialChao = new THREE.MeshStandardMaterial({ 
            color: 0x2e8b57, // Verde escuro
            roughness: 0.8
        });
        
        this.chao = new THREE.Mesh(geometriaChao, materialChao);
        this.chao.rotation.x = -Math.PI / 2; // Deita o plano para virar o chão
        this.chao.receiveShadow = true;
        this.scene.add(this.chao);

        // 4. Cria a Grade (Grid)
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
