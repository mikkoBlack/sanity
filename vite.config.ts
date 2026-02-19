import {defineConfig} from 'vite'

const additionalHosts =
  process.env.SANITY_STUDIO_ALLOWED_HOSTS?.split(',')
    .map((host) => host.trim())
    .filter(Boolean) ?? []

export default defineConfig({
  preview: {
    allowedHosts: ['sanity-production.up.railway.app', ...additionalHosts],
  },
})
