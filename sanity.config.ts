import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {defineLocations, presentationTool} from 'sanity/presentation'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'r36no2nx'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
const allowOrigin = process.env.SANITY_STUDIO_ALLOW_ORIGIN || 'http://localhost:*'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: [allowOrigin],
      resolve: {
        mainDocuments: [
          {
            route: '/:slug',
            type: 'post',
          },
        ],
        locations: {
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => {
              const slug = doc?.slug
              if (!slug) {
                return {
                  message: 'Missing slug',
                  tone: 'caution',
                }
              }

              return {
                locations: [
                  {
                    title: doc?.title || 'Untitled',
                    href: `/${slug}`,
                  },
                ],
              }
            },
          }),
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
