import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Atualizar tamanho quando a janela redimensionar
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

//Acessa os ids 'start' e 'paused'
const startText = document.getElementById("start");
const pausedText = document.getElementById("paused");

//Booleana para verificar quando o jogo inicializar pela primeira vez
let startGame = false;

function update(){
    requestAnimationFrame(update);
    
    //Verifica se o usuário clico usando o 'isPointerLock'
    if (isPointerLock === true){
        WASD();
        shoot();
        rotateX();
        gravity();
        onGround();
        debugMenuStatus();
        updateDebugUI();
        jump_();
        spawnEnemies();

        startGame = true;

        //Esconde o 'pausedText'
        pausedText.classList.add("hidden");
        
    }else{

        //Roda só uma vez antes do jogo começar pela primeira vez 
        if (startGame === true){

            //Mostra o 'startText'
            pausedText.classList.remove("hidden");  
        }
    }
    
    if (startGame === true){
        startText.classList.add("hidden");
    }
    
    // console.log(isPointerLock);
    
    renderer.render(scene, camera);
}

//Menu de debug//
const coordsElement = document.querySelector("#coords");
const debug_ui = document.querySelector("#debug_ui");

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

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshBasicMaterial({color: 0xfcba03});
const cube = new THREE.Mesh(geometryCube, materialCube);

//Cria o Mesh do Player
const player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({visible: false})
);

//Cria o Mesh da Bala
const bullet = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 0.25),
    new THREE.MeshBasicMaterial({color: 0x0400ed})
);

//Cria o Mesh do Chão
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({color: 0xffff00, side: THREE.DoubleSide})
);

cube.name = "cube";
ground.name = "ground";

//Adiciona o Chão a sena
scene.add(ground);

//Rotaciona o Chão para deixá-lo reto
ground.rotation.x = Math.PI / 2;

//Muda a posição do 'y' para -1
ground.position.y = -1;
// console.log(ground.position);

const pointLight = new THREE.PointLight(0xFFFFFF, 5);
bullet.add(pointLight);

scene.add(player);
player.add(camera);

scene.add(cube);
cube.position.z = -2;
cube.position.y = 1;

let w = false;
let s = false;
let a = false;
let d = false;

let space = false;
let shift = false;

let moveSpeed = 0.1;

const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const up = new THREE.Vector3();

function WASD(){
    
    forward.set(0, 0, -1).applyQuaternion(player.quaternion);
    right.set(1, 0, 0).applyQuaternion(player.quaternion);
    up.set(0, 1, 0);
    
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
    
    if (shift === true){
        moveSpeed = 0.2;
        
    }else{
        moveSpeed = 0.1;
        
    }
    
    move.multiplyScalar(moveSpeed);
    player.position.add(move);
}

let velocityY = 0;
const jumpForce = 0.4;
const gravityForce = 0.03;

function jump_(){
    
    if (canJump === true && space === true){
        velocityY = jumpForce;
        canJump = false;
    }
}

function gravity(){
    
    velocityY -= gravityForce;
    player.position.y += velocityY;
    
    if (player.position.y <= 0){
        
        player.position.y = 0;
        velocityY = 0;
        canJump = false;
    }
    
}

const raycaster = new THREE.Raycaster();
const origin = new THREE.Vector3();

//Bala//
let bulletBool = false;

//Velocidade de movimentação da bala
const bulletSpeed = 0.5;

//Distância para o despawn da bala
const despawnBulletDis = 40;

let bullets = [];

const direction = new THREE.Vector3();

//Cria a bala
function createBullet(){
    
    const bulletClone = bullet.clone();

    // Usa a direcao real da camera no mundo para evitar quaternion invertido
    camera.getWorldDirection(direction);

  // Posiciona a bala na posicao atual da camera para sair exatamente de onde o jogador mira
    camera.getWorldPosition(origin);

    bulletClone.position.copy(origin);
    bulletClone.direction = direction.clone().normalize();

    scene.add(bulletClone);

    //Adiciona o 'bulletClone' como último lugar na lista 'bullets[]'
    bullets.push(bulletClone);
}

//Cria os vetores de posição do player e da bala
const posPlayer = new THREE.Vector3();
const posBullet = new THREE.Vector3();

cube.userData.health = 5;

//Atira a bala
function shoot(){

    if (bulletBool === true){
        createBullet();
        bulletBool = false;
    }
    
    //Percorre a lista 'bullets[]' assim que ela não tiver mais vazia
    for (let i = 0; bullets.length > i; i++){

        // Verificar colisão com o corpo (precisa de mais tiros)
        const bodyDistance = bullets[i].position.distanceTo(cube.position);

        if (bodyDistance < 1.5) {
            scene.remove(bullets[i]);
            cube.userData.health--;
        }
        if (cube.userData.health < 1){
            scene.remove(cube);
        }

        //Adicona velocida a cada bala já com a rotação certa
        bullets[i].position.add(bullets[i].direction.clone().multiplyScalar(bulletSpeed));
        
        //Atribui a posição global do player e da bala para os vetores, 'posPlayer' e 'posBullet'
        player.getWorldPosition(posPlayer);
        bullets[i].getWorldPosition(posBullet);

        //Calcula a distância do player para a bala e atribui a váriavel 'distancePlayerBullet'
        const distancePlayerBullet = posPlayer.distanceTo(posBullet);

        //Deguba 'distancePlayerBullet'
        // console.log(distancePlayerBullet);

        //Se a bala estiver a 'despawnBulletDis' de distância do player ela é removida da cena
        if (distancePlayerBullet > despawnBulletDis){

            //Remove a bala da cena
            scene.remove(bullets[i]);

            //Remove a bala da lista
            bullets.splice(i, 1);
        }

    }
}

