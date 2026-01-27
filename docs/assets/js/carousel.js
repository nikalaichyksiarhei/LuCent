
document.addEventListener('DOMContentLoaded', () => {
    // Mobile only check
    if (window.innerWidth > 768) return;

    const container = document.querySelector('.phones-container');
    const phones = document.querySelectorAll('.phone');

    if (!container || phones.length === 0) return;

    // Center the middle phone initially
    const centerPhone = phones[2]; // 3rd phone is center
    if (centerPhone) {
        const scrollLeft = centerPhone.offsetLeft - (window.innerWidth / 2) + (centerPhone.offsetWidth / 2);
        container.scrollLeft = scrollLeft;
    }

    // Create pagination dots
    const dotsContainer = document.querySelector('.carousel-dots');
    if (dotsContainer) {
        // Clear existing dots if any
        dotsContainer.innerHTML = '';
        phones.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 2) dot.classList.add('active'); // Default center (index 2) is active
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.carousel-dot');

    const observerOptions = {
        root: container,
        threshold: 0.5,
        rootMargin: "0px -20% 0px -20%" // Detect center area
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all siblings first
                phones.forEach(p => p.classList.remove('active'));
                entry.target.classList.add('active');

                // Update dots
                const index = Array.from(phones).indexOf(entry.target);
                if (dots && dots.length > 0) {
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[index]) {
                        dots[index].classList.add('active');
                    }
                }
            }
        });
    }, observerOptions);

    phones.forEach(phone => observer.observe(phone));
});
