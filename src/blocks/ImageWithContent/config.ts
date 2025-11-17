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
    {
      name: 'marginTop',
      type: 'radio',
      label: 'Margin Top',
      required: true,
      options: [
        { label: '0px', value: 'mt-0' },
        { label: '77px', value: 'mt-[77px]' },
      ],
      defaultValue: 'mt-0',
    },
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
    {
      name: 'showGetInTouch',
      type: 'checkbox',
      label: 'Show "Get in Touch" Section',
      required: false,
      defaultValue: true,
      admin: {
        description: 'Toggle to show or hide the Get in Touch section at the bottom.',
      },
    },
    // Image
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageHeight',
      type: 'select',
      label: 'Image Height',
      required: true,
      options: [
        { label: '1081px', value: 'h-[1081px]' },
        { label: '951px', value: 'h-[951px]' },
      ],
      defaultValue: 'h-[1081px]',
      admin: {
        description: 'Select the height for the image.',
      },
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
