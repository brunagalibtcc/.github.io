const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas')
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
