document.addEventListener("DOMContentLoaded", function() {
    let slides= document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    let index = 0;
    let interval;

    
    if (slides.length === 0) {
        console.error("no images found for the slideshow");
        return;
    }

    function showSlide(n) {
        index = n >=slides.length ? 0 : n < 0 ? slides.length - 1 : n;

        //hide all slides
        slides.forEach(slide =>{
            slide.classList.remove("active");
            slide.style.display = "none"; //ensure hidden slides are not available
        });

        dots.forEach(dot => dot.classList.remove("active"));

        //show next slide with fade effect
        slides[index].style.display = "block";
       setTimeout(() => slides[index].classList.add("active"),50);
        dots[index].classList.add("active");
        
    }

    function nextSlide() {
        showSlide(index + 1);
        resetTimer();

    }
    
    function resetTimer() {
        clearInterval(interval);
        interval =setInterval(nextSlide, 3000);
    }

    //start slideshow
    showSlide(0);
     interval = setInterval(nextSlide, 3000);

     //click event to manually change slides by clicking on dot
     dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", function (){
            showSlide(dotIndex);
            resetTimer();
        });
     });

   //add click event to each slide to manually change the next image
    
   slides.forEach(slide => {
        slide.addEventListener("click" , nextSlide);
   }); 

   document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId =this.getAttribute("href").substring(1);
        const targetSection =document.getElementById(targetId);

        if(targetSection)  {
            window.scrollTo({
                top: targetSection.offsetTop - 80, //adjust the navbar height
                behavior: "smooth"
            });
        }

    });
   });

});