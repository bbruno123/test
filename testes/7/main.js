import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function update(){
    WASD();
    camera.lookAt(player.position);

    bulletSpeed(0.1);
    
    requestAnimationFrame(update);
    renderer.render(scene, camera);
}

const geometryCube = new THREE.BoxGeometry(2, 2, 2);
const materialCube = new THREE.MeshBasicMaterial({color: 0xfcba03});
const cube = new THREE.Mesh(geometryCube, materialCube);

const geometryBullet = new THREE.BoxGeometry(0.5, 0.5, 1);
const materialBullet = new THREE.MeshBasicMaterial({color: 0xfcba03});
const bullet = new THREE.Mesh(geometryBullet, materialBullet);

scene.add(cube);
cube.position.z = -10;

const geometryPlayer = new THREE.BoxGeometry(0.5, 1, 0.5);
const materialPlayer = new THREE.MeshBasicMaterial({color: 0x00ffc8});
const player = new THREE.Mesh(geometryPlayer, materialPlayer);

scene.add(player);
player.add(camera);

const offset = new THREE.Vector3(0, 1.5, 4);
camera.position.copy(player.position).add(offset);

let w = false;
let s = false;
let a = false;
let d = false;

function WASD(){
    const moveSpeed = 0.4;
    
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(player.quaternion);
    
    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(player.quaternion);

    const move = new THREE.Vector3();
    
    if (w === true){
        move.add(forward);
    }
    if (s === true){
        move.sub(forward)
    }
    if (a === true){
        move.sub(right)
    }
    if (d === true){
        move.add(right)
    }
    
    if (move.lengthSq() > 0){
        move.normalize();
        move.multiplyScalar(moveSpeed);
        player.position.add(move);
    }
}

const bulletCopy = bullet.clone();

function bulletSpeed(bs){
    bs;
    bulletCopy.position.z += -bs;
}

function bulletSpawn(){
    const playerPos = new THREE.Vector3();
    player.getWorldPosition(playerPos);
    bulletCopy.position.copy(playerPos);
    bulletCopy.quaternion.copy(player.quaternion);
    scene.add(bulletCopy);
}


window.addEventListener("keydown", (event) => {    
    if (event.key.toLocaleLowerCase() === "w"){
        w = true;
    }
    if (event.key.toLocaleLowerCase() === "s"){
        s = true;
    }
    if (event.key.toLocaleLowerCase() === "a"){
        a = true;
    }
    if (event.key.toLocaleLowerCase() === "d"){
        d = true;
    }

    
    const rotateSpeed = 0.3;
    
    if (event.key === "ArrowRight"){
        player.rotation.y -= rotateSpeed;
        
    }
    if (event.key === "ArrowLeft"){
        player.rotation.y += rotateSpeed;
    }
    
    if (event.key.toLocaleLowerCase() === "e"){
        bulletSpawn();
    }

});

window.addEventListener("keyup", (event) => {
    if (event.key.toLocaleLowerCase() === "w"){
        w = false;
    }
    if (event.key.toLocaleLowerCase() === "s"){
        s = false;
    }
    if (event.key.toLocaleLowerCase() === "a"){
        a = false;
    }
    if (event.key.toLocaleLowerCase() === "d"){
        d = false;
    }
});
update();