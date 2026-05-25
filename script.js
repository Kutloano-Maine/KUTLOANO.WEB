//navigation
const menuBtn = document.getElementById("nav-button")
const closeBtn = document.getElementById("close-btn")
const overlay = document.getElementById("menu-overlay") 
const backdrop = document.getElementById("backdrop")
const links = document.querySelectorAll(".nav-links a")

//open menu function
function OpenMenu(){
    overlay.classList.add("active")
    backdrop.classList.add("active")
}

//close menu function
function closeMenu(){
    overlay.classList.remove("active")
    backdrop.classList.remove("active")
}
//menu events 
menuBtn.addEventListener("click",OpenMenu)
closeBtn.addEventListener("click",closeMenu)
backdrop.addEventListener("click", closeMenu)
links.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

//my approach section
    const items = document.querySelectorAll(".approach-item")
    const orb=document.querySelector(".cursor-orb")

    items.forEach((item) => {
      item.addEventListener('click', () => {
        items.forEach((other) => other.classList.remove('active'));
        item.classList.add('active');
      });
    });

    window.addEventListener('mousemove', (event) => {
      orb.style.left = `${event.clientX}px`;
      orb.style.top = `${event.clientY}px`;
    });
