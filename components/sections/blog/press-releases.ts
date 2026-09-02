export interface PressRelease {
  id: number;
  title: string;
  image: string;
  href: string;
  date: string;
}

// Real, currently-published press coverage — hand-maintained static list
// (press releases are external third-party articles, not WordPress content).
export const PRESS_RELEASES: PressRelease[] = [
  {
    id: 1,
    title: "KSH INFRA to Invest ₹550 Cr. in Tamil Nadu Park",
    image: "/press/press6.webp",
    href: "https://www.constructionworld.in/urban-infrastructure/warehouse-and-logistics/ksh-infra-to-invest-rs-5.5-billion-in-tamil-nadu-park/76359",
    date: "2025-07-17",
  },
  {
    id: 2,
    title: "KSH INFRA to invest ₹550 Cr. in second Industrial park in Tamil Nadu",
    image: "/press/press4.png",
    href: "https://manufacturing.economictimes.indiatimes.com/news/industry/ksh-infra-to-invest-550-crore-in-second-industrial-park-in-tamil-nadu/122437140",
    date: "2025-07-14",
  },
  {
    id: 3,
    title: "KSH INFRA to invest ₹550 Cr. in second Industrial & Logistics park in Sriperumbudur",
    image: "/press/press5.webp",
    href: "https://www.thehindubusinessline.com/companies/ksh-infra-to-invest-550-cr-in-second-industrial-logistics-park-in-sriperumbudur/article69807276.ece",
    date: "2025-07-13",
  },
  {
    id: 4,
    title: "KSH INFRA ₹1000 Cr. Expansion in Tamil Nadu Industrial & Logistics Space",
    image: "/press/press7.webp",
    href: "https://economictimes.indiatimes.com/industry/services/property-/-cstruction/ksh-infra-to-invest-over-rs-550-crore-in-60-acre-logistics-park-in-tamil-nadu/articleshow/122392746.cms?from=mdr",
    date: "2025-07-11",
  },
  {
    id: 5,
    title: "KSH INFRA to invest ₹450 Cr",
    image: "/press/press3.png",
    href: "https://realty.economictimes.indiatimes.com/news/allied-industries/ksh-infra-to-invest-rs-450-crore-to-develop-industrial-logistics-park-in-hosur/112523130",
    date: "2024-08-14",
  },
  {
    id: 6,
    title: "KSH INFRA To Invest Nearly $54 Mn",
    image: "/press/press2.png",
    href: "https://www.vccircle.com/kshinfra-to-invest-nearly-54-mn-in-south-india-logistics-park",
    date: "2024-08-14",
  },
  {
    id: 7,
    title: "KSH INFRA forays into South India",
    image: "/press/press1.png",
    href: "https://economictimes.indiatimes.com/industry/services/property-/-cstruction/ksh-infra-forays-into-south-india-plans-to-invest-rs-450-Cr.-on-hosur-logistics-park/articleshow/112503331.cms?from=mdr",
    date: "2024-08-13",
  },
];
