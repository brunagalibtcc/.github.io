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

const secondWalls = Promise.all([
  loadTexture('images/fundos_index/arvores_medias.png'),loadTexture('images/fundos_index/arvores_medias_invertidas.png')
]).then(textures=>createWall(80, 80, textures[0], textures[1]));

const thirdWalls = Promise.all([
  loadTexture('images/fundos_index/arvores_transparentes.png'),loadTexture('images/fundos_index/alpha_test.png')
]).then(textures=>createWall(90, 80, textures[0], textures[1]));


const fundosPromise = Promise.all([
  loadTexture('/images/fundos/fanart.png'),
  loadTexture('/images/fundos/branca_de_neve.png'),
  loadTexture('/images/fundos/harry_potter.png'),
  loadTexture('/images/fundos/avatar.png'),
  loadTexture('/images/fundos/agradecimentos.png'),
  loadTexture('/images/fundos/hora_de_aventura.png'),
  loadTexture('/images/fundos/mulan.png'),
  loadTexture('/images/fundos/vingadores.png')
]).then(textures=>{
  const radius = 30;
  const height = 20;
  const fundos = [];
  for (let instance = 1; instance <= 8; instance++) {
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
  const color = ['#c7c6e1','#cc0000', '#00eb31', '#f75413' , '#c7c6e1', '#ff8c00', '#25b2f2', '#bb00ff'];
  for (let instance = 1; instance <= 8; instance++){
    let spotLight = new THREE.SpotLight(
      color[instance-1], // color
      1, // intensity
      1000, // distance
      0.3, // angle
      0.8, // penumbra
      2 // decay
    );

    spotLight.position.set(radius*Math.sin(Math.PI * instance / 4),70,radius* Math.cos(Math.PI * instance /4));
    spotLight.target = fundos[instance -1];

    spotLight.castShadow = true;

    spotLight.shadow.focus = 1;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 5;
    spotLight.shadow.camera.far = 1000;

    scene.add(spotLight);
    spotlights.push(spotLight);
  }
  return spotlights;  
}

fundosPromise.then((fundos)=> {
  light(fundos);
})


const iconsPromise = Promise.all([
  loadTexture('/images/icons/branca_de_neve.png'),
  loadTexture('/images/icons/harry_potter.png'),
  loadTexture('/images/icons/avatar.png'),
  loadTexture('/images/icons/hora_de_aventura.png'),
  loadTexture('/images/icons/mulan.png'),
  loadTexture('/images/icons/vingadores.png')
]).then(textures=>{
  const icons = [];
  const radius = 25;
  const height = 3;
  const r = 2;
  const URL = ["/pages/branca_de_neve.html", "/pages/harry_potter.html", "/pages/avatar.html", "/pages/hora_de_aventura.html", "/pages/mulan.html", "/pages/vingadores.html"]
  let image = 0; 
  for (let instance = 1; instance <= 8; instance++) {
    if (instance == 1 || instance == 5){
      continue;
    }
    const mesh = createMesh(3, height,  textures[image], textures[image]);
    mesh.userData = { name: `icon-${instance}`, url: URL[image]};
    image++;
    mesh.position.x = radius * Math.sin(Math.PI * instance / 4);
    mesh.position.z = radius * Math.cos(Math.PI * instance / 4);
    mesh.rotation.y = instance * Math.PI / 4;
    scene.add(mesh);
    icons.push(mesh);
  }
  animate(icons);
  return icons;
});

let t = 0;
function animate(icons){
  t += 0.05;
  icons.forEach((icon,index)=>icon.position.y = 40 + 0.3*Math.sin(t + index*Math.PI/4));
  renderer.render( scene, camera );
  requestAnimationFrame(()=>{
    animate(icons);
  });
}
