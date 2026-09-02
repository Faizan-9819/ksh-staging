"use client";

import React from "react";
import Accordion from "../../Components/USPF/USPAccChennai";

const CharAcc = () => {
  const CardContent = [
    {
      title: "Strategic Port & Airport Connectivity",
      content:
        "Seamless access to Chennai's major ports and airport ensures efficient domestic and global supply chain movement, supporting export-driven and large-scale manufacturing operations.",
    },
    {
      title: "Established Manufacturing Hub",
      content:
        "Located in a thriving automotive, electronics, and engineering ecosystem with the presence of global OEMs and large multinational manufacturers.",
    },
    {
      title: "Part of the Chennai-Bengaluru Industrial Corridor",
      content:
        "Situated along one of India's most significant industrial growth corridors, driving sustained infrastructure development and long-term industrial expansion.",
    },
    {
      title: "Robust Industrial Infrastructure",
      content:
        "Grade A, compliant plug-and-play facilities supported by reliable utilities, wide internal roads, and future-ready industrial design.",
    },
    {
      title: "High Growth Potential with Cost Advantage",
      content:
        "Competitive land and operational costs combined with scalability make it an ideal long-term industrial investment destination.",
    },
    {
      title: "Ideal Industry Ecosystem",
      content: (
        <>
          <p>
            KSH Chennai Park I is designed to support high-performance
            industrial operations and is particularly suited for:
          </p>
          <ul className="list-disc pl-5 pt-3 space-y-2">
            <li>
              <span className="fsans-600">Manufacturing & Engineering:</span>{" "}
              Ideal for automotive components, industrial equipment, precision
              engineering, and export-oriented production.
            </li>
            <li>
              <span className="fsans-600">
                Telecommunications & Network Equipment:
              </span>{" "}
              Well-suited for telecom hardware assembly, network infrastructure
              equipment, and data connectivity solutions.
            </li>
            <li>
              <span className="fsans-600">
                Electronics & Electrical Manufacturing:
              </span>{" "}
              Supports consumer electronics, electronic components, EMS units,
              and high-value electrical equipment manufacturing.
            </li>
          </ul>
          <p className="pt-3">
            KSH Chennai Park I offers future-ready industrial infrastructure in
            a location designed for scale, speed, and sustained growth.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white uspcontainer w-full flex items-center justify-center flex-col overflow-hidden">
      <div className="flex flex-col max-w-[100vw] h-fit">
        <div className="relative z-10 pt-[50px] max-w-[1250px] w-[90%] mx-auto lg:pt-[92px] h-fit flex flex-col">
          <div className="overflow-x-hidden h-fit w-full">
            <div className="overflow-x-hidden h-fit whitespace-nowrap">
              <h2 className="md:text-[44px] text-[22px] leading-[111%] w-full pb-[10px] border-b xl:mb-[66px] mb-[36px] text-[#092241] border-[#d7d7d7]">
                Defining Characteristics of <br className="lg:hidden flex" />
                Chennai, Tamil Nadu
              </h2>
            </div>
          </div>
        </div>

        <div className="flex xl:flex-row flex-col-reverse md:p-0 px-5 pt-0 max-h-fit h-fit lg:gap-0 gap-5 relative">
          <div className="xl:flex hidden items-end lg:top-[10%] xl-1366:top-[5%] justify-center mt-0 xl:absolute relative lg:left-[-100px] xl-1366:left-[-150px] w-full lg:w-[800px] xl-1366:w-[875px] hidden">
            <img src="/ParkPage/chakan-1/parkinf.png" alt="Sus" className="" />
          </div>

          <div className="xl:w-full mx-auto flex flex-col h-fit max-w-full justify-center items-start gap-[33px] xl:pb-[110px] min-1280:pl-[540px] min-1366:pl-[600px] min-1440:pl-[665px] pb-14">
            <Accordion accw={90} acch={650} accordionData={CardContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharAcc;
