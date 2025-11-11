// image-with-content.ts
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ImageWithContentBlock: Block = {
  slug: 'imageWithContent',
  labels: {
    singular: 'Image with Content',
    plural: 'Images with Content',
  },
  fields: [
    // Heading
    {
      name: 'heading',
      type: 'text',
      required: false,
    },
    {
      name: 'headingClasses',
      type: 'text',
      required: false,
      label: 'Optional heading classes (Tailwind or custom)',
      admin: {
        description: 'Add custom classes for the heading, e.g., "text-4xl font-bold text-red-500"',
      },
    },
    // Image
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // Rich Text
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
      label: false,
    },
    // Image position
    {
      name: 'imagePosition',
      type: 'radio',
      required: true,
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    // Background color
    {
      name: 'backgroundColor',
      type: 'text',
      required: false,
      label: 'Optional background color (Tailwind class or hex)',
    },
    // Button (optional)
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      required: false,
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
          relationTo: 'pages', // replace 'pages' with your collection slug
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
    // Accordions (optional)
    {
      name: 'accordions',
      type: 'array',
      label: 'Accordions',
      required: false,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Accordion Title',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: false,
        },
      ],
    },
  ],
}
