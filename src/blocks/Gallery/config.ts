import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
    },
    {
      name: 'subheading',
      type: 'text',
      required: false,
    },
    {
      name: 'paddingX',
      type: 'select',
      label: 'Horizontal Padding',
      defaultValue: 'px-0',
      options: [
        { label: 'None', value: 'px-0' },
        { label: 'Small', value: 'px-4' },
        { label: 'Medium', value: 'px-6' },
        { label: 'Large', value: 'px-8' },
        { label: 'Extra Large', value: 'px-16' },
        { label: 'Full', value: 'px-20' },
      ],
    },
    {
      name: 'marginTop',
      type: 'select',
      label: 'Top Margin',
      defaultValue: 'mt-[107px]',
      options: [
        { label: 'Normal', value: 'mt-[107px]' },
        { label: 'Medium', value: 'mt-[120px]' },
        { label: 'Large', value: 'mt-[140px]' },
      ],
    },
    {
      name: 'displayCategories',
      type: 'checkbox',
      label: 'Display Categories Instead of Images',
      defaultValue: false,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.displayCategories === true,
      },
    },
    {
      name: 'displayPosts',
      type: 'checkbox',
      label: 'Display Posts from Category',
      defaultValue: false,
    },
    {
      name: 'categoryForPosts',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        condition: (_, siblingData) => siblingData.displayPosts === true,
      },
    },
    {
      name: 'images',
      type: 'array',
      required: false,
      minRows: 1,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      admin: {
        condition: (_, siblingData) =>
          siblingData.displayCategories === false && siblingData.displayPosts === false,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'button',
      type: 'group',
      label: 'CTA Button',
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
    {
      name: 'autoPlay',
      type: 'checkbox',
      label: 'Autoplay carousel',
      defaultValue: true,
    },
    {
      name: 'autoPlaySpeed',
      type: 'number',
      label: 'Autoplay Speed (ms)',
      defaultValue: 3000,
      admin: {
        condition: (_, siblingData) => siblingData.autoPlay === true,
      },
    },
  ],
}
