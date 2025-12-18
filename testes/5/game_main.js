import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

 let divideResolution = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/divideResolution, window.innerHeight/divideResolution, false);
document.body.appendChild(renderer.domElement);

let cubeRotation = true;
let cubeColorRGB = true;

//Loop principal//
function animate() {
    requestAnimationFrame(animate);

    updateDebugUI();
    debugMenuStatus();

    // bulletSpeed(0.02);
    
    
    if (cubeRotation === true){
        rotationCube();
    }else{
        //Não chama;
    }
    
    renderer.render(scene, camera);
}

scene.fog = new THREE.Fog(0xffffff, 0.15, 50);

//Menu de debug//
const coordsElement = document.querySelector("#coords");
const debug_ui = document.querySelector("#debug_ui");

window.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    //Mostra o menu de debug ao apertar F3//
    if (event.key === "F3" && event.shiftKey) {
        event.preventDefault();
        debug_ui.classList.toggle("hidden");
    }

    //Toggle a rotação do cubo//
    if (event.key === "F4" && debugAtivo === true){
        cubeRotation = !cubeRotation;
    }

    //Toggle a cor do cubo//
    if (event.key === "4" && debugAtivo === true){
        cubeColorRGB = !cubeColorRGB;
    }

});

const geometryBullet = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const materialBullet = new THREE.MeshBasicMaterial({color: 0xfcf803});
const bullet = new THREE.Mesh(geometryBullet, materialBullet);

const cameraPosition = camera.position;
console.log(cameraPosition);

function bulletSpeed(bullet_speed){
    // bullet.position.z -= bullet_speed;
}

document.addEventListener("mousedown", (event) => {
    //Tiro//
    if (event.button === 0) {
        // scene.add(bullet);
    }
});

document.addEventListener("keyup", (event) => {

});

//Funciona só se o menu de dubug estiver ativo//
let debugAtivo = false;

function debugMenuStatus(){
    if (!debug_ui.classList.contains("hidden")){
        debugAtivo = true;

    }else{
        debugAtivo = false;
    }
}
//Pega as coordenadas//
function updateDebugUI(){
    coordsElement.innerText = `x: ${player.position.x.toFixed(2)}` + " | " + `y: ${player.position.y.toFixed(2)}` + " | " + `z: ${player.position.z.toFixed(2)}`;
}
//Menu de debug//

//Cubo doido//
const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshBasicMaterial({color: 0xfcf803});
const cube = new THREE.Mesh(geometryCube, materialCube);

cube.position.set(0, 0, -4);
scene.add(cube);

//Rotação do cubo//
let i = 0.005;

function rotationCube(){
    cube.rotation.y += i;
    cube.rotation.x += i;
    return;
}
//Rotação do cubo//

//Toggle cubo rgb//
let r = 0;
let g = 0;
let b = 0;

let rgb = "";

const interval = setInterval(() => {

    if (cubeColorRGB === true){
        r++;
        // g++;
        // b++;

    }else{
        //Não chama;
    }

    if (r > 255) r = 0;
    if (g > 255) g = 0;
    if (b > 255) b = 0;

    rgb = `rgb(${r}, ${g}, ${b})`;

    cube.material.color.set(rgb);


}, 30); // 1000 ms entre cada passo

const player = new THREE.Object3D();
scene.add(player);

player.add(camera);
camera.position.set(0, 0, 0);

const q = new THREE.Quaternion();

//movimentação da câmera
window.addEventListener("keydown", (event) => {

    const moveSpeed = 0.3;
    const rotateSpeed = 0.06;
    
    if (event.key === "ArrowRight"){
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -rotateSpeed);
        player.quaternion.multiply(q);
    }

    if (event.key === "ArrowLeft"){
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotateSpeed);
        player.quaternion.multiply(q);
    }

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(player.quaternion);

    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(player.quaternion);

    if (event.key.toLocaleLowerCase() === "w"){
        player.position.x += forward.x * moveSpeed;
        player.position.z += forward.z * moveSpeed;
    }

    if (event.key.toLocaleLowerCase() === "s"){
        player.position.x -= forward.x * moveSpeed;
        player.position.z -= forward.z * moveSpeed;
    }
    
    if (event.key.toLocaleLowerCase() === "d"){
        player.position.x += right.x * moveSpeed;
        player.position.z += right.z * moveSpeed;
    }
    
    if (event.key.toLocaleLowerCase() === "a"){
        player.position.x -= right.x * moveSpeed;
        player.position.z -= right.z * moveSpeed;
    }

});
animate();