"use client";

import { PRESSABLE } from "@/lib/pressable";
import { useEffect, useState } from "react";
import Popup from "./popup";
import { FaLinkedinIn } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { stopLenis, startLenis } from "@/components/ui/LenisProvider";

// const teamMembers = [
//   {
//     name: "Kushal Hegde",
//     designation: "Chairman & Founder",
//     image: "/ourteam/team/mem1.png",
//     description:
//       "Kushal Subbayya Hegde, Chairman of KSH INFRA, is a pioneering entrepreneur whose vision laid the foundation for the KSH Group over five decades ago. Beginning with Kamal Motors in 1969, he expanded into diverse sectors including automotive distribution, manufacturing, and logistics. Under his leadership, the group evolved into a multifaceted enterprise, establishing ventures like KSH Logistics and KSH INFRA. His strategic foresight and commitment to excellence have been instrumental in the group's sustained growth and reputation for quality and innovation. Mr. Hegde's enduring legacy continues to inspire the organization's pursuit of excellence in Industrial & Logistics infrastructure development.",
//   },
//   {
//     name: "Rohit Hegde",
//     designation: "Managing Director",
//     image: "/ourteam/team/mem2.png",
//     linkedin:
//       "https://www.linkedin.com/in/rohit-hegde-79bab25?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAENVOcBEXKuJalMacOYRYklNSZ4cE9-iGY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BKYuyOIGKRJ6N4e%2BltiGjiw%3D%3D",
//     description:
//       "Rohit Hegde, Managing Director of KSH INFRA, is a visionary leader with deep expertise in real estate, infrastructure, and sustainable development. With a strong foundation in research, consulting, and strategic investment, he brings a sharp analytical mindset and a hands-on leadership style to the company. Known for his integrity, foresight, and commitment to excellence, Rohit has been instrumental in driving KSH INFRA’s growth across India. His passion for building future-ready, green infrastructure has positioned the brand as a trusted industry leader. Rohit’s people-first approach, combined with his strategic acumen, continues to inspire innovation and long-term value creation at KSH INFRA.",
//   },
//   {
//     name: "Rajesh Hegde",
//     designation: "Director",
//     image: "/ourteam/team/frame1.png",
//     linkedin:
//       "https://www.linkedin.com/in/rajesh-hegde-a067494a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAApuumYBGJQjl9SqpJN3OUwpSyB5MChkITU&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B8AF8aD4TSaaYeRCDLrxvXg%3D%3D",
//     description:
//       "Rajesh Hegde serves as the Managing Director of KSH International, a key entity within the KSH Group. With over 18 years of leadership experience, he has been instrumental in steering the group's diversified ventures, encompassing industrial infrastructure, logistics, and manufacturing. Rajesh's strategic vision and commitment to excellence have significantly contributed to the group's sustained growth and reputation for quality and innovation. His leadership continues to drive the organization's pursuit of excellence in Industrial & Logistics infrastructure development.",
//   },
//   {
//     name: "Sundaresan Vaidyanathan",
//     designation: "Chief Executive Officer",
//     image: "/ourteam/team/frame4.png",
//     linkedin: "https://www.linkedin.com/in/sundaresan-vaidyanathan-12b7912/",
//     description:
//       "Sundaresan Vaidyanathan serves as the Chief Executive Officer of KSH INFRA, where he leads the company's strategic expansion into India's Industrial & Logistics real estate sector. Under his guidance, KSH INFRA has embarked on significant projects, including a ₹450 Cr. investment in a 50-acre Industrial & Logistics park in Hosur, Bengaluru, marking the company's foray into South India. Vaidyanathan emphasizes a growth strategy focused on markets with substantial industrial demand, particularly in southern cities and Maharashtra. His leadership reflects a commitment to delivering top-tier industrial infrastructure that aligns with the evolving needs of clients. Additionally, he upholds KSH INFRA's core philosophy of 'Inspiring Green Development,' ensuring that sustainability remains central to the company's mission.",
//   },
//   {
//     name: "Shailesh Agrawal",
//     designation: "Chief Financial Officer",
//     image: "/ourteam/team/Shailesh.jpg",
//     linkedin: "https://www.linkedin.com/in/shaileshragrawal/",
//     description:
//       "Shailesh Agrawal leads Fund Management at KSH INFRA, where he is responsible for driving the company's investment strategy and building its institutional capital platform. With over 15 years of experience across fund management, private equity, and corporate strategy, he has held leadership roles at Welspun One and advised global investors through Bain & Company, Alvarez & Marsal, Tata Group, and Deloitte. An alumnus of IIT Madras and IIM Ahmedabad, Shailesh brings deep expertise in capital allocation, strategic investments, and value creation. His leadership is instrumental in advancing KSH INFRA's vision of developing sustainable, world-class Industrial & Logistics infrastructure across India.",
//   },
//   //
//   {
//     name: "Abhijit Pawar",
//     designation: "Chief Financial Officer",
//     image: "/ourteam/team/frame5.png",
//     linkedin:
//       "https://www.linkedin.com/in/abhijitpawar1977?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAGAuocBdNBcK398M4XPHdT7-MwI495Xrks&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BlYU9RloQSyym5rO9W6RmMA%3D%3D",
//     description:
//       "Abhijit Pawar serves as the Chief Financial Officer (CFO) of KSH INFRA, where he plays a pivotal role in steering the company's financial strategy and ensuring robust fiscal health. With a focus on sustainable growth, he oversees financial planning, risk management, and capital allocation, aligning them with KSH INFRA's expansion goals. His leadership is instrumental in managing large-scale investments, such as the ₹450 Cr. development of a 50-acre Industrial & Logistics park in Hosur, Bengaluru, marking the company's strategic entry into southern India. Abhijit's financial acumen supports KSH INFRA's commitment to delivering world-class, sustainable industrial infrastructure across key Indian markets.",
//   },
//   {
//     name: "Rushid Domadia",
//     designation: "Chief Operating Officer",
//     image: "/ourteam/team/frame6.png",
//     linkedin:
//       "https://www.linkedin.com/in/rushid-domadia-05808b215?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADZLYoQBZKPcUjunEJSZxGtp6FXQ51n0Fh8&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BAy3ENHBvTiu9rY13JZiZMQ%3D%3D",
//     description:
//       "As Chief Operating Officer (COO) of KSH INFRA, Rushid Domadia plays a pivotal role in driving operational excellence across the company’s Industrial & Logistics infrastructure portfolio. He leads cross-functional teams to ensure seamless execution of projects, from planning and design to delivery and asset management. With a focus on efficiency, quality, and sustainability, Rushid oversees day-to-day operations, ensuring that each development aligns with KSH INFRA’s commitment to building world-class, future-ready infrastructure. His hands-on leadership and strategic oversight are central to the company’s ability to scale efficiently across key markets in India.",
//   },
//   {
//     name: "Karan Domadia",
//     designation: "Chief Customer Officer",
//     image: "/ourteam/team/frame7.png",
//     linkedin:
//       "https://www.linkedin.com/in/karan-domadia-7237242a/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bt%2B3r1dmjTziW%2FlSLw7f37w%3D%3D",
//     description:
//       "Karan Domadia serves as the Chief Customer Officer (CCO) at KSH INFRA, where he plays a pivotal role in shaping the company's customer engagement and market expansion strategies. With a focus on building strong client relationships, Karan leads initiatives to enhance customer satisfaction and drive business growth. His leadership ensures that KSH INFRA's offerings align with market demands and client expectations, reinforcing the company's commitment to delivering top-tier Industrial & Logistics infrastructure solutions.",
//   },
//   {
//     name: "Akhilesh Ayyappan",
//     designation: "Principal Investments (South)",
//     image: "/ourteam/team/mem8.png",
//     linkedin: "https://www.linkedin.com/in/akhilesh-ayyappan-28309b8/",
//     description:
//       "Akhilesh Ayyappan serves as Principal – Investments (South) at KSH INFRA, where he leads the company’s investment and expansion strategy across southern India. With many years of experience in real estate acquisitions, private equity partnerships, and Business Development, Akhilesh has held key roles at Mahindra Lifespaces and IndoSpace, contributing to his deep understanding of diverse asset classes in Tier I and II markets. At KSH INFRA, he is instrumental in sourcing strategic land opportunities, structuring investment deals, and forging partnerships that align with the company’s growth objectives in the Industrial & Logistics infrastructure sector.",
//   },
//   {
//     name: "Kartik Shah",
//     designation: "Principal Investments (West)",
//     image: "/ourteam/team/frame9.png",
//     linkedin: "https://www.linkedin.com/in/kartik-shah-4b7b5b37/",
//     description:
//       "Kartik Shah serves as Principal – Investments (West) at KSH INFRA, leading the company's investment strategy across western India. With considerable years of experience in real estate investment management, particularly in warehousing and residential sectors, he brings a wealth of expertise to his role. Kartik's responsibilities include identifying strategic land acquisitions, structuring investment deals, and fostering partnerships that align with KSH INFRA's growth objectives. His leadership is instrumental in expanding the company's footprint in key markets, ensuring the delivery of high-quality Industrial & Logistics infrastructure solutions.",
//   },
// ];
//
//
const teamMembers = [
  {
    name: "Kushal Hegde",
    designation: "Chairman & Founder",
    image: "/ourteam/team/mem1.png",
    description:
      "Kushal Subbayya Hegde, Chairman of KSH INFRA, is a pioneering entrepreneur whose vision laid the foundation for the KSH Group over five decades ago. Beginning with Kamal Motors in 1969, he expanded into diverse sectors including automotive distribution, manufacturing, and Logistics. Under his leadership, the group evolved into a multifaceted enterprise, establishing ventures like KSH Logistics and KSH INFRA. His strategic foresight and commitment to excellence have been instrumental in the group's sustained growth and reputation for quality and innovation. Mr. Hegde's enduring legacy continues to inspire the organization's pursuit of excellence in Industrial & Logistics infrastructure development.",
  },
  {
    name: "Rohit Hegde",
    designation: "Managing Director",
    image: "/ourteam/team/mem2.png",
    linkedin:
      "https://www.linkedin.com/in/rohit-hegde-79bab25?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAENVOcBEXKuJalMacOYRYklNSZ4cE9-iGY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BKYuyOIGKRJ6N4e%2BltiGjiw%3D%3D",
    academics: [
      "Executive Masters in Change, System Psychodynamics - INSEAD",
      "MBA Finance – Sheffield Hallam University",
    ],
    description:
      "Rohit Hegde, Managing Director of KSH INFRA, is a visionary leader with deep expertise in real estate, infrastructure, and sustainable development. With a strong foundation in research, consulting, and strategic investment, he brings a sharp analytical mindset and a hands-on leadership style to the company. Known for his integrity, foresight, and commitment to excellence, Rohit has been instrumental in driving KSH INFRA’s growth across India. His passion for building future-ready, green infrastructure has positioned the brand as a trusted industry leader. Rohit’s people-first approach, combined with his strategic acumen, continues to inspire innovation and long-term value creation at KSH INFRA.",
  },
  {
    name: "Rajesh Hegde",
    designation: "Director",
    image: "/ourteam/team/frame1.png",
    linkedin:
      "https://www.linkedin.com/in/rajesh-hegde-a067494a?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAApuumYBGJQjl9SqpJN3OUwpSyB5MChkITU&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B8AF8aD4TSaaYeRCDLrxvXg%3D%3D",
    academics: [
      "Master of Science (MS) Manufacturing Systems Engineering – Oklahoma State University",
      "Bachelor of Science (BS) Mechanical Engineering – Michigan Technological University",
    ],
    description:
      // "Rajesh Hegde serves as the Managing Director of KSH International, a key entity within the KSH Group. With over 18 years of leadership experience, he has been instrumental in steering the group's diversified ventures, encompassing industrial infrastructure, logistics, and manufacturing. Rajesh's strategic vision and commitment to excellence have significantly contributed to the group's sustained growth and reputation for quality and innovation. His leadership continues to drive the organization's pursuit of excellence in Industrial & Logistics infrastructure development.",
      "Rajesh Kushal Hegde is Director at KSH INFRA. He is currently involved in strategy formulation and management functions. He holds a Bachelor’s Degree of Science in Mechanical Engineering from the Michigan Technological University, USA and a Master’s Degree in Manufacturing Systems Engineering from Oklahoma State University, USA. He has been associated with KSH Group since 1996 and has over 28 years of experience in the field of strategy and management.",
  },
  {
    name: "Sundaresan Vaidyanathan",
    designation: "Chief Executive Officer",
    image: "/ourteam/team/frame4.png",
    linkedin: "https://www.linkedin.com/in/sundaresan-vaidyanathan-12b7912/",
    academics: [
      "Global Program for Management Development 2016, Organizational Leadership – University of Michigan – Stephen M. Ross School of Business",
      "Masters in Business Administration, Finance and Marketing – IMI Delhi",
    ],
    description:
      "Sundaresan Vaidyanathan is the Chief Executive Officer of KSH INFRA, bringing over two decades of experience in real estate Investments, Land acquisition and Industrial Infrastructure development. Prior to joining KSH INFRA, he held senior leadership positions at Welspun One Logistics Parks, Mahindra Lifespaces and Tata Housing, where he played a key role in Investment Strategy, Platform expansion and the development of large-scale real estate projects across India.<br /><br />At KSH INFRA, Sundaresan leads the company's strategic growth and expansion, driving its transformation into an Integrated Industrial Infrastructure platform. He oversees Investment Strategy, Market Expansion, Institutional partnerships and Fund raising, while championing sustainable development and creating long-term value for stakeholders across KSH INFRA's Industrial and Logistics portfolio.",
  },
  {
    name: "Shailesh Agrawal",
    designation: "Head – Fund Management",
    image: "/ourteam/team/Shailesh.jpg",
    linkedin: "https://www.linkedin.com/in/shaileshragrawal/",
    academics: ["MBA – IIM Ahmedabad", "B.Tech. – IIT Madras"],
    description:
      "Shailesh R Agrawal leads Fund Management at KSH INFRA, where he is responsible for building the institutional investment platform and driving its investment strategy, capital allocation and value creation approach. He brings over 15 years of experience across fund management, private equity, corporate strategy and real estate, having held leadership roles at Welspun One and worked with leading global investors and businesses through Bain & Company, Alvarez & Marsal, Tata Group and Deloitte.<br /><br />An alumnus of IIM Ahmedabad and IIT Madras, Shailesh brings extensive experience across investment evaluation, capital deployment, portfolio strategy, fundraising and institutional partnerships. At KSH INFRA, he leads the development of strategic capital & investor partnerships, and deployment of capital into high-quality Industrial and Logistics infrastructure.<br /><br />He is instrumental in KSH INFRA's ambition to build a differentiated, institutionally managed investment platform focused on creating sustainable, Grade A Industrial and Logistics infrastructure across India's high-growth economic corridors.",
  },
  {
    name: "Abhijit Pawar",
    designation: "Chief Financial Officer",
    image: "/ourteam/team/frame5.png",
    linkedin:
      "https://www.linkedin.com/in/abhijitpawar1977?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAGAuocBdNBcK398M4XPHdT7-MwI495Xrks&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BlYU9RloQSyym5rO9W6RmMA%3D%3D",
    academics: [
      "Chartered Accountant - The Institute of Chartered Accountants of India",
      "PG CFO Program - IIM Indore",
    ],
    description:
      "Abhijit Pawar is the Chief Financial Officer of KSH INFRA, bringing extensive experience of over 25 years in corporate finance, financial strategy, risk management and capital planning. He has built deep expertise in driving financial discipline, supporting business growth and managing complex investment and financing initiatives across large-scale infrastructure and real estate developments.<br /><br />At KSH INFRA, Abhijit leads the company's financial strategy, overseeing financial planning, capital allocation, treasury, compliance and risk management to support long-term growth. His leadership ensures strong financial governance while enabling the successful execution of KSH INFRA's expanding Industrial and Logistics infrastructure platform.",
  },
  {
    name: "Rushid Domadia",
    designation: "Chief Operating Officer",
    image: "/ourteam/team/frame6.png",
    linkedin:
      "https://www.linkedin.com/in/rushid-domadia-05808b215?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADZLYoQBZKPcUjunEJSZxGtp6FXQ51n0Fh8&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BAy3ENHBvTiu9rY13JZiZMQ%3D%3D",
    academics: ["Diploma in Civil Engineering"],
    description:
      "Rushid Domadia is the Chief Operating Officer of KSH INFRA, bringing extensive experience in Industrial infrastructure development, project execution and operational management. He has developed strong expertise in leading large-scale developments, optimising operational performance and delivering high-quality Industrial and Logistics infrastructure with a focus on efficiency, quality and sustainability.<br /><br />At KSH INFRA, Rushid leads the company's operations across planning, project execution and asset delivery, ensuring seamless coordination across teams and projects. His leadership is instrumental in driving operational excellence, maintaining the highest execution standards and supporting KSH INFRA's continued expansion across India's Industrial and Logistics landscape.",
  },
  {
    name: "Karan Domadia",
    designation: "Chief Customer Officer",
    image: "/ourteam/team/frame7.png",
    linkedin:
      "https://www.linkedin.com/in/karan-domadia-7237242a/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bt%2B3r1dmjTziW%2FlSLw7f37w%3D%3D",
    academics: [
      "Masters in Construction Management – University of Salford",
      "Bachelors Civil Engineering – M.S. Ramaiah Institute of Technology",
    ],
    description:
      "Karan Domadia, Chief Customer Officer at KSH INFRA, brings over 13 years of deep-rooted experience within the organization, complemented by a strong academic foundation in Civil Engineering from Ramaiah Institute of Technology and a Master's degree in Construction Management from the University of Salford. His journey reflects a rare blend of technical expertise and market insight, enabling him to bridge the gap between infrastructure development and evolving occupier needs.<br /><br />At KSH INFRA, he plays a pivotal role as the Chief Customer Officer in shaping leasing & marketing strategies and leading customer relationships, with a sharp focus on delivering value-driven, future-ready solutions. His nuanced understanding of Industrial and Logistics ecosystems, combined with a customer-first approach, positions him at the forefront of building long-term partnerships and driving sustained growth.",
  },
  {
    name: "Akhilesh Ayyappan",
    designation: "Principal – Investments (South)",
    image: "/ourteam/team/mem8.png",
    linkedin: "https://www.linkedin.com/in/akhilesh-ayyappan-28309b8/",
    academics: [
      "PGD Advanced Construction Management - NICMAR University",
      "B. Tech in Civil Engineering – National Institute of Technology Calicut",
    ],
    description:
      "Akhilesh Ayyappan is a real estate investment professional with over two decades of experience identifying, evaluating and developing high-potential opportunities across India's real estate landscape. At KSH INFRA, he leads the company's investment strategy and growth across South India, with a focus on identifying markets with long-term potential, building strategic land and development partnerships, and converting opportunities into scalable investment platforms. His mandate spans the full investment journey—from market intelligence and relationship development to deal structuring, underwriting, due diligence, approvals and execution.<br /><br />Over the course of his career, Akhilesh has worked across the investment, acquisition and development ecosystem, including senior roles at IndoSpace and Mahindra Lifespaces. His experience encompasses private equity partnerships, strategic acquisitions, platform creation and market expansion across both established and emerging markets, giving him a broad perspective across the Industrial and Logistics real estate value chain.<br /><br />At KSH INFRA, he has been central to building the company's footprint in Chennai and Hosur and shaping its broader South India growth pipeline. His approach combines deep market understanding with disciplined investment thinking, with a focus on creating high-quality Industrial and Logistics assets that deliver long-term value.",
  },
  {
    name: "Kartik Shah",
    designation: "Principal – Investments (West)",
    image: "/ourteam/team/frame9.png",
    linkedin: "https://www.linkedin.com/in/kartik-shah-4b7b5b37/",
    academics: [
      "CA – The Institute of Chartered Accountants of India",
      "Bachelor of Commerce - Narsee Monjee College of Commerce and Economics",
    ],
    description:
      "Kartik Shah is Principal – Investments (West) at KSH INFRA with over 16 years of experience across real estate investment, capital deployment and strategic transaction. A Chartered Accountant by qualification, he has held investment and leadership roles with leading organisations institutional real estate platforms including Ascendas Firstspace (CapitaLand), Logos, IndoSpace and others.<br /><br />Over the course of his career, he has developing deep expertise across Industrial, Logistics and warehousing real estate, with a strong track record in land acquisitions, investments structuring, transaction execution and strategic partnerships. His experience spans the full investment lifecycle, from identifying and evaluating opportunities to structuring, diligence, negotiations and execution.<br /><br />At KSH INFRA, Kartik leads the investment strategy across western India, overseeing land acquisition, capital deployment and strategic partnerships across key Industrial and Logistics markets. He plays a key role in identifying high-growth opportunities and building the company's investment platform, with a focus on creating long-term value through disciplined capital allocation and strategic real estate investments.",
  },
];
export default function TeamSection() {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  useEffect(() => {
    if (!open) return;
    stopLenis();
    return () => startLenis();
  }, [open]);

  return (
    <section className="relative w-full bg-[#fafafa] py-16 lg:py-24">
      {/* Decorative Circles */}
      <div className="absolute left-[-250px] top-0 h-[500px] w-[500px] rounded-full border border-[#ececec]" />
      <div className="absolute left-[-180px] top-[420px] h-[380px] w-[380px] rounded-full border border-[#ececec]" />
      <div className="absolute bottom-[-120px] left-[-250px] h-[450px] w-[450px] rounded-full border border-[#ececec]" />

      <div className="fix relative z-10 flex flex-col gap-5 lg:flex-row">
        {/* Left */}
        <div className="lg:w-[40%]">
          <h2 className="text-[32px] font-semibold text-[#212121] lg:text-[40px]">
            Meet Our Team
          </h2>
        </div>

        {/* Right */}
        <div className="lg:w-[60%]">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[20px] transition-all duration-300"
              >
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    aria-label={`${member.name} on LinkedIn`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded bg-[#0069B7] text-white shadow hover:scale-110 transition-transform"
                  >
                    <FaLinkedinIn className="text-sm text-white" />
                  </a>
                )}

                {/* Image */}
                <div
                  {...PRESSABLE}
                  onClick={() => {
                    setSelectedMember(member);
                    setOpen(true);
                  }}
                  className="relative cursor-pointer overflow-hidden"
                >
                  {/*  */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`h-auto w-full transition-all duration-300 ${"group-hover:scale-105 group-hover:brightness-90"}`}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 flex flex-col rounded-tr-[20px] border border-white/10 bg-black/20 px-5 py-2.5 backdrop-blur-lg pointer-events-none">
                  <h3 className="text-[20px] font-medium text-white">
                    {member.name}
                  </h3>

                  <p className="text-[16px] text-white/80">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <Popup
            key="team-popup"
            open={open}
            onClose={() => setOpen(false)}
            member={selectedMember}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
