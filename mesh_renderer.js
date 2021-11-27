import * as THREE from './build/three.module.js';
import { PLYLoader } from './jsm/PLYLoader.js';
import { OrbitControls } from './jsm/OrbitControls.js';
import { WEBGL } from './jsm/WebGL.js';

if ( WEBGL.isWebGL2Available() === false ) {

  document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );

}


let container, progress_container;

let camera, scene, renderer, w, h;

init();
animate();


function init() {

  const loadingManager = new THREE.LoadingManager( () => {
		// const loadingScreen = document.getElementById( 'loading-screen' );
		// loadingScreen.classList.add( 'fade-out' );
		// loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
	} );

  container = document.getElementById( 'canvas' );
  renderer = new THREE.WebGLRenderer();


  w = container.offsetWidth;
  h = container.offsetHeight;

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( w, h );
  container.appendChild(renderer.domElement);


  camera = new THREE.PerspectiveCamera( 45, w / h, 0.001, 2000 );
  camera.position.z = 1;

  new OrbitControls( camera, renderer.domElement );

  // scene

  scene = new THREE.Scene();
  scene.background =  new THREE.Color( 0xffffff );

  const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  scene.add( ambientLight );

  const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( pointLight );
  scene.add( camera );


  var material = new THREE.MeshPhongMaterial( { color: 0xffffff,
      specular: 0x111111, shininess: 2, vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide} );

  const loader = new PLYLoader(loadingManager);
  loader.load(
      './data/meshes/sao_paulo/mesh.ply',
      function (geometry) {
          geometry.computeVertexNormals()
          const mesh = new THREE.Mesh(geometry, material)
          mesh.rotateX(-Math.PI / 2)
          scene.add(mesh)
      }
      // (xhr) => {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          // progressBar.style.width = (xhr.loaded / xhr.total * 100) + '%';
      // },
      // (error) => {
      //     console.log(error)
      // }
  )

  // loader.load( '../data/meshes/sao_paulo/mesh.ply', function ( obj ) {

  // 	object = obj;


  // }, onProgress, onError );

  //

  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove );

  //

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

}

function onDocumentMouseMove( event ) {

}

//

function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

  // camera.position.x += ( mouseX - camera.position.x ) * .05;
  // camera.position.y += ( - mouseY - camera.position.y ) * .05;

  // camera.lookAt( scene.position );

  renderer.render( scene, camera );

}

function onTransitionEnd( event ) {

event.target.remove();

}
