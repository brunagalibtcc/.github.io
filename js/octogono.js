const radius = 0;

function createWall(radius, texture, alphaTexture){
  const result = [];
  for (let instance = 1; instance <= 8; instance++) {
    const geometry = new THREE.BoxGeometry(radius, 80, 1);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      opacity: 1,
      transparent: true,
    });
    var customDistanceMaterial = new THREE.MeshDistanceMaterial({
      alphaMap: alphaTexture,
      alphaTest: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  
    mesh.position.x = radius * Math.sin(Math.PI * instance / 4);
    mesh.position.z = radius * Math.cos(Math.PI * instance / 4);
    mesh.position.y = 40;
    mesh.rotation.y = instance * Math.PI / 4;
  
    result.push(mesh);
    scene.add(mesh);
  }
  return result
}

const wallsPromise = Promise.all([
  loadTexture('images/arvores_pequenas.png'),loadTexture('images/arvores_pequenas_invertidas.png')
]).then(textures=>createWall(70, textures[0], textures[1]));

Promise.all([
  loadTexture('images/arvores_medias.png'),loadTexture('images/arvores_medias_invertidas.png')
]).then(textures=>createWall(80, textures[0], textures[1]));

Promise.all([
  loadTexture('images/arvores_grandes.png'),loadTexture('images/arvores_grandes_invertidas.png')
]).then(textures=>createWall(85, textures[0], textures[1]));

Promise.all([
  loadTexture('images/arvores_transparentes.png'),loadTexture('images/alpha_test.png')
]).then(textures=>createWall(100, textures[0], textures[1]));
