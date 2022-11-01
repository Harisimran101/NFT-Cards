import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';

// If you face any problem contact me at harisimran1012@gmail.com


function NFTCard(modetoload,name,appendto){

    const nftcard = document.createElement('div')
    nftcard.innerHTML = `
      <div class="nft-card">
        <canvas id="${name}"></canvas>
        <p class="nft-card-name">${name}</p>
        <div class="gradient-bar"></div>
      </div>
    `

    document.querySelector('.container').appendChild(nftcard)

    const canvas = document.querySelector(`#${name}`)

    const scene = new THREE.Scene();

    // Background Color
    scene.background = new THREE.Color('#E1E2E1')
    
                const camera = new THREE.PerspectiveCamera( 55, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000 );
                camera.position.z = 7;
    
                const renderer = new THREE.WebGLRenderer({
                    antialias: true,
                    canvas: canvas,
                });
                renderer.setSize( canvas.offsetWidth, canvas.offsetHeight );
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 0.85;
                renderer.outputEncoding = THREE.sRGBEncoding;
    
                // Orbit Controls
    
                 const controls = new OrbitControls( camera, renderer.domElement );
                controls.enableDamping = true;
                controls.dampingFactor = 0.05
                controls.enablePan = false,
                controls.enableZoom = false
                controls.enableRotate = false;

                controls.autoRotateSpeed = 16

                canvas.addEventListener('pointerover', () =>{
                   controls.autoRotate = true
                } )

                canvas.addEventListener('pointerleave', () =>{
                  controls.autoRotate = false

                } )
    
    
          // Model Loading
                const loader = new GLTFLoader()
                loader.load(modetoload, (gltf) =>{
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
                
                    renderer.setSize( canvas.offsetWidth,  canvas.offsetHeight );
                    camera.aspect =  canvas.offsetWidth /   canvas.offsetHeight;
                    camera.updateProjectionMatrix();
                
                    } );
                            
    
    
    
                function animate() {
                    requestAnimationFrame( animate );
    
                  controls.update()
                    renderer.render( scene, camera );
                };
    
                animate();   
}

let api = [
   {path: 'card-1.glb',name: 'Golden'},
   {path: 'card-2.glb',name: 'Silver'},
   {path: 'card-3.glb',name: 'Diamond'},
   {path: 'card-4.glb',name: 'Grey'},
   {path: 'card-5.glb',name: 'Super'},
]

api.forEach((el,i) =>{
  NFTCard(el.path,el.name,document.querySelector('.container'))
})

