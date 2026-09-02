// export interface SolutionFeature {
//   title: string;
//   description: string;
//   /** When set on a `hoverPanel` item, activating it also swaps the card's image */
//   image?: string;
//   imageAlt?: string;
// }

// export interface SolutionButton {
//   label: string;
//   active?: boolean;
//   /** When set, selecting this tab swaps the card's image */
//   image?: string;
//   imageAlt?: string;
//   /** When set, selecting this tab swaps the feature list shown beside it */
//   features?: SolutionFeature[];
// }

// export interface SolutionAccordionItemData {
//   title: string;
//   description: string;
//   defaultOpen?: boolean;
// }

// export interface SolutionCardData {
//   id: string;
//   /** Display index shown on mobile, e.g. "01" */
//   index: string;
//   title: string;
//   subtitle: string;
//   /** One paragraph per array entry */
//   description: string[];
//   image: string;
//   imageAlt: string;
//   background: "beige" | "white";
//   /** Where the image sits on desktop; mobile always shows image, then content */
//   imagePosition: "left" | "right";
//   /**
//    * "simple": image + heading/subheading/description as a two-column pair.
//    * "feature-panel": full-width heading block, then an image + tabbed
//    * button/feature-list row underneath (e.g. Project Development).
//    */
//   layout: "simple" | "feature-panel";
//   buttons?: SolutionButton[];
//   accordion?: SolutionAccordionItemData[];
//   /** Overlay box rendered on top of the image (bottom-aligned) */
//   imageCaption?: SolutionFeature[];
//   /**
//    * Services.tsx-style interaction: hovering/clicking a row makes it active
//    * and shows its title + description as a single overlay on the image.
//    * No inline expansion, unlike `accordion`.
//    */
//   hoverPanel?: SolutionFeature[];
// }

