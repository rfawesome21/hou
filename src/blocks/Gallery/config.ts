import type { Block } from "payload";

export const GalleryBlock: Block = {
  slug: "galleryBlock",
  labels: {
    singular: "Gallery",
    plural: "Galleries",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: false,
    },
    {
      name: "images",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "autoPlay",
      type: "checkbox",
      label: "Autoplay carousel",
      defaultValue: true,
    },
    {
      name: "autoPlaySpeed",
      type: "number",
      label: "Autoplay Speed (ms)",
      defaultValue: 3000,
      admin: {
        condition: (_, siblingData) => siblingData.autoPlay === true,
      },
    },
  ],
};
