const dvd = document.getElementById("dvd");

let top = 0;
let left = 0;
let isTopRightDown = true;

setInterval(() => {
    // console.log("oi");
    
    if (isTopRightDown === true){
        top++;
        left++;

        dvd.style.top = `${top}%`;
        dvd.style.left = `${left}%`;
        
        if (top >= 96 && left >= 95){
            isTopRightDown = false;
        }
        
    }else {
        top -= 1;
        left -= 1;
        
        
        dvd.style.top = `${top}%`;
        dvd.style.left = `${left}%`;
        
        if (top <= 0 && left <= 0){
            isTopRightDown = true;

        }
    }
    console.log(top, left);



}, 100);