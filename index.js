    // Dark mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        if (savedTheme === 'dark') {
            html.classList.add('dark');
        }
    } else if (systemPrefersDark) {
        html.classList.add('dark');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('theme')) {
            if (event.matches) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
    });

    darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Animate hamburger to X
        if (mobileMenu.classList.contains('hidden')) {
            line1.style.transform = 'rotate(0deg) translateY(0px)';
            line2.style.opacity = '1';
            line3.style.transform = 'rotate(0deg) translateY(0px)';
        } else {
            line1.style.transform = 'rotate(45deg) translateY(6px)';
            line2.style.opacity = '0';
            line3.style.transform = 'rotate(-45deg) translateY(-6px)';
        }
    });

    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            line1.style.transform = 'rotate(0deg) translateY(0px)';
            line2.style.opacity = '1';
            line3.style.transform = 'rotate(0deg) translateY(0px)';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Quiz functionality
    let currentQuestion = 1;
    const totalQuestions = 10;
    const quizAnswers = {};

    function updateQuizProgress() {
        const progressBar = document.querySelector('#quiz .bg-primary');
        const progressText = document.querySelector('#quiz .text-base.text-gray-500');
        
        if (progressBar && progressText) {
            const percentage = (currentQuestion / totalQuestions) * 100;
            progressBar.style.width = percentage + '%';
            progressText.textContent = `${currentQuestion} of ${totalQuestions}`;
        }
    }

    // Add quiz question navigation
    const nextButton = document.querySelector('#quiz button:last-child');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            // Get selected answer
            const selectedAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
            if (selectedAnswer) {
                quizAnswers[`q${currentQuestion}`] = selectedAnswer.value;
                
                if (currentQuestion < totalQuestions) {
                    currentQuestion++;
                    updateQuizProgress();
                    // In a real implementation, you would load the next question here
                } else {
                    // Quiz completed - show results
                    showQuizResults();
                }
            }
        });
    }

    function showQuizResults() {
        const quizContent = document.getElementById('quizContent');
        if (quizContent) {
            quizContent.innerHTML = `
                <div class="text-center">
                    <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-check text-white text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Quiz Complete!</h3>
                    <p class="text-base text-gray-600 dark:text-gray-400 mb-6">
                        Based on your answers, we've identified your top career matches.
                    </p>
                    <button class="px-8 py-3 text-base bg-primary text-white rounded-lg hover:bg-primary-dark transition-all font-semibold">
                        View My Career Matches
                    </button>
                </div>
            `;
        }
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to cards and sections
    document.querySelectorAll('.card-hover').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Pricing toggle functionality
    const pricingToggle = document.querySelector('#pricing .bg-white.dark\\:bg-dark-card.p-1');
    if (pricingToggle) {
        const monthlyBtn = pricingToggle.querySelector('button:first-child');
        const yearlyBtn = pricingToggle.querySelector('button:last-child');
        
        [monthlyBtn, yearlyBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from both
                monthlyBtn.classList.remove('bg-primary', 'text-white');
                monthlyBtn.classList.add('text-gray-600', 'dark:text-gray-400');
                yearlyBtn.classList.remove('bg-primary', 'text-white');
                yearlyBtn.classList.add('text-gray-600', 'dark:text-gray-400');
                
                // Add active class to clicked button
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('text-gray-600', 'dark:text-gray-400');
                
                // Update pricing (in a real app, you'd update the displayed prices)
                const isYearly = btn === yearlyBtn;
                console.log('Yearly pricing:', isYearly);
            });
        });
    }

    // Add typing effect to hero headline
    function typeWriter(element, text, delay = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        
        type();
    }

    // Initialize typing effect on page load
    window.addEventListener('load', () => {
        const heroHeadline = document.querySelector('#home h1');
        if (heroHeadline) {
            const originalText = heroHeadline.textContent;
            setTimeout(() => typeWriter(heroHeadline, originalText, 50), 1000);
        }
    });

    // Add newsletter subscription functionality
    const newsletterForm = document.querySelector('#blog input[type="email"]');
    const subscribeBtn = document.querySelector('#blog input[type="email"] + button');
    
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const email = newsletterForm?.value;
            if (email && email.includes('@')) {
                subscribeBtn.textContent = 'Subscribed!';
                subscribeBtn.classList.add('bg-green-500');
                subscribeBtn.classList.remove('bg-primary');
                setTimeout(() => {
                    subscribeBtn.textContent = 'Subscribe';
                    subscribeBtn.classList.remove('bg-green-500');
                    subscribeBtn.classList.add('bg-primary');
                    if (newsletterForm) newsletterForm.value = '';
                }, 2000);
            }
        });
    }

    console.log('SkillForge AI Platform loaded successfully! 🚀');
    import { db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

// Replace this with the document ID Firebase generated
const userId = "TOdE3jX8qJL1VMH2TiwP";  

async function getUser() {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}

getUser();
