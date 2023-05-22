import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

loader.load( 'statics/Another_bedroom.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} ); 

camera.position.set(5,5,-5);
camera.lookAt(0,0,0);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();