// // export const SOLUTIONS_TIMELINE_DATA: SolutionCardData[] = [
// //   {
// //     id: "land-acquisition",
// //     index: "01",
// //     title: "Land Acquisition",
// //     subtitle: "Strategic Locations for Business Advantage",
// //     description: [
// //       "Our experts see opportunities others miss and turn them into successful developments. Our experts see opportunities others miss and turn them into successful developments.",
// //       "We choose locations with easy access, strong growth potential and alignment with economic development plans.",
// //       "Every site we select creates a solid foundation for your business success. We don't just acquire land - we secure your future advantage through strategic positioning.",
// //     ],
// //     image: "/solutions/sol1.jpg",
// //     imageAlt:
// //       "Aerial view of a vacant industrial land plot marked for acquisition",
// //     background: "beige",
// //     imagePosition: "left",
// //     layout: "simple",
// //   },
// //   {
// //     id: "capital-deployment",
// //     index: "02",
// //     title: "Capital Deployment",
// //     subtitle: "Creating Value for Businesses",
// //     description: [
// //       "We invest with precision, focusing on assets that can deliver strong returns.",
// //       "We invest in infrastructure improvements and technological enhancements that not only boost the value of our properties but also attract leading tenants seeking modern and efficient spaces.",
// //     ],
// //     image: "/solutions/sol2.jpg",
// //     imageAlt:
// //       "Two professionals reviewing investment charts and financial documents",
// //     background: "white",
// //     imagePosition: "right",
// //     layout: "simple",
// //   },
// //   {
// //     id: "project-development",
// //     index: "03",
// //     title: "Project Development",
// //     subtitle: "Building Success from the Ground Up",
// //     description: [
// //       "At KSH INFRA, we understand that your business is unique, and so are your facility requirements. That is why we offer both 'Built-to-Suit' and 'Ready-to-Move' solutions to match the diverse needs of our clients.",
// //     ],
// //     image: "/solutions/sol31.jpg",
// //     imageAlt:
// //       "Construction workers reviewing blueprints on site wearing safety gear",
// //     background: "beige",
// //     imagePosition: "left",
// //     layout: "feature-panel",
// //     buttons: [
// //       {
// //         label: "Built-to-Suit Solutions",
// //         active: true,
// //         image: "/solutions/sol31.jpg",
// //         imageAlt:
// //           "Construction workers reviewing blueprints on site wearing safety gear",
// //         features: [
// //           {
// //             title: "Routine Maintenance:",
// //             description:
// //               "Collaborate on design and construction to ensure that the facilities meet your operational needs.",
// //           },
// //           {
// //             title: "Client Involvement",
// //             description:
// //               "We work closely and cohesively with our clients in all the development phases, from layout planning to infrastructure integration to project delivery.",
// //           },
// //           {
// //             title: "Efficiency Focus",
// //             description:
// //               "Our solutions are optimized for productivity with materials and configurations that enhance performance.",
// //           },
// //         ],
// //       },
// //       {
// //         label: "Ready-to-Move Solutions",
// //         active: false,
// //         image: "/solutions/sol32.jpg",
// //         imageAlt: "Ready-to-move facility available for immediate occupancy",
// //         features: [
// //           {
// //             title: "Lorem Ipsum Dolor",
// //             description:
// //               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
// //           },
// //           {
// //             title: "Ut Enim Ad Minim",
// //             description:
// //               "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
// //           },
// //           {
// //             title: "Duis Aute Irure",
// //             description:
// //               "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.",
// //           },
// //         ],
// //       },
// //     ],
// //   },
// //   {
// //     id: "leasing-management",
// //     index: "04",
// //     title: "Leasing Management",
// //     subtitle: "Matching Diverse Business Needs",
// //     description: [
// //       "Our leasing team listens carefully to what you need. We create flexible space solutions that fit your exact operations, from custom layouts to designs that can grow with your business. We make sure that our properties are suitable for diverse business activities. With us, your space will use every square foot efficiently, helping you make the most of your resources, while supporting all your activities.",
// //     ],
// //     image: "/solutions/sol4.jpg",
// //     imageAlt: "Two people reviewing a lease agreement document beside a laptop",
// //     background: "white",
// //     imagePosition: "right",
// //     layout: "simple",
// //   },
// //   {
// //     id: "property-management",
// //     index: "05",
// //     title: "Property Management",
// //     subtitle: "Customer Delight. First.",
// //     description: [
// //       "At KSH INFRA, we manage our properties to keep everything functioning seamlessly. Our Property Management team prioritizes tenant satisfaction above all else. Our Property Management approach spans several focus areas:",
// //     ],
// //     image: "/solutions/sol5.jpg",
// //     imageAlt:
// //       "Industrial building exterior with a boom lift performing maintenance work",
// //     background: "beige",
// //     imagePosition: "left",
// //     layout: "simple",
// //     hoverPanel: [
// //       {
// //         title: "Facility Upkeep",
// //         description:
// //           "Ongoing upkeep of building systems, common areas and infrastructure so every property performs the way tenants expect, day in and day out.",
// //       },
// //       {
// //         title: "Security and Safety",
// //         description:
// //           "Round-the-clock access control, surveillance and compliance checks that keep people and assets protected across every park.",
// //         image: "/solutions/tab2.jpg",
// //         imageAlt: "Person holding a hard hat and wearing a high-visibility safety vest",
// //       },
// //       {
// //         title: "Tenant Relations",
// //         description:
// //           "A dedicated point of contact for every tenant, resolving requests quickly and keeping communication clear throughout the lease term.",
// //         image: "/solutions/tab3.jpg",
// //         imageAlt: "Two businessmen shaking hands across a boardroom table",
// //       },
// //       {
// //         title: "Sustainability Initiatives",
// //         description:
// //           "Energy, water and waste programs woven into daily operations to lower environmental impact without compromising performance.",
// //         image: "/solutions/tab4.jpg",
// //         imageAlt: "Hands holding a small tree growing from a mound of soil",
// //       },
// //     ],
// //   },
// // ];

