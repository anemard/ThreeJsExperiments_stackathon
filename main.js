import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// scene === a container that holds all your 'cameras' and 'lights'
const scene = new THREE.Scene();

// the camera will give the perspective of the viewer. this can come from different cameras / camera types. The most common type is the Perspective Camera (used here, which is designed to mimic what the human eye ball would see) -- it will take four arguments: the first is 'Field of View' or the amount of the scene that is in view (based on a full 360 degrees), the second argument is the aspect ratio that is based on the user's browser window (it can be calc by divided by the windows inner width by the inner height), the last two help to define what objects are visible to the camera itself (as defined below, most everything within view will be visible)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ(30)

renderer.render( scene, camera )

// Torus object definition:
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 })
const torus = new THREE.Mesh( geometry, material )
scene.add(torus)

//instantiating a new point light / ambient light /light helper
const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set( 25, 25, 25 )
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls( camera, renderer.domElement );

function addStar() {
  const geometry = new THREE.SphereGeometry(.25, .25, .24)
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
  const star = new THREE.Mesh( geometry, material )

  // this will randomly generate a location for each of the stars: (the randFloatSpread will randomly generate a number between -100 and 100)
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)


// ADDING SQUIRREL:
const forestTexture = new THREE.TextureLoader().load('forest.jpg')
scene.background = forestTexture

const squirrelTexture = new THREE.TextureLoader().load('squirrel.jpg')
const squirrel = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: squirrelTexture })
)

squirrel.position.z = 0;
squirrel.position.setX(-5);

scene.add(squirrel)

const forestTexture2 = new THREE.TextureLoader().load('forest.jpg')
scene.background = forestTexture2

const squirrelTexture2 = new THREE.TextureLoader().load('squirrel.jpg')
const squirrel2 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: squirrelTexture2 })
)

squirrel2.position.z = 30;
squirrel2.position.setX(-5);

scene.add(squirrel2)

// ADDING BAT SPHERE
const batTexture = new THREE.TextureLoader().load('bat.jpg')
const bat = new THREE.Mesh(
  new THREE.SphereGeometry( 3, 32, 32 ),
  new THREE.MeshStandardMaterial({
    map: batTexture,
  })
)
bat.position.z = 20;
bat.position.setX(0);

scene.add(bat)

// this function will allow the camera to move as the scrolling occurs
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  bat.rotation.x += .05;
  bat.rotation.y += .075;
  bat.rotation.z += .05;

  squirrel.rotation.y += .01;
  squirrel.rotation.z += .01;

  squirrel2.rotation.y += .01;
  squirrel2.rotation.x += .05;
  squirrel2.rotation.z += .02;

  camera.position.z = t * -.01;
  camera.position.x = t * -.0002;
  camera.position.y = t * -.0002;

}

document.body.onscroll = moveCamera

// LOAD PAGE / RERENDER
function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render( scene, camera )
}

animate()