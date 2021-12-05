import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import Stats from "https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js";

// global variables
let scene;
let camera;
let renderer;
const canvas = document.querySelector(".webgl");

// scene setup
scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0efeb);

// camera setup
const fov = 50;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

// renderer setup
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight / 1.5);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

// orbit control setup
const controls = new OrbitControls(camera, renderer.domElement);

// earth geometry
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

// earth material
const earthMaterial = new THREE.MeshPhongMaterial({
  roughness: 1,
  metalness: 0,
  map: THREE.ImageUtils.loadTexture("texture/earthmap1k.jpg"),
  bumpMap: THREE.ImageUtils.loadTexture("texture/earthbump.jpg"),
  bumpScale: 0.5,
});

// earth mesh
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// cloud Geometry
// const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

// cloud metarial
// const cloudMetarial = new THREE.MeshPhongMaterial({
//   map: THREE.ImageUtils.loadTexture("texture/earthCloud.png"),
//   transparent: true,
// });

// cloud mesh
// const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
// scene.add(cloudMesh);

// galaxy geometry
// const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
// const starMaterial = new THREE.MeshBasicMaterial({
//   map: THREE.ImageUtils.loadTexture("texture/1.jpeg"),
//   side: THREE.BackSide,
// });

// galaxy mesh
// const starMesh = new THREE.Mesh(starGeometry, starMaterial);
// scene.add(starMesh);

// ambient light (how much area light)
const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientlight);

// point light (how mush hard light)
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

// point light helper
// const Helper = new THREE.PointLightHelper(pointLight);
// scene.add(Helper);

// handling resizing
window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight / 1.5);
    render();
  },
  false
);

// current fps
const stats = Stats();
// document.body.appendChild(stats.dom);

// spinning animation
const animate = () => {
  requestAnimationFrame(animate);
  //   starMesh.rotation.y -= 0.002;
  //   earthMesh.rotation.y -= 0.0015;
  //   cloudMesh.rotation.y -= 0.001;
  controls.update();
  render();
  stats.update();
};

// rendering
const render = () => {
  renderer.render(scene, camera);
};

animate();
