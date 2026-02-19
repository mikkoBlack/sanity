import {defineCliConfig} from 'sanity/cli'

const allowedHosts = [
  'sanity-production.up.railway.app',
  ...(process.env.SANITY_STUDIO_ALLOWED_HOSTS?.split(',').map((host) => host.trim()).filter(Boolean) ??
    []),
]

export default defineCliConfig({
  api: {
    projectId: 'r36no2nx',
    dataset: 'production'
  },
  vite: {
    server: {
      allowedHosts,
    },
    preview: {
      allowedHosts,
    },
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
