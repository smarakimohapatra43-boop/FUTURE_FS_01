const toggleBtn = document.getElementById("theme-toggle");

if(toggleBtn){

    toggleBtn.addEventListener("click",()=>{

        document.body.classList.toggle("light-theme");

        if(document.body.classList.contains("light-theme")){
            localStorage.setItem("theme","light");
            toggleBtn.textContent="☀️";
        }
        else{
            localStorage.setItem("theme","dark");
            toggleBtn.textContent="🌙";
        }

    });

}

window.onload=()=>{

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="light"){
        document.body.classList.add("light-theme");

        if(toggleBtn){
            toggleBtn.textContent="☀️";
        }
    }

};