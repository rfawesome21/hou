// about-section.ts
import {
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const AboutSectionBlock: Block = {
  slug: 'aboutSection',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },

  fields: [
    // LEFT TEXT
    {
      name: 'leftText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      required: true,
    },

    // RIGHT TEXT
    {
      name: 'rightText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      required: true,
    },

    // ✅ Heading Size Selector
    {
      name: 'headingSize',
      type: 'select',
      label: 'Heading Size',
      options: [
        { label: '36px', value: 'text-[36px]' },
        { label: '48px', value: 'text-[48px]' },
        { label: '56px', value: 'text-[56px]' },
        { label: '64px', value: 'text-[64px]' },
        { label: '72px', value: 'text-[72px]' },
        { label: '80px', value: 'text-[80px]' },
      ],
      defaultValue: 'text-[64px]',
      required: true,
    },

    // ✅ Margin Top Selector
    {
      name: 'marginTop',
      type: 'select',
      label: 'Top Margin',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small (80px)', value: 'small' },
        { label: 'Default (168px)', value: 'default' },
        { label: 'Large (200px)', value: 'large' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'paddingTop',
      type: 'select',
      label: 'Top Padding',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Compressed (40px)', value: 'compressed' },
        { label: 'Expanded (103px)', value: 'expanded' },
        { label: 'Medium (74px)', value: 'medium' },
        { label: 'Default (40px)', value: 'default' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'showCurve',
      label: 'Show Background Curve',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'leftTextColor',
      type: 'select',
      label: 'Left Text Color',
      options: [
        { label: 'Black', value: 'text-black' },
        { label: 'Off black', value: 'text-background' },
        { label: 'White', value: 'text-white' },
        { label: 'Creme', value: 'text-creme' },
        { label: 'Green', value: 'text-primary-green' },
      ],
      defaultValue: 'text-black',
      required: true,
    },
    {
      name: 'rightTextColor',
      type: 'select',
      label: 'Right Text Color',
      options: [
        { label: 'Black', value: 'text-black' },
        { label: 'Off black', value: 'text-background' },
        { label: 'White', value: 'text-white' },
        { label: 'Creme', value: 'text-creme' },
        { label: 'Green', value: 'text-primary-green' },
      ],
      defaultValue: 'text-black',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
        { label: 'Creme', value: 'creme' },
      ],
      defaultValue: 'white',
      required: true,
    },

    {
      name: 'gapSize',
      type: 'select',
      label: 'Gap Between Columns',
      options: [
        { label: '93px', value: 'gap-[93px]' },
        { label: '115px', value: 'gap-[115px]' },
        { label: '140px', value: 'gap-[140px]' },
        { label: '168px', value: 'gap-[168px]' },
      ],
      defaultValue: 'gap-[115px]',
      required: true,
    },
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
          relationTo: 'pages',
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
