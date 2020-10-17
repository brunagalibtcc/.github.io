const radius = 0;
const height = 0; 

function createMesh(radius, height,  texture, alphaTexture){
  const geometry = new THREE.BoxGeometry(radius, height, 0.5);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0xffffff,
    opacity: 1,
    transparent: true,
  });
  //para adicionar sombra
  var customDepthMaterial = new THREE.MeshDepthMaterial({
    alphaMap: alphaTexture,
    alphaTest: 0.5,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.customDepthMaterial = customDepthMaterial;
  return mesh;
}

function createWall(radius, height,  texture, alphaTexture){
  const result = [];
  for (let instance = 1; instance <= 8; instance++) {
    const mesh = createMesh(radius, height,  texture, alphaTexture);  
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
  loadTexture('images/fundos_index/arvores_pequenas.png'),loadTexture('images/fundos_index/arvores_pequenas_invertidas.png')
]).then(textures=>createWall(70, 80, textures[0], textures[1]));

Promise.all([
  loadTexture('images/fundos_index/arvores_medias.png'),loadTexture('images/fundos_index/arvores_medias_invertidas.png')
]).then(textures=>createWall(80, 80, textures[0], textures[1]));

Promise.all([
  loadTexture('images/fundos_index/arvores_grandes.png'),loadTexture('images/fundos_index/arvores_grandes_invertidas.png')
]).then(textures=>createWall(85, 80,  textures[0], textures[1]));

Promise.all([
  loadTexture('images/fundos_index/arvores_transparentes.png'),loadTexture('images/fundos_index/alpha_test.png')
]).then(textures=>createWall(100, 80, textures[0], textures[1]));


const fundosPromise = Promise.all([
  loadTexture('/images/fundos/BN_fundo.png'),
  loadTexture('/images/fundos/HP_fundo.png'),
  loadTexture('/images/fundos/avatar_fundo.png'),
  loadTexture('/images/fundos/HA_fundo.png'),
  loadTexture('/images/fundos/mulan_fundo.png'),
  loadTexture('/images/fundos/vingadores_fundo.png')
]).then(textures=>{
  const radius = 30;
  const height = 20;
  const fundos = [];
  for (let instance = 1; instance <= 6; instance++) {
    const mesh = createMesh(20, height,  textures[instance-1], textures[instance-1]);
    mesh.position.x = radius * Math.sin(Math.PI * instance / 4);
    mesh.position.z = radius * Math.cos(Math.PI * instance / 4);
    mesh.position.y = 40;
    mesh.rotation.y = instance * Math.PI / 4;
    scene.add(mesh);
    fundos.push(mesh);
  }
  renderer.render(scene, camera);
  return fundos;
});



function light(fundos){
  const spotlights = [];
  const radius = 0;
  const color = ['#ec0035', '#00eb31', '#fd7622', '#fcd305', '#25b2c2', '#5600a0'];
  for (let instance = 1; instance <= 6; instance++){
    let spotLight = new THREE.SpotLight(color[instance-1] , 2, 60, 0.4);
    spotLight.position.set(radius*Math.sin(Math.PI * instance / 4),50,radius* Math.cos(Math.PI * instance /4));
    spotLight.castShadow = true;
    spotLight.target = fundos[instance -1];
    console.log(fundos[instance -1].position);
    spotLight.shadow.focus = 1;
    scene.add(spotLight);
    spotlights.push(spotLight);
  }
  return spotlights;  
}

fundosPromise.then((fundos)=> {
  light(fundos);
})


Promise.all([
  loadTexture('/images/icons/BN_icone.png'),
  loadTexture('/images/icons/HP_borda.png'),
  loadTexture('/images/icons/avatar_icone.png'),
  loadTexture('/images/icons/HA_icone.png'),
  loadTexture('/images/icons/mulan_icone.png'),
  loadTexture('/images/icons/vingadores_icone.png')
]).then(textures=>{
  const radius = 20;
  const height = 3;
  for (let instance = 1; instance <= 6; instance++) {
    const mesh = createMesh(3, height,  textures[instance-1], textures[instance-1]);
    mesh.userData = { URL: "/pages/branca_de_neve.html"}
    mesh.position.x = radius * Math.sin(Math.PI * instance / 4);
    mesh.position.z = radius * Math.cos(Math.PI * instance / 4);
    mesh.position.y = 40;
    mesh.rotation.y = instance * Math.PI / 4;
    scene.add(mesh);
  }
  renderer.render(scene, camera);
});

