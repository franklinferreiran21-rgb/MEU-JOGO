import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';


export function criarMapa(cena) {
  
  cena.background = new THREE.Color(0x87ceeb);

  const mapa = new THREE.Group();


  const luzDirecional = new THREE.DirectionalLight(
    0xffffff,
    1
  );

  luzDirecional.position.set(
    5,
    10,
    5
  );

  mapa.add(luzDirecional);



  const luzAmbiente = new THREE.AmbientLight(
    0xffffff,
    0.4
  );

  mapa.add(luzAmbiente);



  const geometriaPlano = new THREE.PlaneGeometry(
    200,
    200
  );


  const materialPlano = new THREE.MeshStandardMaterial({
    color: 0x808080,
    side: THREE.DoubleSide
  });


  const chao = new THREE.Mesh(
    geometriaPlano,
    materialPlano
  );
  
  const grade = new THREE.GridHelper(
  
  200, // tamanho da grade
  200  // quantidade de divisões
  );
  
  mapa.add(grade);


  chao.rotation.x = -Math.PI / 2;


  mapa.add(chao);


  return mapa;

}