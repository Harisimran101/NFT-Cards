import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { LoadingManager } from 'https://cdn.skypack.dev/three@0.136/src/loaders/LoadingManager.js';

// If you face any problem contact me at harisimran1012@gmail.com

function loadtexture(loadtexture){
   const textureloader = new THREE.TextureLoader();
  return textureloader.load(loadtexture)
}

function NFTCard(modetoload,name,appendto){

    const nftcard = document.createElement('div')
    nftcard.innerHTML = `
      <div class="nft-card">

        <div class="canvas-container">

        <div class="preloader ${name}-preloader">
         <h1 id="${name}-preloader-text">0%</h1>
        </div>

        <canvas id="${name}"></canvas>
        </div>
        
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

          const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {


};

manager.onLoad = function ( ) {


 //   document.querySelector(`.${name}-preloader`).style.display = 'none'
    document.querySelector(`.${name}-preloader`).classList.add('hide-preloader')
};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {


   document.querySelector(`#${name}-preloader-text`).innerText = ( (itemsLoaded /itemsTotal) * 100 ).toFixed(0) + '%'
};

manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

                const loader = new GLTFLoader(manager)
                loader.load(modetoload, (gltf) =>{
                     let model = gltf.scene;
                     scene.add(model)

                     model.traverse((child) =>{
                        if(child.material && child.material.name == 'Card-background'){
                          console.log(child)
                           child.material.normalMap = loadtexture('nft-card-bump.png')
                        }

                     })
            
                })
    
                // RGBELoader
    
                new RGBELoader().load('Environment.hdr',function(texture){
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                       scene.environment = texture;
                    })

                    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

               
                
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

