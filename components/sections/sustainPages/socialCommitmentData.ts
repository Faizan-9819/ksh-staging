export interface SocialCommitmentItem {
  /** Large numeral shown as a watermark on the image card, e.g. "01". */
  number: string;
  /** Title shown in the right-hand content column. */
  title: string;
  /** Person/portrait image — swap for real photography later. */
  image: string;
  /** Bullet points describing this initiative. */
  points: string[];
}

// Static copy — never animates, never changes with scroll.
export const SOCIAL_COMMITMENT_HEADING = "Social Commitment";
export const SOCIAL_COMMITMENT_PARAGRAPH =
  "We are consciously aware of the effects that large projects can have on the community. Our goal is to ensure that these effects are beneficial for the people living around us. KSH INFRA Parks designed to have a positive influence, and all projects adhere to the best practices for social responsibility.";

export const SOCIAL_COMMITMENT_ITEMS: SocialCommitmentItem[] = [
  {
    number: "01",
    title: "Employee Well-Being",
    image: "/sustainability/social/social0.png",
    points: [
      "Improved accessibility and personnel amenities to create a better, more comfortable experience for employees and visitors.",
      "Sustainable infrastructure designed to enhance workplace safety, efficiency, and overall employee satisfaction.",
    ],
  },
  {
    number: "02",
    title: "Community Engagement",
    image: "/sustainability/social/person1.png",
    points: [
      "Active collaboration with local communities to understand their needs and create shared, long-term value.",
      "Skill-development and livelihood programs designed to support employment opportunities in surrounding regions.",
    ],
  },
  {
    number: "03",
    title: "Workplace Safety",
    image: "/sustainability/social/soc3.png",
    points: [
      "Rigorous safety protocols and continuous training to protect every individual across our project sites.",
      "Proactive risk assessment and world-class safety infrastructure built into every stage of construction.",
    ],
  },
];
