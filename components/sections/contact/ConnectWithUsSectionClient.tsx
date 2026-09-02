"use client";

import dynamic from "next/dynamic";

const ConnectWithUsSection = dynamic(() => import("./ConnectWithUsSection"), {
  ssr: false,
});

export default ConnectWithUsSection;
