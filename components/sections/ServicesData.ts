export interface ServiceItem {
  name: string;
  src: string;
  markers: { left: string; top: string }[];
  title: string;
  paras: string[];
  /** Matching section on the Solutions page (see solutionsData.ts ids). */
  href: string;
}

export const SERVICES: ServiceItem[] = [
  {
    name: "Land Acquisition",
    src: "/services/service1.jpg",
    markers: [
      { left: "36%", top: "60%" },
      { left: "79%", top: "54%" },
      { left: "24%", top: "75%" },
    ],
    title: "Identifying Strategic Opportunities",
    paras: [
      "We identify and secure locations with strong connectivity, market access and long-term development potential. Every opportunity is evaluated through a disciplined approach that supports future growth, operational efficiency and value creation.",
    ],
    href: "/solutions#solution-land-acquisition",
  },
  {
    name: "Capital Deployment",
    src: "/services/service2.jpg",
    markers: [],
    title: "Unlocking Development Capital",
    paras: [
      "We deploy capital strategically across the development lifecycle, combining financial discipline with market insight to transform opportunities into high-quality Industrial & Logistics assets.",
    ],
    href: "/solutions#solution-capital-deployment",
  },
  {
    name: "Project Development",
    src: "/services/service3.jpg",
    markers: [],
    title: "Creating Grade A Assets",
    paras: [
      "From planning and design to execution and delivery, we develop institutional-grade Industrial & Logistics infrastructure tailored to evolving occupier and investor requirements.",
    ],
    href: "/solutions#solution-project-development",
  },
  {
    name: "Leasing Management",
    src: "/services/service4.jpg",
    markers: [],
    title: "Driving Occupancy & Growth",
    paras: [
      "We connect businesses with the right infrastructure through flexible leasing solutions, helping occupiers scale efficiently while maximizing asset performance and long-term value.",
    ],
    href: "/solutions#solution-leasing-management",
  },
  {
    name: "Property Management",
    src: "/services/service5.jpg",
    markers: [],
    title: "Maximizing Asset Performance",
    paras: [
      "Our dedicated property management teams oversee the day-to-day operations of every asset, ensuring reliability, efficiency and a seamless experience for occupiers throughout the asset lifecycle.",
    ],
    href: "/solutions#solution-property-management",
  },
];