// export const SOLUTIONS_TIMELINE_DATA: SolutionCardData[] = [
//   {
//     id: "land-acquisition",
//     index: "01",
//     title: "Land Acquisition",
//     subtitle: "Strategic Locations for Business Advantage",
//     description: [
//       "Our experts see opportunities others miss and turn them into successful developments. We find the best land by studying markets closely and predicting city growth patterns. We choose locations with easy access, strong growth potential and alignment with economic development plans. Every site we select creates a solid foundation for your business success. We don't just acquire land - we secure your future advantage through strategic positioning.",
//     ],
//     image: "/solutions/sol1.jpg",
//     imageAlt:
//       "Aerial view of a vacant industrial land plot marked for acquisition",
//     background: "beige",
//     imagePosition: "left",
//     layout: "simple",
//   },
//   {
//     id: "capital-deployment",
//     index: "02",
//     title: "Capital Deployment",
//     subtitle: "Creating Value for Businesses",
//     description: [
//       "We invest with precision, focusing on assets that can deliver strong returns. We invest in infrastructure improvements and technological enhancements that not only boost the value of our properties but also attract leading tenants seeking modern and efficient spaces.",
//     ],
//     image: "/solutions/sol2.jpg",
//     imageAlt:
//       "Two professionals reviewing investment charts and financial documents",
//     background: "white",
//     imagePosition: "right",
//     layout: "simple",
//   },
//   {
//     id: "project-development",
//     index: "03",
//     title: "Project Development",
//     subtitle: "Building Success from the Ground Up",
//     description: [
//       "At KSH INFRA, we understand that your business is unique, and so are your facility requirements. That is why we offer both ‘Built-to-Suit’ and ‘Ready-to-Move’ solutions to match the diverse needs of our clients.",
//     ],
//     image: "/solutions/sol31.jpg",
//     imageAlt:
//       "Construction workers reviewing blueprints on site wearing safety gear",
//     background: "beige",
//     imagePosition: "left",
//     layout: "feature-panel",
//     buttons: [
//       {
//         label: "Built-to-Suit Solutions",
//         active: true,
//         image: "/solutions/sol31.jpg",
//         imageAlt:
//           "Construction workers reviewing blueprints on site wearing safety gear",
//         features: [
//           {
//             title: "Customized Design",
//             description:
//               "Collaborate on design and construction to ensure that the facilities meet your operational needs.",
//           },
//           {
//             title: "Client Involvement",
//             description:
//               "We work closely and cohesively with our clients in all the development phases, from layout planning to infrastructure integration to project delivery.",
//           },
//           {
//             title: "Efficiency Focus",
//             description:
//               "Our solutions are optimized for productivity with materials and configurations that enhance performance.",
//           },
//         ],
//       },
//       {
//         label: "Ready-to-Move Solutions",
//         active: false,
//         image: "/solutions/sol32.jpg",
//         imageAlt: "Ready-to-move facility available for immediate occupancy",
//         features: [
//           {
//             title: "Immediate Availability",
//             description:
//               "Our Ready-to-Move facilities are available for immediate occupation. No construction delays, no waiting hassles.",
//           },
//           {
//             title: "High Standards",
//             description:
//               "Our spaces conform to best-in-class Industrial & Logistics standards.",
//           },
//           {
//             title: "Flexible Use",
//             description:
//               "Our spaces are designed to support various industry needs with essential amenities.",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "leasing-management",
//     index: "04",
//     title: "Leasing Management",
//     subtitle: "Matching Diverse Business Needs",
//     description: [
//       "Our leasing team listens carefully to what you need. We create flexible space solutions that fit your exact operations, from custom layouts to designs that can grow with your business. We make sure that our properties are suitable for diverse business activities. With us, your space will use every square foot efficiently, helping you make the most of your resources, while supporting all your activities.",
//     ],
//     image: "/solutions/sol4.jpg",
//     imageAlt: "Two people reviewing a lease agreement document beside a laptop",
//     background: "white",
//     imagePosition: "right",
//     layout: "simple",
//   },
//   {
//     id: "property-management",
//     index: "05",
//     title: "Property Management",
//     subtitle: "Customer Delight. First.",
//     description: [
//       "At KSH INFRA, we manage our properties to keep everything functioning seamlessly. Our Property Management team prioritizes tenant satisfaction above all else. Our Property Management approach spans several focus areas:",
//     ],
//     image: "/solutions/faci.jpg",
//     imageAlt:
//       "Industrial building exterior with a boom lift performing maintenance work",
//     background: "beige",
//     imagePosition: "left",
//     layout: "simple",
//     hoverPanel: [
//       {
//         title: "Facility Upkeep",
//         description: `Routine Maintenance:
// Regular inspections and maintenance to prevent disruptions and ensure all systems function seamlessly. <br/>
// Repair Management: Prompt handling of repair needs to minimize downtime and maintain operational efficiency.`,
//       },
//       {
//         title: "Security and Safety",
//         description: `24/7 Surveillance:
// Continuous monitoring using state-of-the-art security systems to ensure safety and security across the premises.
// <br/>
// Emergency Response:
// Well-defined protocols for quick response to any incidents, ensuring tenant safety and asset protection.`,
//         image: "/solutions/sec.jpg",
//         imageAlt:
//           "Person holding a hard hat and wearing a high-visibility safety vest",
//       },
//       {
//         title: "Tenant Relations",
//         description: `Dedicated Support:
// On-site management teams provide immediate assistance and support to address tenant needs.
// <br/>
// Regular Communication:
// We keep tenants well-informed about park developments, maintenance schedules, and any changes affecting their operations.`,
//         image: "/solutions/tab3.jpg",
//         imageAlt: "Two businessmen shaking hands across a boardroom table",
//       },
//       {
//         title: "Sustainability Initiatives",
//         description: `Eco-friendly Practices:
// Implementation of green policies like waste reduction, energy efficiency, and sustainable resource management.
// <br/>
// Continuous Improvement:
// Regular assessments to identify opportunities for environmental enhancements.`,
//         image: "/solutions/tab4.jpg",
//         imageAlt: "Hands holding a small tree growing from a mound of soil",
//       },
//     ],
//   },
// ];

