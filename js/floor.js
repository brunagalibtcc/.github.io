const floorSize = 1000;
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(floorSize, floorSize, 32),
  new THREE.MeshBasicMaterial({ color: 0x222322, side: THREE.DoubleSide })
);

floor.rotation.x = Math.PI/2;
floor.position.y = 15;
scene.add(floor);
