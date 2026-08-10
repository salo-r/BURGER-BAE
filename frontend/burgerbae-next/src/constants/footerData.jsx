export const FooterData = [
  {
    heading: "Main Menu",
    items: [
      { label: "Sale 🎉", link: "/sale" },

      {
        label: "Hoodies",
        link: "/collections/all",
        children: [
          { label: "Basic Hoodies", link: "/collections/basic-hoodies" },
          { label: "Graphic Hoodies", link: "/collections/graphic-hoodies" },
          { label: "Acid Wash Hoodies", link: "/collections/acid-wash" },
          { label: "Couple Hoodies", link: "/collections/couple-hoodies" },
        ],
      },

      {
        label: "Baby Tees",
        link: "/collections/Tees",
        children: [
          { label: "Regular Baby Tees", link: "/collections/Tees" },
          { label: "Cropped Baby Tees", link: "/collections/Tees" },
        ],
      },

      {
        label: "Categories",
        link: "/collections/categories",
      },

      {
        label: "Collections",
        link: "/collections",
      },

      {
        label: "By Season",
        link: "/collections/season",
        children: [
          { label: "Winter Wear", link: "/collections/winter" },
          { label: "Summer Wear", link: "/collections/summer" },
        ],
      },

      {
        label: "Support",
        link: "/support",
        children: [
          { label: "Chat With Us", link: "/pages/chat-with-us" },
          { label: "Track Order", link: "/track-order" },
          { label: "Cancel Order", link: "/pages/cancel-order" },
          {
            label: "Exchange / Replacement",
            link: "/pages/exchange-replacement",
          },
        ],
      },

      { label: "Track Order", link: "/track-order" },
      { label: "Bulk Order", link: "/bulk-order" },
    ],
  },

  {
    heading: "Our Policy",
    items: [
      { label: "Exchange Policy", link: "/policies/exchange-policy" },
      { label: "Shipping Policy", link: "/policies/shipping-policy" },
      { label: "Privacy Policy", link: "/policies/privacy-policy" },
      { label: "Cancellation Policy", link: "/policies/cancellation-policy" },
      { label: "Terms of Service", link: "/policies/terms-of-service" },
      { label: "Contact Information", link: "/pages/contact-us" },
    ],
  },

  {
    heading: "Support",
    items: [
      { label: "Chat With Us", link: "/pages/chat-with-us" },
      {
        label: "Exchange And Replacement",
        link: "/pages/exchange-replacement",
      },
      { label: "Cancel Order", link: "/pages/cancel-order" },
      {
        label: "Become An Influencer With Us",
        link: "/pages/become-an-influencer",
      },
      {
        label: "Become a Vendor With Us",
        link: "/pages/become-a-vendor",
      },
      {
        label: "Become a Franchisee",
        link: "/pages/become-a-franchisee",
      },
    ],
  },
];