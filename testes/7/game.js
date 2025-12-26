import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


function update(){
    requestAnimationFrame(update);
    WASD();
    shoot();
    
    renderer.render(scene, camera);
}

const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshBasicMaterial({color: 0xfcba03});
const cube = new THREE.Mesh(geometryCube, materialCube);

const player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({visible: false})
);

const bullet = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    new THREE.MeshBasicMaterial({color: 0x0400ed})
);

scene.add(player);
player.add(camera);

scene.add(cube);
cube.position.z = -2;

let w = false;
let s = false;
let a = false;
let d = false;

function WASD(){
    
    const moveSpeed = 0.1;
    
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(player.quaternion);
    
    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(player.quaternion);
    
    const move = new THREE.Vector3();
    
    if (w === true){
        move.add(forward);
    }
    if (s === true){
        move.sub(forward);
    }
    if (a === true){
        move.sub(right);
    }
    if (d === true){
        move.add(right);
    }
    
    move.multiplyScalar(moveSpeed);
    player.position.add(move);
}

//Bala//
let e = false;
const bulletSpeed = 0.2;
const despawnBulletDis = 50;

let bullets = [];

//Cria a bala
function createBullet(){
    
    const bulletClone = bullet.clone();
    bulletClone.position.copy(player.position);

    bulletClone.direction = new THREE.Vector3(0, 0, -1).applyQuaternion(player.quaternion);

    scene.add(bulletClone);
    bullets.push(bulletClone);
}

//Atira a bala
function shoot(){

    if (e === true){
        createBullet();
        e = false;
    }
    
    const posPlayer = new THREE.Vector3();
    const posBullet = new THREE.Vector3();

    for (let i = 0; bullets.length > i; i++){

        bullets[i].position.add(bullets[i].direction.clone().multiplyScalar(bulletSpeed));
        
        player.getWorldPosition(posPlayer);
        bullets[i].getWorldPosition(posBullet);

        const distancePlayerBullet = posPlayer.distanceTo(posBullet);
        console.log(distancePlayerBullet);

        if (distancePlayerBullet > despawnBulletDis){
            scene.remove(bullets[i]);
            bullets.splice(i, 1);
        }

    }
}
//Bala//

window.addEventListener("keydown", (event) => {

    //WASD
    if (event.key.toLowerCase() === "w"){
        w = true;
    }
    if (event.key.toLowerCase() === "s"){
        s = true;
    }
    if (event.key.toLowerCase() === "a"){
        a = true;
    }
    if (event.key.toLowerCase() === "d"){
        d = true;
    }

    //Rotaciona
    let rotateSpeed = 0.3;

    if (event.key === "ArrowRight"){
    player.rotation.y -= rotateSpeed;
        
    }
    if (event.key === "ArrowLeft"){
        player.rotation.y += rotateSpeed;
    }

    //Bala
    if (event.key.toLowerCase() === "e" && !event.repeat){
        e = true;
    }

});

window.addEventListener("keyup", (event) => {
    
    //WASD
    if (event.key.toLowerCase() === "w"){
        w = false;
    }
    if (event.key.toLowerCase() === "s"){
        s = false;
    }
    if (event.key.toLowerCase() === "a"){
        a = false;
    }
    if (event.key.toLowerCase() === "d"){
        d = false;
    }
    
    //Bala
    if (event.key.toLowerCase() === "e"){
        e = false;
    }
    

});

update();