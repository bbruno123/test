import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const coordsElement = document.querySelector("#coords");
const debug_ui = document.querySelector("#debug_ui");

document.addEventListener("keydown", (event)=>{
    if (event.key === "F3" && !event.repeat){
        event.preventDefault();
        debug_ui.classList.toggle("hidden");
    }

});

function updateDebugUI(){
    coordsElement.innerText = `x: ${camera.position.x.toFixed(2)}` + " | " + `y: ${camera.position.y.toFixed(2)}` + " | " + `z: ${camera.position.z.toFixed(2)}`;
}

function animate() {
    requestAnimationFrame(animate);
    updateDebugUI();
    
    renderer.render(scene, camera);
}
animate();

const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometryCube, materialCube);

cube.position.set(0, 0, 0);
scene.add(cube);

camera.position.z = 5;


//movimentação da câmera
document.addEventListener("keypress", (event) => {

    if (event.key.toLocaleLowerCase() === "w"){
        camera.position.z -= 0.3;
    }

    if (event.key.toLocaleLowerCase() === "s"){
        camera.position.z += 0.3;
    }

    if (event.key.toLocaleLowerCase() === "a"){
        camera.position.x -= 0.3;
    }

    if (event.key.toLocaleLowerCase() === "d"){
        camera.position.x += 0.3;
    }

});


