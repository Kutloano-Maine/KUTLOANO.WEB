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
    const revealElements = document.querySelectorAll(".reveal")
    const contactForm = document.getElementById("contact-form")
    const formStatus = document.getElementById("form-status")
    const particleField = document.getElementById("particle-field")
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    function createParticles() {
      if (!particleField) return;

      const particleCount = window.innerWidth < 760 ? 26 : 46;
      const tones = [
        ["rgba(0, 87, 255, 0.46)", "rgba(0, 87, 255, 0.18)"],
        ["rgba(8, 8, 8, 0.18)", "rgba(8, 8, 8, 0.08)"],
        ["rgba(255, 255, 255, 0.86)", "rgba(255, 255, 255, 0.24)"]
      ];

      particleField.innerHTML = "";

      for (let index = 0; index < particleCount; index += 1) {
        const particle = document.createElement("span");
        const tone = tones[index % tones.length];
        const size = 3 + Math.random() * 8;

        particle.className = "particle";
        particle.style.setProperty("--x", `${Math.random() * 100}%`);
        particle.style.setProperty("--y", `${Math.random() * 100}%`);
        particle.style.setProperty("--size", `${size}px`);
        particle.style.setProperty("--tone", tone[0]);
        particle.style.setProperty("--glow", tone[1]);
        particle.style.setProperty("--alpha", `${0.32 + Math.random() * 0.34}`);
        particle.style.setProperty("--duration", `${8 + Math.random() * 10}s`);
        particle.style.setProperty("--delay", `${Math.random() * -12}s`);
        particle.style.setProperty("--drift-x", `${(Math.random() - 0.5) * 120}px`);
        particle.style.setProperty("--drift-y", `${(Math.random() - 0.5) * 150}px`);

        particleField.appendChild(particle);
      }
    }

    createParticles()

    function setActiveItem(activeItem) {
      items.forEach((item) => {
        const isActive = item === activeItem;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-expanded', isActive);

        const icon = item.querySelector('.icon');
        if (icon) icon.textContent = isActive ? '-' : '+';
      });
    }

    items.forEach((item, index) => {
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-expanded', item.classList.contains('active'));

      const icon = item.querySelector('.icon');
      if (icon) icon.textContent = item.classList.contains('active') ? '-' : '+';

      item.addEventListener('click', () => setActiveItem(item));
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setActiveItem(item);
        }
      });

      if (index === 0 && !document.querySelector('.approach-item.active')) {
        setActiveItem(item);
      }
    });

  window.addEventListener('mousemove', (event) => {
      if (!orb) return;
      orb.style.left = `${event.clientX}px`;
      orb.style.top = `${event.clientY}px`;

      if (particleField && !reduceMotion) {
        const x = (event.clientX / window.innerWidth - 0.5) * -18;
        const y = (event.clientY / window.innerHeight - 0.5) * -18;
        particleField.style.setProperty("--particle-x", `${x}px`);
        particleField.style.setProperty("--particle-y", `${y}px`);
      }
    });

      const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.18
      }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${index * 0.045}s`;
      observer.observe(element);
    });

    if (contactForm && formStatus) {
      contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(".submit-btn");
        const formData = new FormData(contactForm);
        const originalButtonText = submitButton.textContent;

        formStatus.textContent = "Sending message...";
        formStatus.className = "form-status";
        submitButton.disabled = true;
        submitButton.textContent = "SENDING";

        try {
          const response = await fetch(contactForm.action, {
            method: "POST",
            headers: {
              Accept: "application/json"
            },
            body: formData
          });
          const result = await response.json();

          if (result.success) {
            contactForm.reset();
            formStatus.textContent = "Message sent. I will get back to you soon.";
            formStatus.classList.add("success");
          } else {
            throw new Error(result.message || "Message could not be sent.");
          }
        } catch (error) {
          formStatus.textContent = "Something went wrong. Please try again or email me directly.";
          formStatus.classList.add("error");
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      });
    }
