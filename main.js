import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';

// If you face any problem contact me at harisimran1012@gmail.com

const scene = new THREE.Scene();

// Background Color
scene.background = new THREE.Color('grey')

			const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );
			camera.position.z = 7;

			const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
			renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
		    renderer.toneMappingExposure = 0.85;
			renderer.outputEncoding = THREE.sRGBEncoding;
			document.body.appendChild( renderer.domElement );

            // Orbit Controls

 			const controls = new OrbitControls( camera, renderer.domElement );
            controls.enableDamping = true;
            controls.dampingFactor = 0.05
            controls.enablePan = false
            controls.minDistance = 3;
            controls.maxDistance = 11;


      // Model Loading
            const loader = new GLTFLoader()
            loader.load('card-1.glb', (gltf) =>{
                 let model = gltf.scene;
                 scene.add(model)
            })

            // RGBELoader

            new RGBELoader().load('Environment.hdr',function(texture){
                texture.mapping = THREE.EquirectangularReflectionMapping;
                   scene.environment = texture;
                })
			
                // Resize  

                window.addEventListener('resize', function()

                {
            
                renderer.setSize( window.innerWidth,  window.innerHeight );
                camera.aspect =  window.innerWidth /  window.innerHeight;
                camera.updateProjectionMatrix();
            
                } );
                        



			function animate() {
				requestAnimationFrame( animate );

              controls.update()
				renderer.render( scene, camera );
			};

			animate();