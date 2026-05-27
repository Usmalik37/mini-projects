const container2 = document.getElementById('container2');
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");

function cross() {
   
    if(bar1.classList.contains("no-animation")){
        bar1.classList.toggle('no-animation');
        bar2.classList.toggle('no-animation');
        bar3.classList.toggle('no-animation');
        bar1.classList.toggle("animate-line1");
        bar2.classList.toggle("animate-line2");
        bar3.classList.toggle("animate-line3");
        bar1.classList.toggle('rev-animation1');
        bar2.classList.toggle('rev-animation2');
        bar3.classList.toggle('rev-animation3');
    }
    else{
        
        bar1.classList.toggle("animate-line1");
        bar2.classList.toggle("animate-line2");
        bar3.classList.toggle("animate-line3");
        bar1.classList.toggle('rev-animation1');
        bar2.classList.toggle('rev-animation2');
        bar3.classList.toggle('rev-animation3');
        
    }
}
container2.addEventListener('click', cross);