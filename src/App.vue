<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t, locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'ru' : 'en'
}

const currentLangLabel = computed(() => locale.value === 'en' ? 'RU' : 'EN')
</script>

<template>
  <div>
    <div class="hero-bg-glow"></div>
    <header>
        <div class="container">
            <router-link to="/" class="logo">
                <img src="/assets/img/AppIconDark.png" alt="LuCent App Icon" class="logo-icon">
                LuCent
            </router-link>
            <nav>
                <ul>
                    <li><router-link :to="{ path: '/', hash: '#features' }">{{ t('nav.features') }}</router-link></li>
                    <li><router-link to="/contact">{{ t('nav.contact') }}</router-link></li>
                    <li><a href="#" @click.prevent="toggleLanguage" class="lang-switch">{{ currentLangLabel }}</a></li>
                    <li><a href="https://apps.apple.com/app/id6756549886" class="btn btn-primary"
                            style="padding: 8px 16px; font-size: 0.9rem;" target="_blank">{{ t('nav.download') }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand" style="max-width: 300px;">
                    <router-link to="/" class="logo" style="margin-bottom: 20px; display: inline-flex;">
                        <img src="/assets/img/AppIconDark.png" alt="LuCent App Icon" class="logo-icon">
                        LuCent
                    </router-link>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                        {{ t('footer.tagline') }}
                    </p>
                </div>

                <div class="footer-links">
                    <h4>{{ t('footer.legals') }}</h4>
                    <ul>
                        <li><router-link to="/privacy">{{ t('footer.privacy') }}</router-link></li>
                        <li><router-link to="/terms">{{ t('footer.terms') }}</router-link></li>
                    </ul>
                </div>

                <div class="footer-links">
                    <h4>{{ t('footer.support') }}</h4>
                    <ul>
                        <li><router-link to="/contact">{{ t('footer.contact') }}</router-link></li>
                        <li><a href="mailto:nikalaichyksiarhei@gmail.com">nikalaichyksiarhei@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                &copy; 2026 LuCent. {{ t('footer.rights') }}
            </div>
        </div>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>