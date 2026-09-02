export interface SolutionStep {
  /** Bold lead-in shown before the text/bullets/columns (omit for a plain paragraph step). */
  label?: string;
  /** Plain lead sentence for the step. */
  text?: string;
  /** Flat multi-column list (each inner array is one column). */
  columns?: string[][];
  /** Flat bullet list. An item can itself be a nested "label + columns" group. */
  bullets?: (string | { label: string; columns: string[][] })[];
}

export interface CaseStudyData {
  slug: string;
  companyName: string;
  /** Hero background + Insights card thumbnail — the same image is used in both places. */
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  about: {
    heading: string;
    paragraphs: string[];
  };
  challenges: {
    intro: string;
    items: string[];
    closing?: string;
  };
  solution: {
    intro: string[];
    steps: SolutionStep[];
  };
  outcome: {
    paragraphs: string[];
  };
}

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  jabil: {
    slug: "jabil",
    companyName: "Jabil",
    heroImage: "/casestudies/newcase1.jpg",
    metaTitle:
      "KSH INFRA Builds Jabil’s Ready-to-use Custom Manufacturing Facility in Pune with Modern Industrial Facility",
    metaDescription:
      "Jabil’s ready-to-use custom manufacturing facility in Pune by KSH INFRA offers modern infrastructure, seamless logistics, and scalable warehousing.",
    about: {
      heading: "Done and Delivered. On Time",
      paragraphs: [
        "Jabil is an American electronics manufacturing multinational with more than 140,000 employees in over 25 countries. They produce over 300 of the biggest brands in the world in every market from healthcare, clean energy, automotive, defence, aerospace, telecommunications and to packaging and smartphones.",
        "Jabil wanted to set up a light engineering and assembly plant for manufacturing Nacelle, an aircraft component. They needed a 75,000 square feet facility in Chakan, Pune. Jabil approached KSH INFRA for space in KSH Chakan Park I, considering that the park was a completely constructed facility.",
      ],
    },
    challenges: {
      intro:
        "While KSH INFRA facility was ready-to-use, it needed significant customisations and alterations to suit Jabil’s manufacturing and assembly requirements, such as",
      items: [
        "A 100-tonne crane housed within the facility",
        "Loading pits for raw material",
        "Loading pits for finished products",
        "Availability of 6000 square feet of plug-and-play office space, canteen, locker rooms, and toilets",
        "1000 KVA electrical infrastructure",
        "Redesigning fire protection system based on FM Global Standards",
      ],
      closing:
        "KSH INFRA had a period of 90 days to prepare the space for Jabil, ensuring it was fully functional to obtain approvals and commence manufacturing and assembly.",
    },
    solution: {
      intro: [
        "The KSH INFRA team utilized their in-house expertise to successfully execute the customization plan. This is how we did it:",
      ],
      steps: [
        {
          text: "Installation of a 100-tonne gantry crane transported on rails: A temporary foundation were made outside the facility to install and transport the crane.",
        },
        {
          text: "The existing shopfloor was reengineered and reinforced: This allowed the crane to move 100 metres within the facility.",
        },
        {
          text: "Jabil was provided with a ground-plus first-floor office block. This included the following facilities:",
          columns: [
            ["Reception", "Canteen", "Locker rooms"],
            ["Toilet blocks", "Work stations", "Conference room"],
            ["Additional cloakrooms"],
          ],
        },
        {
          text: "Enhanced fire and safety standards to meet Jabil’s approval requirements.",
          bullets: [
            "The existing sprinklers were upgraded to FM-approved sprinklers.",
            "A 1000 KVA substation was installed with the required approvals from MSEDCL.",
          ],
        },
        {
          text: "Installing 300-lux LED lighting for efficient long-term energy use.",
        },
      ],
    },
    outcome: {
      paragraphs: [
        "We delivered a ready-to-use custom manufacturing facility complete with machinery, office and advanced infrastructure to Jabil on time.",
      ],
    },
  },

  hindalco: {
    slug: "hindalco",
    companyName: "Hindalco",
    heroImage: "/casestudies/hindalco.webp",
    metaTitle:
      "KSH INFRA & Hindalco | Industrial & Logistics Facility Solutions",
    metaDescription:
      "Explore how KSH INFRA delivered a 200,000 sq. ft. turnkey Industrial & Logistics facility for Hindalco, ensuring efficiency, compliance, and scalability.",
    about: {
      heading:
        "Large-Scale, Built-to-Spec Facility — Delivered to Hindalco in Eight Months",
      paragraphs: [
        "Hindalco, a flagship company of the Aditya Birla Group, was setting up a new facility for a key business vertical with a fixed go-live deadline of eight months. This marked a significant milestone—it was Hindalco’s first-ever leased Industrial facility, with all previous plants being company-owned.",
      ],
    },
    challenges: {
      intro:
        "The project required a built-to-suit facility from the foundation up, designed in strict compliance with Hindalco’s global corporate specifications. The scope demanded:",
      items: [
        "Wider spans of 15m × 27m in two bays to meet operational needs.",
        "Merging and redesigning two office blocks into one large corporate space.",
        "Extensive internal and external utility infrastructure.",
        "Category conversion of the Industrial park from Orange to Red in line with regulatory requirements.",
        "5,000 kVA (5 MW) power supply through an express feeder.",
      ],
      closing:
        "With major machinery orders already in process, adherence to timelines was critical. Compliance with fire, safety, and environmental standards had to be fast-tracked without compromising execution quality.",
    },
    solution: {
      intro: [
        "KSH INFRA delivered a 200,000 sq. ft. turnkey facility with extensive customisation in structure, utilities, and support infrastructure. Before the PEB order was finalised, Hindalco requested non-standard spans of 15m × 27m in two bays. The structure was re-engineered at the foundation stage to meet this requirement, ensuring both structural integrity and on-time delivery.",
        "Close coordination between KSH’s in-house design, civil, electrical, and MEP teams ensured smooth execution across all phases.",
        "Key Deliverables:",
      ],
      steps: [
        {
          label: "Structural & Civil Customizations",
          bullets: [
            "Redesign of the PEB structure to incorporate wider internal column spans, to accommodate non-standard column spans of 15m × 27m and merging of two office blocks into one.",
            "Adaptation of the design prior to PEB ordering without impacting timelines.",
            "Widened loading ramps and addition of curved ramps in the external utilities area.",
            "Installation of 5m × 5m motorised shutters for heavy-duty Logistics access.",
            "Epoxy flooring across the shop floor for durability and hygiene.",
          ],
        },
        {
          label: "Internal Infrastructure",
          bullets: [
            "Lighting upgraded from 150 lux to 300 lux to enhance safety and visibility.",
            "Installation of 10 HVLS fans for improved temperature control.",
            {
              label: "Development of functional spaces including:",
              columns: [
                [
                  "Additional male and female toilet blocks and locker rooms.",
                  "Panel room, tool room, maintenance rooms, and workshop.",
                  "Inward/outward goods handling rooms.",
                  "R&D protolab and inspection room.",
                ],
                [
                  "Safety and quarantine rooms.",
                  "Two temperature-controlled rooms.",
                  "UPS room.",
                ],
              ],
            },
          ],
        },
        {
          label: "External Utility Infrastructure",
          columns: [
            ["ETP tank and platform.", "Gas bank platform."],
            ["Oil storage rooms.", "Scrap yards."],
            ["Creche facility for employee welfare."],
          ],
        },
        {
          label: "Power & Compliance",
          bullets: [
            "Electrical infrastructure of 2,500 kVA + 2,500 kVA via express feeder for 24x7 operations.",
            "All statutory approvals (Fire NOC, EC, BCC) secured.",
            "Conversion of the park to Red Category to suit manufacturing requirements.",
          ],
        },
        {
          label: "Office Fit-Out",
          bullets: [
            "Merged and redesigned office blocks into a 15,000 sq. ft. plug-and-play workspace.",
            {
              label: "Facilities included:",
              columns: [
                [
                  "Workstations, conference and meeting rooms.",
                  "Training room.",
                  "Canteen and washrooms.",
                ],
                [
                  "Recreational area.",
                  "Double-height reception for a strong corporate presence.",
                ],
              ],
            },
          ],
        },
      ],
    },
    outcome: {
      paragraphs: [
        "KSH INFRA handed over the facility within the stipulated timeline, meeting all technical and compliance requirements. Hindalco received a fully operational, compliant facility—from shop floor to executive office—delivered exactly as specified.",
        "Satisfied with the delivery and professionalism, Hindalco awarded KSH INFRA a second facility of 235,000 sq. ft., further strengthening the partnership.",
      ],
    },
  },

  kawasaki: {
    slug: "kawasaki",
    companyName: "Kawasaki",
    heroImage: "/casestudies/kawasaki.webp",
    metaTitle:
      "KSH INFRA Builds Kawasaki’s Built-to-Suit Industrial Infrastructure in Pune by KSH INFRA – Industrial Facility",
    metaDescription:
      "KSH INFRA’s built-to-suit facility for Kawasaki, designed with high-spec industrial infrastructure, efficient logistics access, and scalable warehouse manufacturing solutions.",
    about: {
      heading:
        "Manufacturing, Assembly, and R&D — Delivered Kawasaki’s first Indian integrated Unit.",
      paragraphs: [
        "Kawasaki is a global motorcycle brand known for high-performance bikes, commute vehicles, motors, energy and Industrial equipment. Kawasaki has manufacturing plants located across the world. India Kawasaki Motors Private Limited is a subsidiary of Kawasaki Motors Limited, Japan.",
        "Kawasaki motors sought to establish its first Indian manufacturing plant at Chakan, Pune. They approached KSH INFRA with a requirement for 250,000 square feet dedicated to manufacturing, assembly, and warehousing for its R&D division.",
      ],
    },
    challenges: {
      intro:
        "The initial requirement was for a 125,000 sq. ft. space; however, Kawasaki also required two separate office blocks, one each for manufacturing and R&D.",
      items: [
        "Kawasaki wanted two facilities spanning an area of 125,000 sq. ft. each.",
        "They required a 500 KVA sub-station to meet their energy requirements and a generator backup for their manufacturing division.",
        "They required a canteen block, washroom sections, production offices, Quality Check labs, and R&D engine testing labs.",
      ],
    },
    solution: {
      intro: [
        "KSH INFRA integrated the two 125,000 sq. ft. facilities into one 250,000 sq. ft. facility with internal partitions separating the manufacturing, assembly, storage, and R&D divisions.",
      ],
      steps: [
        {
          text: "KSH INFRA consultants obtained all the required permissions from the MIDC for the operation.",
        },
        {
          text: "A 6000-sq.-ft. area was allocated to the manufacturing division. The ground floor was used as a showroom area.",
        },
        {
          text: "The aforesaid area was equipped with workstations, cabins, washroom blocks and conference rooms.",
        },
        {
          text: "Another 6000 square feet was converted into a corporate office for the R&D division.",
        },
        {
          text: "Temperature-controlled HVAC systems were installed in the production office, QC labs, and R&D facilities.",
        },
        {
          text: "200-lux lighting devices were installed in the warehouse in the manufacturing and assembly areas.",
        },
        {
          text: "800-lux lighting devices were installed in the QC labs.",
        },
      ],
    },
    outcome: {
      paragraphs: [
        "KSH INFRA delivered a complete, self-sustaining facility to Kawasaki Motors that combined manufacturing, assembly, and R&D capabilities. The turnkey solution allowed Kawasaki to begin operations on time.",
      ],
    },
  },

  barnes: {
    slug: "barnes",
    companyName: "SPECTRIX",
    // Filename is "bernes.webp" (typo) on disk — referencing it as-is since that's the real file.
    heroImage: "/casestudies/bernes.webp",
    metaTitle:
      "KSH INFRA & SPECTRIX | Crane-Ready Industrial Manufacturing Facility",
    metaDescription:
      "KSH INFRA delivered a 180,000 sq. ft. crane-ready manufacturing facility for SPECTRIX, featuring high-capacity power and precision infrastructure.",
    about: {
      heading:
        "Crane-Ready, High-Capacity Manufacturing Facility — Delivered to SPECTRIX (formerly Barnes)",
      paragraphs: [
        "SPECTRIX, a global moulding solutions manufacturer, partnered with KSH INFRA to develop a built-to-suit manufacturing facility for their heavy-duty operations. This greenfield project carried a fixed 12-month timeline. While the initial requirement was for 80,000 sq. ft., during the site visit SPECTRIX selected Building B4, factoring in future expansion.",
      ],
    },
    challenges: {
      intro:
        "The project demanded extensive structural, utility, and infrastructure provisions, including:",
      items: [
        "Redesign of the PEB structure to accommodate 11 EOT cranes.",
        "Installation of an express feeder power supply totalling 3,350 kVA (950 kVA + 2,400 kVA) in two phases.",
        "Construction of platforms for external utilities such as cooling towers, liquid nitrogen tanks, and compressors.",
        "Rockwool insulation across the roof and side cladding to improve thermal performance.",
        "Isolated flooring for precision manufacturing machines.",
        "HVLS fans for energy-efficient air circulation.",
        "Industrial-grade epoxy application across the entire shop floor.",
      ],
      closing:
        "These requirements, defined by SPECTRIX global team, were structurally complex and had to be delivered in a phased manner.",
    },
    solution: {
      intro: [
        "KSH INFRA delivered a 180,000 sq. ft. facility meeting SPECTRIX operational and technical standards.",
        "Key Deliverables:",
      ],
      steps: [
        {
          label: "Structural Engineering",
          bullets: [
            "PEB structure redesigned from the foundation to support crane loads, bay spacing, and the operational movement of 11 EOT cranes.",
            "Crane track and rail installation aligned with SPECTRIX equipment procurement schedule.",
            "Isolated flooring in designated areas to minimise vibrations and maintain the precision of sensitive equipment.",
          ],
        },
        {
          label: "Electrical Infrastructure",
          bullets: [
            "3350 kVA power contract demand (950 kVA in Phase 1 and 2,400 kVA in Phase 2), both via express feeder connections for uninterrupted 24x7 operations.",
          ],
        },
        {
          label: "Thermal Insulation",
          bullets: [
            "Rockwool insulation for the complete roof and side cladding, installed despite challenging monsoon conditions.",
            "Installation of nine HVLS fans in the Phase 1 operational area.",
          ],
        },
        {
          label: "External Utilities & Civil Works",
          columns: [
            ["Cooling tower platform."],
            ["Liquid nitrogen storage zone."],
            ["Scrap yard."],
            ["Compressor room."],
          ],
        },
      ],
    },
    outcome: {
      paragraphs: [
        "KSH INFRA handed over the facility for operational readiness in August 2025. SPECTRIX received a fully customised, crane-ready manufacturing unit with phased high-capacity power supply, robust utility infrastructure, and advanced thermal controls. With 11 cranes operating under one roof and critical power delivered on schedule, the project stands as a technically precise and well-coordinated Industrial build.",
      ],
    },
  },
};
