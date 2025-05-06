import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import Noise from './noise.js';
import { LSystem, interpretTurtle } from './lsystem.js';

let scene, camera, renderer;
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  const noise = new Noise();
  const geom = new THREE.PlaneGeometry(100,100,100,100);
  geom.rotateX(-Math.PI/2);
  for (let i = 0; i < geom.attributes.position.count; i++) {
    const x = geom.attributes.position.getX(i), z = geom.attributes.position.getZ(i);
    geom.attributes.position.setY(i, Math.round(noise.perlin(x*0.05,0,z*0.05)*10));
  }
  geom.computeVertexNormals();
  scene.add(new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: 0x556b2f })));

  const tree = new LSystem('F', {'F':'FF-[-F+F+F]+[+F-F-F]'}, 4);
  interpretTurtle(scene, tree.generate(), 1, 25);

  scene.add(new THREE.AmbientLight(0xffffff,0.5));
  const sun = new THREE.DirectionalLight(0xffffff,1);
  sun.position.set(50,100,50); scene.add(sun);

  animate();
}
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
window.addEventListener('load', init);
