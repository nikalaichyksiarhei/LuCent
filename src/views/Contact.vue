<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
    <div class="container">
        <div class="text-content" style="max-width: 800px; margin: 120px auto 60px;">
            <div v-html="t('contact.intro_html')"></div>

            <div style="margin-bottom: 50px;" v-html="t('contact.how_to_html')"></div>

            <div style="margin-bottom: 50px;" v-html="t('contact.bug_html')"></div>

            <div style="margin-bottom: 50px;" v-html="t('contact.subs_html')"></div>

            <div style="margin-bottom: 50px;" v-html="t('contact.privacy_html')"></div>

            <div style="margin-bottom: 30px;" v-html="t('contact.features_html')"></div>
        </div>
    </div>
</template>