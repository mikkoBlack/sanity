import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {defineLocations, presentationTool} from 'sanity/presentation'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId: 'r36no2nx',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    presentationTool({
      previewUrl: {
        initial: 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: ['http://localhost:*'],
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
