"use client";

import dynamic from "next/dynamic";

const ConnectMap = dynamic(() => import("./ConnectMap"), { ssr: false });

export default ConnectMap;
