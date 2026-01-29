<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const phonesContainerRef = ref(null)
const dotsRef = ref(null)
let scrollListener = null

onMounted(() => {
  initImages()
  nextTick(() => {
    initMobileCarousel()
    initScrollReveal()
  })
})

onUnmounted(() => {
  if (phonesContainerRef.value && scrollListener) {
    phonesContainerRef.value.removeEventListener('scroll', scrollListener)
  }
})

function initImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('img-loaded');
        } else {
            img.onload = () => {
                img.classList.add('img-loaded');
            };
            img.onerror = () => {
                img.classList.add('img-loaded');
            };
        }
    });
}

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

function initMobileCarousel() {
    if (window.innerWidth > 768) return;

    const container = phonesContainerRef.value;
    if (!container) return;

    const phones = container.querySelectorAll('.phone');

    if (phones.length === 0) return;

    // Center the middle phone initially
    const centerPhone = phones[2];
    if (centerPhone) {
        const scrollLeft = centerPhone.offsetLeft - (window.innerWidth / 2) + (centerPhone.offsetWidth / 2);
        container.scrollLeft = scrollLeft;
    }

    // Create pagination dots
    const dotsContainer = dotsRef.value;
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        phones.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 2) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

    const observerOptions = {
        root: container,
        threshold: 0.5,
        rootMargin: "0px -10% 0px -10%"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                phones.forEach(p => p.classList.remove('active'));
                entry.target.classList.add('active');

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

    const updateScales = () => {
        const containerCenter = container.offsetWidth / 2;

        phones.forEach(phone => {
            const rect = phone.getBoundingClientRect();
            const phoneCenter = rect.left + (rect.width / 2);
            const distance = Math.abs(containerCenter - phoneCenter);

            const maxDistance = 180;
            const minScale = 0.85;
            const maxScale = 1.0;

            let scale = maxScale - ((distance / maxDistance) * (maxScale - minScale));

            if (scale < minScale) scale = minScale;
            if (scale > maxScale) scale = maxScale;

            phone.style.transform = `scale(${scale})`;
        });
    };

    scrollListener = () => {
        requestAnimationFrame(updateScales);
    };

    container.addEventListener('scroll', scrollListener);
    updateScales();
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 v-html="t('hero.title')"></h1>
                <p v-html="t('hero.subtitle')"></p>
                <a href="https://apps.apple.com/app/id6756549886" class="btn btn-primary" target="_blank">
                    <svg viewBox="0 0 384 512" width="20" fill="currentColor">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                    </svg>
                    {{ t('hero.cta') }}
                </a>
            </div>

            <!-- Phones Animation Showcase -->
            <div class="phones-container" ref="phonesContainerRef">
                <!-- Left 2: Theme -->
                <div class="phone left-2">
                    <div class="phone-screen">
                        <img src="/assets/img/theme.png" alt="Theme Screen" loading="eager" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>

                <!-- Left 1: Analytics -->
                <div class="phone left-1">
                    <div class="phone-screen">
                        <img src="/assets/img/analitics.png" alt="Analytics Screen" loading="eager" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>

                <!-- Center: Home Screen -->
                <div class="phone center">
                    <div class="phone-screen">
                        <img src="/assets/img/main.png" alt="Main Screen" loading="eager" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>

                <!-- Right 1: Add Transaction -->
                <div class="phone right-1">
                    <div class="phone-screen">
                        <img src="/assets/img/transaction.png" alt="Add Transaction" loading="eager" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>

                <!-- Right 2: Limits -->
                <div class="phone right-2">
                    <div class="phone-screen">
                        <img src="/assets/img/limits.png" alt="Limits Screen" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>
            </div>

            <!-- Mobile Carousel Controls -->
            <div class="carousel-controls">
                <div class="carousel-dots" ref="dotsRef"></div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="section">
        <div class="container">
            <h2>{{ t('features.title') }}</h2>
            <div class="features-grid">
                <!-- Smart Analytics -->
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="20" x2="18" y2="10"></line>
                            <line x1="12" y1="20" x2="12" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="14"></line>
                        </svg>
                    </div>
                    <h3>{{ t('features.analytics.title') }}</h3>
                    <p>{{ t('features.analytics.desc') }}</p>
                </div>

                <!-- Home Screen Widgets -->
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </div>
                    <h3>{{ t('features.widgets.title') }}</h3>
                    <p>{{ t('features.widgets.desc') }}</p>
                </div>

                <!-- Spending Limits -->
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <h3>{{ t('features.limits.title') }}</h3>
                    <p>{{ t('features.limits.desc') }}</p>
                </div>

                <!-- Light & Dark Modes -->
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </div>
                    <h3>{{ t('features.theme.title') }}</h3>
                    <p>{{ t('features.theme.desc') }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section" style="text-align: center; background: linear-gradient(180deg, transparent 0%, rgba(0,150,136,0.1) 100%);">
        <div class="container">
            <h2 style="margin-bottom: 1rem;">{{ t('cta.title') }}</h2>
            <p style="margin-bottom: 30px; color: var(--text-secondary);">{{ t('cta.subtitle') }}</p>
            <a href="https://apps.apple.com/app/id6756549886" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.1rem;">
                {{ t('cta.button') }}
            </a>
        </div>
    </section>
  </div>
</template>