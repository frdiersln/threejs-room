import * as THREE from '/node_modules/three/';
import { GLTFLoader } from '/node_modules/three/addons/loaders/GLTFLoader.js';

//SCENE AND LIGHT SET
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );


//RENDERER SET
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//LOADING 3D OBJECT
const loader = new GLTFLoader();
loader.load( 'statics/Another_bedroom.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} ); 


//CAMERA POSITIONING
camera.position.set(5,5,-5); 
camera.lookAt(0,0,0);


// MAIN ANIMATION LOOP
function animate() {

	requestAnimationFrame( animate );
	
	camera.lookAt(-mouse.x/2, mouse.y/2 + 0.22, 0.22)
	//reposition cam on scroll
	camera.position.setX(5 - getScrollPercent() / 22);
	camera.position.setY(5 - getScrollPercent() / 54);
	camera.position.setZ(-5 - getScrollPercent() / 410);

	renderer.render( scene, camera );
}


//CAMERA LOOK TO CURSOR LOCATION SLIGHTLY
const mouse = new THREE.Vector2();

function onMouseMove( event ) {
	//calculate mouse position in normalized device coordinates
	// -1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'mousemove', onMouseMove, false );


//RESIZE RENDER WHEN WINDOW RESIZED
const sizes = { width: window.innerWidth, height: window.innerHeight}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//GET SCROOL PERCENTAGE FOR ANIMATION
function getScrollPercent() {
	var h = document.documentElement, 
		b = document.body,
		st = 'scrollTop',
		sh = 'scrollHeight';
	return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

animate();