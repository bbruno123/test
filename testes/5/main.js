import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


let geometry = new THREE.CircleGeometry(5, 100);
let material = new THREE.MeshBasicMaterial({color: 0xfcf803});
let circle = new  THREE.Mesh(geometry, material);
// scene.add(circle);

let geometryCube = new THREE.BoxGeometry(1, 1, 1);
let materialCube = new THREE.MeshBasicMaterial({color: 0xfcf803});
let cube = new  THREE.Mesh(geometryCube, materialCube);
scene.add(cube);

camera.position.z = 10;

let i = 2;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += i * 0.01;
    cube.rotation.x += i * 0.5;

    if (i >= 10) {
        i = 0;
    }

    if (timesTimer >= 2) {
        cube.rotation.y = 0;
        cube.rotation.x = 0;
        // return;
    }

    renderer.render(scene, camera);
}
// animate();

cube.material.color = new THREE.Color(0x00ff00);
// renderer.render(scene, camera);

let timer = 0;
let timesTimer = 0;


const interval = setInterval(() => {
    timer += 1;  // incrementa de 1 em 1 segundos
    console.log(timer);

    if (timer === 1) {
        cube.material.color = new THREE.Color(0xff0000); // vermelho
        animate();
    }
    if (timer === 2) {
        cube.material.color = new THREE.Color(0x0000ff); // azul
        animate();
    }
    if (timer === 3) {
        cube.material.color = new THREE.Color(0x00ff00); // verde
        animate();
    }
    if (timer === 4) {
        cube.material.color = new THREE.Color(0x1c3036); // azul
        animate();
    }
    if (timer === 5) {
        cube.material.color = new THREE.Color(0xffa500); // laranja
        animate();

        timesTimer += 1;
        timer = 0; // 🔥 reinicia o loop
    }

    if (timesTimer >= 2) {
        console.log("O loop parou.");
        clearInterval(interval); // para o loop

        

    }

}, 1000); // 1000 ms entre cada passo
