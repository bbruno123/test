import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 8;

let time = 0.01;

const bulletGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
const bulletMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

// bullet.position.x = 5;
// scene.add(bullet)


window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "b" && !event.repeat){
        shoot();
    }
    
    if (event.key.toLowerCase() === "w"){
        camera.position.z += -3;
    }
    
    if (event.key.toLowerCase() === "s"){
        camera.position.z += 3;
    }
    
    if (event.key.toLowerCase() === "a" && !event.repeat){
        camera.rotation.y += 0.2;
        }
        
    if (event.key.toLowerCase() === "d" && !event.repeat){
        camera.rotation.y += -0.2;
    }
});

const bullets = [];

function shoot(){
    const bulletClone = bullet.clone();
    bulletClone.position.copy(camera.position);
    bulletClone.quaternion.copy(camera.quaternion);
    
    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
    bulletClone.userData.velocity = direction.multiplyScalar(0.5);

    scene.add(bulletClone);
    bullets.push(bulletClone);
    
    // bulletClone.position.add(bulletClone.userData.velocity);
    // console.log(bullets.length -1);
}

function animate(){
    requestAnimationFrame(animate);
    
    // console.log(camera.rotation);
    cube.rotation.y += time;
    cube.rotation.x += time;

    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];

    b.position.add(b.userData.velocity);

    if (b.position.length() > 10) {
        scene.remove(b);
        bullets.splice(i, 1);
    }
}
    // // 1️⃣ Luz nasce na câmera
    // light.position.copy(camera.position);

    // // 2️⃣ Copia a rotação da câmera
    // light.quaternion.copy(camera.quaternion);

    // // 3️⃣ Ajusta o target para frente da luz
    // light.target.position.copy(light.position).add(new THREE.Vector3(0, 0, -1).applyQuaternion(light.quaternion));

    renderer.render(scene, camera);
}

//Cube//
const geometryCube = new THREE.BoxGeometry(2, 2, 2);
// const geometryCube1 = new THREE.BoxGeometry(2, 2, 1);

// const materialCube = new THREE.MeshPhongMaterial({color: 0x0000ff}); //azul
const materialCube1 = new THREE.MeshBasicMaterial({color: 0x00ff00}); //verde
const cube = new THREE.Mesh(geometryCube, materialCube1);

// const cube1 = new THREE.Mesh(geometryCube, materialCube1);

scene.add(cube);

// cube.position.x = 15;
// const offset = new THREE.Vector3(0, -15, 0);
// const direction = new THREE.Vector3();

// scene.add(cube1);
// //Cube//

// //Camera lookAt//
// camera.position.copy(cube.position).add(offset);
// // camera.up.set(0, 0, 1);
// camera.lookAt(cube.position);
// //Camera lookAt//

// //Light//
// const light = new THREE.DirectionalLight(0xFFFFFF, 10);
// light.position.copy(camera.position);
// scene.add(light);
// scene.add(light.target);
// //Light//



//Line//
const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, -10, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometryLine, materialLine);

// scene.add(line);
//Line//

animate();