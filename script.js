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
