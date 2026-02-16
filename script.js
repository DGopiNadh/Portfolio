// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  offset: 120,
  disableMutationObserver: true
});

// Smooth Scrolling for all anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         const targetId = this.getAttribute('href');
//         if (targetId !== "#") {
//             e.preventDefault();
//             const targetElement = document.querySelector(targetId);

//             if (targetElement) {
//                 const headerOffset = 80;
//                 const elementPosition = targetElement.getBoundingClientRect().top;
//                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//                 window.scrollTo({
//                     top: offsetPosition,
//                     behavior: "smooth"
//                 });
//             }
//         }
//     });
// });

// Navigation Highlight on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let currentSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${currentSection}`
        );
    });
});


// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert(`Thanks ${name}! Your message has been sent.`);
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// Theme Management (Dark Mode)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Function to set theme
const setTheme = (theme) => {
    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        root.removeAttribute('data-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    localStorage.setItem('theme', theme);

    // Refresh AOS
    setTimeout(() => {
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, 150);
};

// Initialize theme from storage or system preference
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    setTheme(savedTheme);
} else if (systemDark) {
    setTheme('dark');
}

// Toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

// Profile Image Loop Switcher (Layered Cross-fade)
const profile2 = document.getElementById('profile-2');

if (profile2) {
    setInterval(() => {
        profile2.classList.toggle('active');
    }, 7000); // Switch every 5 seconds
}

// Enable Enter to submit in the Message box
const messageBox = document.getElementById('message');
if (messageBox && contactForm) {
    messageBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            contactForm.dispatchEvent(new Event('submit'));
        }
    });
}

