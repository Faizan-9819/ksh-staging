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
//         description: `Routine Maintenance:\nRegular inspections and maintenance to prevent disruptions and ensure all systems function seamlessly.\n\nRepair Management:\nPrompt handling of repair needs to minimize downtime and maintain operational efficiency.`,
//       },
//       {
//         title: "Security and Safety",
//         description: `24/7 Surveillance:\nContinuous monitoring using state-of-the-art security systems to ensure safety and security across the premises.\n\nEmergency Response:\nWell-defined protocols for quick response to any incidents, ensuring tenant safety and asset protection.`,
//         image: "/solutions/sec.jpg",
//         imageAlt:
//           "Person holding a hard hat and wearing a high-visibility safety vest",
//       },
//       {
//         title: "Tenant Relations",
//         description: `Dedicated Support:\nOn-site management teams provide immediate assistance and support to address tenant needs.\n\nRegular Communication:\nWe keep tenants well-informed about park developments, maintenance schedules, and any changes affecting their operations.`,
//         image: "/solutions/tab3.jpg",
//         imageAlt: "Two businessmen shaking hands across a boardroom table",
//       },
//       {
//         title: "Sustainability Initiatives",
//         description: `Eco-friendly Practices:\nImplementation of green policies like waste reduction, energy efficiency, and sustainable resource management.\n\nContinuous Improvement:\nRegular assessments to identify opportunities for environmental enhancements.`,
//         image: "/solutions/tab4.jpg",
//         imageAlt: "Hands holding a small tree growing from a mound of soil",
//       },
//     ],
//   },
// ];
//
//

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
    id: "callisons",
    index: "01",
    title: "Callisons",
    subtitle: "Raj Ghogale — Managing Director, Callisons",
    description: [
      //   "KSH INFRA helped us set up a world class industrial facility; the workers, infrastructure and service provided by KSH INFRA is unparalleled.",
      "KSH Industrial Park at Chakan is a world class Industrial facility. We feel privileged to be established here as ease of doing business, safety and security of the plant & workers, infrastructure and service provided by KSH is unparalleled. Rohit Hegde and his team have provided us tremendous support in establishing the business.",
    ],
    image: "/homeasset/test7.jpg",
    imageAlt: "Callisons Facility and Logo",
    background: "beige",
    imagePosition: "left",
    layout: "simple",
  },
  {
    id: "ctc-global",
    index: "02",
    title: "CTC Global",
    subtitle: "Mr. Shyam Datye — India Head, CTC Global",
    // description: [
    //   "KSH INFRA is flexible when it comes to client needs and delivers excellent quality in every project.",
    // ],
    description: [
      "Working with KSH INFRA on their latest project, KSH INFRA Chakan Park III at Varale, has been an excellent experience. We are amazed at the speed and proficiency with which all the works were carried out and it was ensured that we got our building according to our plan, apart from the timely possession all other infrastructure works were also completed in time so as not to have any disturbance to our operations and there has been no delay in our project timelines, KSH INFRA has also been very flexible to making adjustments to our changing project plans and scope! In a nut shell I will say that KSH INFRA is extremely customer centric  and understands and fulfils the needs of the clients. The quality of work has been good and KSH INFRA was very open to making any changes that we needed in order to suit our production & machine requirements. The entire Park layout is good and attention to details such as broad roads, parking, security etc is good. We look forward to continuing our partnership with them in future endeavours.",
    ],
    image: "/homeasset/test4.jpg",
    imageAlt: "CTC Global Facility and Logo",
    background: "white",
    imagePosition: "right",
    layout: "simple",
  },
  {
    id: "gedia",
    index: "03",
    title: "Gedia",
    subtitle:
      "Mr. Amitabh Mathur — Managing Director & CEO, GEDIA India Automotive Components Pvt. Ltd.",

    description: [
      "Our experience with KSH INFRA has been outstanding in every aspect. From the very beginning, their team showed a deep understanding of our requirements. Since our customer is one of the most reputed automotive OEMs a number of special requirements need to be executed in the factory floor for our production equipment. KSH willingly accepted to make all such changes and delivered a facility that reflects the highest standards of construction quality. The entire project was executed with remarkable timeliness, and the transaction process was smooth, transparent, and highly professional. KSH INFRA has truly performed beyond our expectations — not just as a developer, but as a trusted partner who enabled us to set up a world-class manufacturing facility with complete peace of mind. We deeply value this association and look forward to future collaborations.",
    ],
    // description: [
    //   "KSH INFRA delivered a world-class manufacturing facility with precision, speed, and transparency—proving to be not just a developer, but a trusted partner who exceeds expectations at every step.",
    // ],
    image: "/homeasset/test2.jpg",
    imageAlt: "GEDIA Facility and Logo",
    background: "beige",
    imagePosition: "left",
    layout: "simple",
  },
  {
    id: "jabil",
    index: "04",
    title: "Jabil",
    subtitle: "Todd Renner — Global Business Unit Manager, Jabil",
    description: [
      //   "KSH INFRA has been very instrumental during our facility setup and with their expertise in construction and understanding of our manufacturing needs.",
      "KSH has been very instrumental during our facility setup and with their expertise in construction and understanding of our manufacturing needs, their collaborative approach allowed them to capture critical requirements to deliver our factory on time.",
    ],
    image: "/homeasset/test1.jpg",
    imageAlt: "Jabil Facility and Logo",
    background: "white",
    imagePosition: "right",
    layout: "simple",
  },
  {
    id: "kawasaki",
    index: "05",
    title: "Kawasaki",
    subtitle: "Naoki Matsumoto — Chairman, India (Kawasaki)",
    description: [
      //   "Team KSH INFRA was extremely supportive and professional in developing the facility for us.",
      "TEAM KSH has provided us a world-class facility in Chakan Industrial area for our manufacturing operations. Team KSH was extremely supportive and professional in developing the facility for us. We were able to commence operations within two months from moving-in which was very beneficial for us.",
    ],
    image: "/homeasset/test6.jpg",
    imageAlt: "Kawasaki Facility and Logo",
    background: "beige",
    imagePosition: "left",
    layout: "simple",
  },
  {
    id: "klingspor",
    index: "06",
    title: "Klingspor",
    subtitle: "Mr. Yogesh Barve — Managing Director, Klingspor",
    description: [
      //   "KSH INFRA’s responsiveness, commitment to service and professionalism is exceptional.",
      "Our experience at KSH Talegaon Park I has been truly exceptional. We chose this facility after it successfully met our rigorous standards for infrastructure quality, as well as our comprehensive safety and security requirements. What set this collaboration apart was the outstanding support and responsiveness of the KSH INFRA team—extending well beyond our initial move-in period. Their commitment to service and professionalism has been evident throughout our journey. We deeply value the partnership we have forged through this project.",
    ],
    image: "/homeasset/test3.jpg",
    imageAlt: "Klingspor Facility and Logo",
    background: "white",
    imagePosition: "right",
    layout: "simple",
  },
  {
    id: "unisource",
    index: "07",
    title: "Unisource",
    subtitle: "Mr. Inder Aurora — Director, Unisource",
    description: [
      //   "KSH INFRA’s exceptional quality of construction and professional, solution-oriented approach makes collaborating with them a great experience.",
      "We were in search of a well-located and high-quality Industrial infrastructure space for our business in Talegaon, and KSH INFRA emerged as the perfect partner. Even though KSH Talegaon I Park was their first project, we were impressed by the exceptional quality of construction and their professional, solution-oriented approach. The team's positive attitude and commitment to delivery made it a great experience collaborating with them. We are pleased to see KSH INFRA rapidly expanding its footprint across India, and we extend our best wishes for continued success and growth.",
    ],
    image: "/homeasset/test5.jpg",
    imageAlt: "Unisource Facility and Logo",
    background: "beige",
    imagePosition: "left",
    layout: "simple",
  },
];
