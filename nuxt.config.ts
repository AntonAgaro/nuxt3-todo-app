import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
vite: {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "@/assets/app.scss";
                `
            }
        }
    }
},
    target: 'static',
    router: {
        base: '/nuxt3-todo-app'
    }
})