export interface SolutionFeature {
  title: string;
  description: string;
  /** When set on a `hoverPanel` item, activating it also swaps the card's image */
  image?: string;
  imageAlt?: string;
}

export interface SolutionButton {
  label: string;
  active?: boolean;
  /** When set, selecting this tab swaps the card's image */
  image?: string;
  imageAlt?: string;
  /** When set, selecting this tab swaps the feature list shown beside it */
  features?: SolutionFeature[];
}

export interface SolutionAccordionItemData {
  title: string;
  description: string;
  defaultOpen?: boolean;
}

export interface SolutionCardData {
  id: string;
  /** Display index shown on mobile, e.g. "01" */
  index: string;
  title: string;
  subtitle: string;
  /** One paragraph per array entry */
  description: string[];
  image: string;
  imageAlt: string;
  background: "beige" | "white";
  /** Where the image sits on desktop; mobile always shows image, then content */
  imagePosition: "left" | "right";
  /**
   * "simple": image + heading/subheading/description as a two-column pair.
   * "feature-panel": full-width heading block, then an image + tabbed
   * button/feature-list row underneath (e.g. Project Development).
   */
  layout: "simple" | "feature-panel";
  buttons?: SolutionButton[];
  accordion?: SolutionAccordionItemData[];
  /** Overlay box rendered on top of the image (bottom-aligned) */
  imageCaption?: SolutionFeature[];
  /**
   * Services.tsx-style interaction: hovering/clicking a row makes it active
   * and shows its title + description as a single overlay on the image.
   * No inline expansion, unlike `accordion`.
   */
  hoverPanel?: SolutionFeature[];
}

