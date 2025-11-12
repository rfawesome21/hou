import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ImageTextOverlayBlock: Block = {
  slug: 'imageTextOverlay',
  labels: {
    singular: 'Image with Text Overlay',
    plural: 'Images with Text Overlay',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      name: 'heading',
      type: 'text',
      required: false,
      label: 'Heading Text',
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Body Text',
      required: false,
    },
    {
      name: 'textAlignment',
      type: 'radio',
      required: true,
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'center',
      label: 'Text Alignment',
    },
    {
      name: 'backgroundColor',
      type: 'text',
      required: false,
      label: 'Optional Overlay Color (tailwind class or hex)',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: false,
          label: 'Button Text',
        },
        {
          name: 'internalPage',
          type: 'relationship',
          relationTo: 'pages', // replace with your pages collection
          required: false,
          label: 'Link to Internal Page',
          hasMany: false,
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
  ],
}
