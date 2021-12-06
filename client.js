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
scene.background = new THREE.Color(0x357fb0);

// const light = new THREE.DirectionalLight(0xffffff, 1, 100);
// light.position.set(0, 1, 0); //default; light shining from top
// light.castShadow = true; // default false
// scene.add(light);

// camera setup
const fov = 60;
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
renderer.setSize(window.innerWidth, window.innerHeight / 1.1);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

// apply shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.DirectionalLight(0xffffff, 1, 100);
light.position.set(0, 1, 0); //default; light shining from top
light.castShadow = true; // default false
scene.add(light);

//Set up shadow properties for the light
// light.shadow.mapSize.width = 512; // default
// light.shadow.mapSize.height = 512; // default
// light.shadow.camera.near = 0.5; // default
// light.shadow.camera.far = 500; // default

//Create a sphere that cast shadows (but does not receive them)
// const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphere.castShadow = true; //default is false
// sphere.receiveShadow = false; //default
// scene.add(sphere);

//Create a plane that receives shadows (but does not cast them)
// const planeGeometry = new THREE.PlaneGeometry(20, 40, 32, 32);
// const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff77 });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.receiveShadow = true;
// scene.add(plane);

//Create a helper for the shadow camera (optional)
// const helper = new THREE.CameraHelper(light.shadow.camera);
// scene.add(helper);

// end shadow

// orbit control setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.keys = {
  LEFT: "ArrowLeft", //left arrow
  UP: "ArrowUp", // up arrow
  RIGHT: "ArrowRight", // right arrow
  BOTTOM: "ArrowDown", // down arrow
};

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
const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
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
    renderer.setSize(window.innerWidth, window.innerHeight / 1.1);
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

// window.addEventListener("wheel", onMouseWheel);

// function onMouseWheel(event) {
//   camera.position.y += event.deltaY * 10;
// }
// rendering
const render = () => {
  renderer.render(scene, camera);
};

animate();