let enemies = [];
let enemiesSpawned = false;

function spawnEnemies(){

    if (enemiesSpawned === true){
        return;
    }
    
    for (let i = 0; i < 15; i++){
        const enemie = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2, 1),
            new THREE.MeshBasicMaterial({color: Math.random() > 0.5 ? 0xff4444 : 0xff8844})
        )

        let x = 0, z = 0;

        while (Math.sqrt(x*x + z*z) < 5) {
            x = (Math.random() - 0.5) * 25;
            z = (Math.random() - 0.5) * 25;
        }
        
        enemie.position.set(x, 0, z);

        console.log(i);

        scene.add(enemie);
        enemies.push(enemie);
        
    }

    enemiesSpawned = true;

}

const originBullet = new THREE.Vector3();
const forwardBullet = new THREE.Vector3();


function bulletRaycaster(bulletMesh){


    // forwardBullet.set(0, 0, -1).applyQuaternion(bulletMesh.quaternion).normalize();
    // bulletMesh.getWorldPosition(originBullet);
    // raycaster.set(originBullet, forwardBullet);

    // const intersects = raycaster.intersectObject(scene.getObjectByName("cube"), true);

    // if (intersects.length > 0 && intersects[0].distance < 0.5){

    //     cube.userData.health--;


    //     console.log("Acertou o cubo");

    //     // scene.remove(cube);
    //     // scene.remove(bullets[i]);
    //     // bullets.splice(i, 1);
    // }
    
    // return false;

}

//Bala//

const down = new THREE.Vector3(0, -1, 0);

let canJump = true;

const footOffset = new THREE.Vector3(0, 0.05, 0);

function onGround() {

    player.getWorldPosition(origin.add(footOffset));

    raycaster.set(origin, down);

    const intersects = raycaster.intersectObject(scene.getObjectByName("ground"), true);
    // console.log(intersects);

    if (intersects.length > 0 && intersects[0].distance <= 1.1){
        canJump = true;

    }else{
        canJump = false;
    }

    // console.log(intersects[0].distance);
}

const rotateXSpeed = 0.1;

let rotationCimaLimite = false;
let rotationBaixoLimite = false;

function rotateX(){

    if (camera.rotation.x >= 0.6){
        rotationCimaLimite = true;

    }else{
        rotationCimaLimite = false;

    }

    if (camera.rotation.x <= -0.9){
        rotationBaixoLimite = true;
        
    }else{
        rotationBaixoLimite = false;
        
    }
    
}

let isPointerLock = false;

renderer.domElement.addEventListener("click", async () => {
    
    try{
        await renderer.domElement.requestPointerLock();

    } catch (e){
        //Cancelou o lock
    }

});

document.addEventListener("pointerlockchange", () =>{

    if (document.pointerLockElement === renderer.domElement){
        isPointerLock = true;

    }else{
        isPointerLock = false;
    }

});

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {

    if (!isPointerLock) return;

    //Rotaciona
    let rotateSpeed = 0.002;
    const step = 1000;

    const deltaY = mouseY * rotateSpeed;
    const deltaX = mouseX * rotateSpeed;

    if (isPointerLock === true){

        mouseX = event.movementX;
        mouseY = event.movementY;
    
        if (deltaY < 0 && rotationCimaLimite === true){
            return;
        }

        if (deltaY > 0 && rotationBaixoLimite === true){
            return;
        }

        camera.rotation.x -= deltaY;
        camera.rotation.x = Math.round(camera.rotation.x * step) / step;

        player.rotation.y -= deltaX;

    }

});

window.addEventListener("mousedown", (event) => {
    
    //Bala
    if (event.button === 0 && !event.repeat){
        bulletBool = true;
    }

});

window.addEventListener("mouseup", (event) => {

    //Bala
    if (event.button === 0 && !event.repeat){
        bulletBool = false;
    }

});

window.addEventListener("keydown", (event) => {

    //Mostra o menu de debug ao apertar F3//
    if (event.key === "F3" && event.shiftKey) {
        event.preventDefault();
        debug_ui.classList.toggle("hidden");
    }

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

    if(event.key === " "){
        space = true;
    }
    if (event.key === "Shift"){
        shift = true;
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

    if(event.key === " "){
        space = false;
    }
    if (event.key === "Shift"){
        shift = false;
    }
    
});

update();