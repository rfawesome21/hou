import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Sizes: CollectionConfig = {
  slug: 'sizes',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  labels: { singular: 'Size', plural: 'Sizes' },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