export const SOLUTIONS_TIMELINE_DATA: SolutionCardData[] = [
  {
    id: "land-acquisition",
    index: "01",
    title: "Land Acquisition",
    subtitle: "Strategic Locations for Business Advantage",
    description: [
      "Our experts see opportunities others miss and turn them into successful developments. We find the best land by studying markets closely and predicting city growth patterns. We choose locations with easy access, strong growth potential and alignment with economic development plans. Every site we select creates a solid foundation for your business success. We don't just acquire land - we secure your future advantage through strategic positioning.",
    ],
    image: "/solutions/sol1.jpg",
    imageAlt:
      "Aerial view of a vacant Industrial land plot marked for acquisition",
    background: "beige",
    imagePosition: "left",
    layout: "simple",
  },
  {
    id: "capital-deployment",
    index: "02",
    title: "Capital Deployment",
    subtitle: "Creating Value for Businesses",
    description: [
      "We invest with precision, focusing on assets that can deliver strong returns. We invest in infrastructure improvements and technological enhancements that not only boost the value of our properties but also attract leading tenants seeking modern and efficient spaces.",
    ],
    image: "/solutions/sol2.jpg",
    imageAlt:
      "Two professionals reviewing investment charts and financial documents",
    background: "white",
    imagePosition: "right",
    layout: "simple",
  },
  {
    id: "project-development",
    index: "03",
    title: "Project Development",
    subtitle: "Building Success from the Ground Up",
    description: [
      "At KSH INFRA, we understand that your business is unique, and so are your facility requirements. That is why we offer both ‘Built-to-Suit’ and ‘Ready-to-Move’ solutions to match the diverse needs of our clients.",
    ],
    image: "/solutions/sol31.jpg",
    imageAlt:
      "Construction workers reviewing blueprints on site wearing safety gear",
    background: "beige",
    imagePosition: "left",
    layout: "feature-panel",
    buttons: [
      {
        label: "Built-to-Suit Solutions",
        active: true,
        image: "/solutions/sol31.jpg",
        imageAlt:
          "Construction workers reviewing blueprints on site wearing safety gear",
        features: [
          {
            title: "Customized Design",
            description:
              "Collaborate on design and construction to ensure that the facilities meet your operational needs.",
          },
          {
            title: "Client Involvement",
            description:
              "We work closely and cohesively with our clients in all the development phases, from layout planning to infrastructure integration to project delivery.",
          },
          {
            title: "Efficiency Focus",
            description:
              "Our solutions are optimized for productivity with materials and configurations that enhance performance.",
          },
        ],
      },
      {
        label: "Ready-to-Move Solutions",
        active: false,
        image: "/solutions/sol32.jpg",
        imageAlt: "Ready-to-move facility available for immediate occupancy",
        features: [
          {
            title: "Immediate Availability",
            description:
              "Our Ready-to-Move facilities are available for immediate occupation. No construction delays, no waiting hassles.",
          },
          {
            title: "High Standards",
            description:
              "Our spaces conform to best-in-class Industrial & Logistics standards.",
          },
          {
            title: "Flexible Use",
            description:
              "Our spaces are designed to support various industry needs with essential amenities.",
          },
        ],
      },
    ],
  },
  {
    id: "leasing-management",
    index: "04",
    title: "Leasing Management",
    subtitle: "Matching Diverse Business Needs",
    description: [
      "Our leasing team listens carefully to what you need. We create flexible space solutions that fit your exact operations, from custom layouts to designs that can grow with your business. We make sure that our properties are suitable for diverse business activities. With us, your space will use every square foot efficiently, helping you make the most of your resources, while supporting all your activities.",
    ],
    image: "/solutions/sol4.jpg",
    imageAlt: "Two people reviewing a lease agreement document beside a laptop",
    background: "white",
    imagePosition: "right",
    layout: "simple",
  },
  {
    id: "property-management",
    index: "05",
    title: "Property Management",
    subtitle: "Customer Delight. First.",
    description: [
      "At KSH INFRA, we manage our properties to keep everything functioning seamlessly. Our Property Management team prioritizes tenant satisfaction above all else. Our Property Management approach spans several focus areas:",
    ],
    image: "/solutions/faci.jpg",
    imageAlt:
      "Industrial building exterior with a boom lift performing maintenance work",
    background: "beige",
    imagePosition: "left",
    layout: "simple",
    hoverPanel: [
      {
        title: "Facility Upkeep",
        description: `Routine Maintenance:\nRegular inspections and maintenance to prevent disruptions and ensure all systems function seamlessly.\n\nRepair Management:\nPrompt handling of repair needs to minimize downtime and maintain operational efficiency.`,
      },
      {
        title: "Security and Safety",
        description: `24/7 Surveillance:\nContinuous monitoring using state-of-the-art security systems to ensure safety and security across the premises.\n\nEmergency Response:\nWell-defined protocols for quick response to any incidents, ensuring tenant safety and asset protection.`,
        image: "/solutions/sec.jpg",
        imageAlt:
          "Person holding a hard hat and wearing a high-visibility safety vest",
      },
      {
        title: "Tenant Relations",
        description: `Dedicated Support:\nOn-site management teams provide immediate assistance and support to address tenant needs.\n\nRegular Communication:\nWe keep tenants well-informed about park developments, maintenance schedules, and any changes affecting their operations.`,
        image: "/solutions/tab3.jpg",
        imageAlt: "Two businessmen shaking hands across a boardroom table",
      },
      {
        title: "Sustainability Initiatives",
        description: `Eco-friendly Practices:\nImplementation of green policies like waste reduction, energy efficiency, and sustainable resource management.\n\nContinuous Improvement:\nRegular assessments to identify opportunities for environmental enhancements.`,
        image: "/solutions/tab4.jpg",
        imageAlt: "Hands holding a small tree growing from a mound of soil",
      },
    ],
  },
];
