const tes = document.querySelector("#teste");
tes.innerHTML = "Olá";


let numCor = 0;
let loop = null;

document.addEventListener("keydown", (event) => {
    if (event.key.toLocaleLowerCase() === "a") {

        if (loop) return;

        loop = setInterval(() => {
            numCor++;
        
            if (numCor >= 7) {
                numCor = 0;
            }
            
            tes.classList.remove("cor", "cor1", "cor2", "cor3", "cor4", "cor5", "cor6");

            if (numCor === 0) {
                tes.classList.add("cor");
            }
            if (numCor === 1) {
                tes.classList.add("cor1");
            }
            if (numCor === 2) {
                tes.classList.add("cor2");
            }
            if (numCor === 3) {
                tes.classList.add("cor3");
            }
            if (numCor === 4) {
                tes.classList.add("cor4");
            }
            if (numCor === 5) {
                tes.classList.add("cor5");
            }
            if (numCor === 6) {
                tes.classList.add("cor6");
            }

            console.log(numCor);
        }, 1000);
        

    }
});

document.addEventListener("keydown", (event1) => {
    if (event1.key.toLowerCase() === "d") {
        clearInterval(loop);
        loop = null;
        return console.log("O loop parou!");

    }
});