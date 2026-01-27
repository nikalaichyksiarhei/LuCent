
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

    const observerOptions = {
        root: container,
        threshold: 0.5,
        rootMargin: "0px -20% 0px -20%" // Detect center area
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all siblings first (optional, but safer)
                phones.forEach(p => p.classList.remove('active'));
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    phones.forEach(phone => observer.observe(phone));
});
