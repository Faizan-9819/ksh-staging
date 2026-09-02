export interface CertificationItem {
  /** Heading shown in the left column. Use "\n" to force a line break. */
  title: string;
  /** Main visual — swap for the real certificate/park image later. */
  image: string;
  /** Copy shown in the description card. */
  description: string;
  /** Short label used on the placeholder thumbnail badge — swap for the real logo later. */
  badgeLabel: string;
  /** Background colour for the placeholder thumbnail badge. */
  badgeColor: string;
  /** Optional real logo image for the thumbnail badge — falls back to badgeLabel text when unset. */
  badgeImage?: string;
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "IGBC-\nPLATINUM\nCertification",
    image: "/sustainability/edge2.webp",
    badgeLabel: "IGBC",
    badgeColor: "#1F6F54",
    description:
      "The Indian Green Building Council (IGBC)—an initiative of the Confederation of Indian Industry (CII)—envisions a sustainably built environment for all. At KSH INFRA, our Industrial Parks are designed and developed through a rigorous process of innovation and continuous improvement to achieve the IGBC Platinum  pre-certified—one of the world's most respected benchmarks for green infrastructure.",
  },
  {
    title: "EDGE\nCertification",
    image: "/sustainability/edgeW.webp",
    badgeLabel: "EDGE",
    badgeColor: "#1C7ED6",
    description:
      "Excellence in Design for Greater Efficiency (EDGE) is the global standard for green building certifications. Adopted in over 150 countries, EDGE ensures that Industrial real estate is resource efficient and sustainable. We are proud to have this badge of honour with KSH Chakan Park II being EDGE certified, reinforcing our commitment to creating a green Industrial future.",
  },
];
