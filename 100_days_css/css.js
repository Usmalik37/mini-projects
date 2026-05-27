let  sectionsList = document.querySelectorAll("section");
let sectionsNum = sectionsList.length;
let framesList = document.querySelectorAll("section > div");


// telling the observer to track which Element
for (let n = 0; n < sectionsList.length; n++) {
    
    const observer = new IntersectionObserver(entries =>{
        //the function returns an array
        entries.forEach( entry => {
            // if the element is visible 
            if (entry.isIntersecting) {
                framesList[n].classList.add("dead-centre");
                // framesList[n].style.backgroundColor = "red";
            }
            framesList[n].classList.remove("dead-centre"); 
            // framesList[n].style.backgroundColor = "black";

        })
    })
    
    
    
    
    setTimeout(() => {
        // creating the observer
        observer.observe(sectionsList[n]);
        }, 00);

}