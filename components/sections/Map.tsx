"use client";

import { useRef, useState, useEffect, useLayoutEffect, memo } from "react";
import Link from "@/components/ui/Link";
import { motion, AnimatePresence } from "framer-motion";
import Btn from "../ui/Btn";
import SVGScroll from "@/components/mapcomponents/SVGScroll";
import NavArrow from "@/components/ui/NavArrow";
import {
  stopLenis,
  startLenis,
  lenisScrollTo,
  isScrollJumpInProgress,
} from "../ui/LenisProvider";
import { useNavbarVisibility } from "../ui/NavbarVisibilityContext";
//

const MH_PATH =
  "M519.1 446.9l1.3 0 1.5 0.4 2.3-0.1 0.9 0.4 0.9-0.2 1.4-0.6 1.6-0.2 0.3 0.1 1.6-0.4 0.8-0.9 0.4-0.6 0.6-1.2 0.8 0.2 0.7 0.5 0.3 1.1 0.4 0.2 0.1 0.8 0.3 0.3 0 0.9 0.6 0.7 0.8-0.7-0.1-0.8 0.3-0.3 0.5 0.2-0.3 0.5 0.7 0.2 0.1-0.4-0.3-0.6 1.3-0.2 1.1 0.4 0.3-0.1 0-0.7 0.6-0.1 0.7 1.3 0.2 0.6-0.1 0.4-0.8 0.3-0.2 0.4 0.2 0.5 0.6 0.1 0.4 0.5-0.1 0.6 0.3 0.4 0.7 0.3 0.5-0.1 0.4 0.7 0.8 0.2-0.2 0.9 1-0.2 0.3 0.9 0.8 0.6 0.6-1.4 0.2-1.3 0.6 0.1 0.6-0.3-0.2-0.4 0.4-0.5 0.7 0.4 0.5 0 1.1 0.2 0.3-0.6-0.1-0.5 0.4-0.8 0.7-0.5 0.5 0 0.5-0.7 1-0.2 0.1-0.4 1-0.2 0.4 0.4-0.2 1.2 1 0.4 0.5-0.2-0.1 1.2 0.6 0.9 0.1 0.6 0.6-0.1 0.6 0.2 0.6-0.2 0.6-1.1 1.1-0.3 0.6 0.3 0.5-0.7 0.1 0.9-0.2 0.6 0.7 0.2 0.6-0.9 0.9-0.2 0.6-0.4-0.5-1 1.4-0.3 0.6 0.1 0.8-0.8 0.8 0-0.1-0.7 0.5-0.3 0.6 0.2 1.7-0.3 0.6-0.3 0.8 0.2 1.7-0.4 0.3 0.6 0.8-0.1 0.2-0.5 0.7-0.5-0.2-0.5 0.4-0.6 0.6 0.2 0.3 0.3 1 0.2 0.6-0.1 0.2-1.1-0.4-0.9 0-0.8-0.3-0.3 0.9-0.2 0.7-1.1-0.1-0.8 0.2-0.8 0.3-0.1 0.4-1.1 0.8 0.3 0.3 0.4 1 0.1 0.4-0.4 1.4 0.3 0.9 1.4 1.1 0.6 0.5 0 0.2-0.5 0.6-0.1 0.2-0.4 1.1-0.4 0.5 0.8 1.1 0.5 0.5 0.9 0.3 0.9-0.4 1 0.2 0.9 0.7 0.4 0.4 0.5 1.3-0.2 0.1-0.7 0.8 0.8 1.3 0 0.7 0.4-0.4 0.5-0.1 0.7 0.3 0.8-0.5 0.9 0.2 0.6 0.5 0.5 0.9-0.1 0.6 0.8 0.7 0.5 0.4 0.6 0.9 0.4 0.4-0.3 0.1-0.5 0-0.8 0.6-0.1 0.1-0.5 0-1.3 0.4-1 0.5-0.6 0.6 0.1 0.2-0.8 0.8-0.4 0-0.4 0.5-0.4 1.2 1 0.6 0.2 1.4-0.5 0.4 0 0.4-0.4 0.2-0.7 1-0.1 0.4 0.7 0.1 0.9 0.8-0.1 0.4 0.5 0.6-0.5 0.9 0.7-0.3-1.3 1.1-1.3 0.8-0.1 1.2 0.8 1.1 0-0.2-0.5 0.3-1.4 0.5-0.8 0.3-0.9-0.2-0.6 0.3-0.4-0.1-0.6 0.3-0.6-0.5-0.3 0.8-1.2 1.2-0.4 0.2-0.7-0.2-1 0.1-2.2-0.2-0.6 0.9-1.6 0.3-0.1 0.6-0.7 0.6 0.1 0.2-0.4 0.5-0.1 0.3 0.3 0.6 0.1 0.2-1.3 0.2-0.5 0.5-2.2 1.2 0.5 0.2-0.5 0.4-0.1 1.8 0.9 0.4 0 0.1-1.4 0.6-0.7-0.4-0.9 0.9 0.1 0.3 0.3 0.4-0.4 0.2-1.1 0.5-0.1 1.1 0.7 0.6-0.1 0.7 0.2 0.8 0 0.3 0.2-0.1 0.6 0.5 0.3 0 0.5 2.1 0.3 0.1 0.8-0.5 2 0.1 1.6 0.5 0.7 1.2 0.6 0.8 0.5 1 1.3 0.1 0.4 1.5 1.5 0.3 0.3 0.1 0.9-0.2 0.4-1.5 0.8-0.4 0.4-0.9 2-0.4 0.4-0.9-0.1 0.6 0.8 1.7 0.5-0.1 1-0.3 0.3 0.7 0.5-0.3 1.5 0.2 0.6-0.5 0.4-0.1 0.5-0.6 0.1-0.5 0.3-0.6-0.3-0.4-0.5-0.4 0.4 0.2 1.4-0.1 0.8 0.5 0.7-0.8 1 0 0.7 0.3 0.3 0 0.5-1 1.5-0.2 0.9-0.8 0.5-0.4-0.1-0.2 0.7-0.6 0.6-1 0-0.2 1.1 0.9 0.1 0.7 1-0.2 0.7-1.3-0.1-0.4-0.3-1.3 0.1 0.2 0.4 0.5 0.5-0.7 0.2-0.3 0.5 0 0.6-0.8 0-0.5-0.5-0.7-0.4-0.2 1 0.5 0.1-0.4 0.9 0.4 0.2-0.2 0.7-0.8 0.3-0.6-0.2-0.2 0.4 0.5 0.3-0.6 0.5-1.3-0.7-0.9-0.3-0.5 0.5-0.6-0.3 0.4-0.8-1.6 0-0.8-0.3-0.3 0.5 0.4 0.8 0.6 0.4-0.3 0.4 0.9 0.4-0.2 0.7 0.2 1.3-0.7 0.5-0.2-0.8-0.4 0 0.1 1.3 0.2 0.5-0.3 0.4-0.7 0 0.1-0.9-0.8 0.4-0.2-0.4-1.4-0.3-0.1 0.5 0.6 0.7 0.4 0.2-0.5 0.8-1.2-0.2-1.3-0.5-0.6-0.6-0.9-0.5-1.1-0.3-0.5 0.6-0.5-0.3-0.1-0.4-0.8-0.4-0.5 0.5 0.1 0.6-0.5 0-0.4 0.7-0.7 0.3-0.5-0.1-0.1 0.5 0.5 0.6 0 1-0.3 0.1-0.4 1.2 0 0.4-1.5 0.3-0.1-0.5-0.6-0.1-1.7 0.4-1.6 0.6-1.7 1-1.3-0.2-1 0.1-1 1.3-0.7 0.2 0 0.3-0.7 0.9 0.3 0.6-0.3 0.3-0.1 1.5-0.7 0.1-0.7 0.5 0.3 0.5-0.3 0.2-0.5-0.3-0.1-0.3-0.9 0.1-0.6 0-0.1-0.6-0.5-0.1-0.7-0.5-1 0 0.4-0.9-0.3-0.6 0.2-0.8-0.4-0.5-1-0.1-0.8 0.1 0-0.3-0.9-0.1-0.8 0.6 0 0.3 0.6 1 0.3 0.9-0.6 0-2.3 1-0.8-0.5-0.9-0.1-0.4 0.7 0.1 1.3 0.4 0 0.5 0.9-0.8 0.4 0.1 1-0.3 0.8-0.7 0.7-0.2 0.5 0.2 2.2 0.6-0.1 0.6 0.6 0 0.5 0.6 0.3 0.4 0.5 0.8 0 0.2-0.2 0.8-0.3 1.5 0.1 0.4 0.4-0.2 0.5 1.4 0.7 0.6-0.1 0.6 0.4-0.1 0.5 0.7 0.7 0.4 0.8 0.7-0.1 0.4 0.7 1.3-0.1 0.5-0.4 1.4 0.6 0.8-0.2 0.6 0.1 0.3 0.5 0.6-0.6 1.3 0.3 1-0.1 0.4 0.7 0.6-0.5 0.1 0.6-0.6 0.5-0.5-0.1-0.3 0.4-0.5-0.3-0.3 0.4-0.6 0.1-0.1 0.4 0.8 0.5-0.3 0.5-0.1 0.7-0.4-0.1 0 1-0.3 0.6-0.2 0.9 1.1 0.5 0.7 1.1 1.9 0.4 0.8 0.6 1.1 0.5 0.5 0.5-0.1 1.7 0.4 0.2 0.1 0.5 0.6 0.1 0.9-0.3 1.3 0.2 0.3 0.7 0.5 0.2 0.2 0.7-0.1 1.4-0.9-0.2-0.3 0.3 0.6 1.4 1.1 0.2 1 0.6 0 0.8-0.4 0.8 0 0.5 1.2 0.8 0.5 0.5-0.1 0.9-1-0.3-0.8 0-0.7 0.3 0.4 0.4-0.5 0.6-1.2 0.3-0.7-0.3-1.1-0.1-0.3-0.5-0.6 0-0.1-0.7-0.8-0.4-0.7-0.2-0.3-0.5-0.7 0.1-0.8-0.2 0-0.5-0.5-0.2-0.2-0.5-1.1 0.6-0.6-0.1-0.3 0.6-1.4-1-0.6-0.2-0.4-0.6-0.4-0.2-0.2-0.5-0.8-1.1-0.2-0.6-0.4 0.2-1.2-0.3-0.5-0.6-1.6-0.3-1.2-0.3-0.9-1.6-0.8-0.6-0.6 0.6 0.3 0.3-0.9 0.8-0.7 0.2-0.1 0.5-0.3 0.8 1 1 0.5 0 0.3 1.2-0.1 0.6-0.7 0.7 0.8 0.3-0.4 0.4 0.3 0.3-0.9 1.1-0.4 0.7 0.6 0.8 0.7 0.5 0.3 0.4-0.9 1.6 0.2 0.6-0.6 0.8-0.1 0.4-0.9 1.5-0.4 0-0.5 0.5-0.5 0.7-1.4 0.1-1.6-0.1-0.6-0.3-0.1-0.5 0.6-0.9-0.2-0.4 0.4-0.8 0.8 0.2 0.4-0.2-0.8-1-0.3 0.3-0.9 0.5-0.3 0.4-0.7 0.4-0.9 0.1-0.2 0.2-1-1.3-0.4 0.3-1.1 0.2-0.2-0.2-1.3-0.4-0.8-0.5-0.5-0.1-0.8-0.6-1.3-0.6-1.3 0 0 0.9-1.1 0-1.3 1.3-0.9 2-0.3 0.4-0.5-0.3-0.1-1-1.9-0.9-0.6 0.2-0.5-0.5 0-0.3-0.8-0.4-0.7-0.1-0.7 0.3-0.5 0.6-0.4 0.1-0.2-0.4 1.2-0.6 0.2-0.7-0.1-0.5 0.6-0.8-0.1-0.2 0.7-1.3 0.1-0.6-0.1-0.6 0.9-0.6 0.3-0.7-0.8-0.1 0.2-0.7-0.5-0.2 0.2-0.9-0.2-1-0.3-0.3-0.2-0.6 0.4-0.4 0.1-0.5-0.6-0.2-2.5 1.1-0.2-0.3-1 0.6-0.3 0.4-0.7 0.1-0.1-0.8-1.1 0.5-0.7-0.2-0.3-0.3-1.3 0-0.3 0.8-2.2 0.1-0.8-0.5-1.7 0.2-0.7 0.2-1.2 0-0.7 0.4-0.1 0.6-0.7 0.1-0.5 0.4-0.1 0.4-0.8 0.2-0.6-0.1-1.3 0.3-1 0-0.6-0.3-0.6-0.7-1.4 0-0.3-0.3-0.8-0.5-0.5-0.6-0.1-0.8 0.1-0.6-0.8-0.2-0.7-0.5-0.6-0.6-1.5-0.3-0.1-0.6 0.1-0.8 0.5-0.6 0.7-0.2 0.9-1.2 1.9 0 0.8-0.4 0.5-0.4 0.5-0.1 0.4-0.7-0.1-1.4 0.9-0.8 0.7 0 0.1-0.7 0.6-0.4 0.2-0.5 0.1-0.9 0.2-0.4 0.8 0 0.5-0.4 0-0.7 0.3-1.2-0.3-0.4-0.2-0.7-1-0.1-0.7 0.3-0.8 0.2-0.3-0.5-0.4 0.2-0.4-0.2-0.6 0.1-0.5-0.8 0.1-0.4-0.6-0.2-0.3 0.8 0 0.7-0.6 0.2-0.1-0.7-0.5-1.2 0.2-1-0.2-0.7-0.3 0-0.7-0.7-0.6 0.1-0.9-0.9-0.1-0.5 0.4-0.9 0.3-0.4-0.1-1.3 0.3-1.5-0.1-0.5 0.3-0.7-0.5-0.6-0.2-0.7-0.6 0-0.4 0.7-0.7-0.2-0.4-0.5 0-0.5 0.3-1-0.2-0.7 0.7-1.3 0.3-0.2 0.4-1.3 0.1-0.7-0.2-1-0.5-0.6-0.7-0.3-1 0.2-0.2 0.9 0.1 0.9-3.1-0.7-0.4 0.1-0.9-0.5-0.3-0.7-0.4-0.1 0.1-0.7-1-1 0.4-0.6 0-1.5-0.5-0.6 0-0.5-0.5-0.5 0-0.4-0.6 0-0.4-0.2 0-0.5-1.6-0.3-0.5-0.2-0.3-0.9-0.6-0.1-0.3-0.6 0.1-0.6-0.8-1-0.1-1 0.1-0.7-0.9-0.4-0.8-0.2-0.4-0.3-0.2-0.9-0.7 0.1-0.5-0.6-1 0.1-0.6-0.1 0.7-0.8 0.2-0.9 0.6-1.3-0.1-0.9 0.7-1.1-0.1-0.8-0.6-0.6 0.7-0.7 0.9-0.3 0.2-0.8-0.3-0.9-0.9-0.2 0.1-0.8-0.6-0.6 0.4-0.7 0-0.6 0.9-0.4 1.9-0.4z";

const KA_PATH =
  "M356.3 630.4l0.6 0 0.8 0.4-0.8 1 0.4 0.7-0.5 0.8 0.3 0.8 0.5 0.3-0.1 0.7 0.2 0.8-0.1 0.5-0.8 0.2-0.6 0.6 0.2 0.6 1.4 0.5 0.7 0.7 0.4 0 0.2 0.7-0.2 0.6-0.7 0.1-0.1 1.2-0.8-0.2 0.2 0.8-0.7 0.4-0.1 0.7-0.3 0.4-0.8 0.1 0 0.4-0.4 0.3-0.2 0.5 0.6 0.1 0.8 0.5 0.2 0.5-0.6 0.6-0.3-0.1-0.9 0.3-0.2 0.3-0.8 0.2-0.4 1.2 0.2 0.8-0.3 0.8 0 0.6 0.6 0.1 0.3 0.4 0.5-0.1 0.3 0.8 0.7-1 0.6 0.7 1-0.2 0.1 0.7 0.8 0.3 1 0 0.9 0.7-0.1 0.7-1-0.2-0.4 0.2-0.6 0.1 0 0.8-0.4 0-0.7-0.3 0 0.7-1.1-0.4-0.6 0.4 0 0.5 0.6 0.4-0.3 0.3 0 0.7-1 0.2-0.2-0.4-0.7 0 0.1 0.7-0.2 0.9-0.4 0.7 0.6 0.4-2 1.6 0.3 0.2 0 0.6-0.6 0-0.3 0.9 0.4 0.6 0.8 0.5 1.6 0.5-0.1 0.3 0.5 0.5 0 0.4 0.4 0.8 0.2 0.8-0.6 0.5 0.1 0.6-0.5 0.4 0.1 1.1-0.3 0.2 0.1 1.8-0.1 0.6 0.5 0.8-0.2 0.6-0.8-0.1 0 0.5-0.4 1.4 1.3 0.1-0.1 0.9-1.4 0.4 0.5 0.7 0.8-0.3 0.2 0.2-0.4 1 0 0.8-0.5 0-0.4 0.4-0.8 0 0.2 0.5 0.4 0.1 0 0.8-0.9 0.2-0.4 0.2 0 0.5-1.2 0.1-0.7-0.3-0.2 0.5-1.1 0.2 0.4 1.1 0.5 0.7 1.3 0.5 0.6 0.3 0.6-0.1 1 0.5 0.7-0.3 1.2-0.1 1 0.2 0.5 0.5 1.3 0.7 0.2 0.4-0.3 0.8-0.4-0.3-0.6 0.3-0.5 0.5-0.6 0-0.4 0.5 0.2 1.1 0 0.7-0.3 0.8 0.1 1.2 0.3 0.6 0.1 0.7-0.3 1.2 0.3 0.7 0.2 0.1-0.1 0.8 0.2 0.3-0.1 1.2-1.2-0.2-1.1-0.4-0.5 0.2-0.9 0-0.6-0.3-1.9-0.1-0.9-0.3-0.4 0.2-1.5 0.1-1 0.2-0.4 0.3-0.7 0.2-0.8 0.4-1.2 1.6-0.1 0.8 1 0.1-0.1 1.2-0.4 0.8 0 0.8 0.8 0.1 0.2 0.3-0.2 0.5 0.7 0.4 0.7 0.5-0.3 1-0.9-0.8-0.4 0.4-1.1 0.3 0 0.9-0.1 0.6 0.1 1.4 0 0.8-0.9 0-0.6-0.2-0.1 0.4 0.7 0.7 0.3 0.5 0.6 0.4 0 1 0.4 0.5-0.1 0.7 0.7 0.6 0.1 0.5 1.1-0.2 0.2 1 0.9 0.1 0 0.5 0.5 0.5-0.7 0-0.6 0.9 0.6 0.1 0.5 0.7 0.1 0.7-0.1 0.5-0.6 0-0.1 0.4 0.5 0.1-0.1 0.7-0.6 0.4 0 0.7-0.5 1.1-0.7 0.2-0.1 0.7-1-0.2 0.1-0.7-1.2 0-1 0.5-0.4-0.3-1-0.2-1 0-0.5-0.8-0.6-0.4-0.5-0.1-0.6-0.4-0.7 0.7 0 0.3 0.3 1.1-0.7 0.9 0.2 0.4 0.9 0.2 0.5 0 0.3 0.3 0.4-0.2 0.6-0.1 0.1 0.7-0.2 1.3-0.4 0.1 0.2 0.7-0.1 0.7-0.2 0.3-0.2 1.2-1.5 0.2 0.5 1.3-0.7 1.7-0.3 2.2 0.5 0.5 0.2 0.7 0.4 0.7 1.2 0.5 0.5 1 0.5 0.1 0.7-0.3 1.8 0.1-0.4 1-0.4 0-0.1 1.2-0.7-0.3-0.5 0.5-0.4 0.1-0.1 1.1 0.6 0.9 1.2 0.4 0 0.7-0.5 0.2 0.3 1 0.4 0.1 0.9-0.1 0.5 0.2 0.8-0.3 0.5 0.1 0.7 0.8 0.5 0 0.4-0.3 0.2-1-0.2-0.2 0.1-0.7 0.4-0.4 0.1-0.8 0.6-0.2 1.2 0.7 1.3-0.1 0.4-0.3 0.6-0.1 0 1.5 2.2 0.2-0.1 1.1 0.5 0.4 0.2 0.7 0.9-0.3-0.4-1.6-0.3 0-0.4-1 0.1-0.6 0.4-0.4 0.9 0.3 0.4 0.3 0.1 0.9 0.3 0.1 0.7-0.3 0.5 0.7-0.2 0.9 0.5 1.6-0.3 0.6-1-0.4-2 0-0.3 1-0.8 0.1 0.1 0.6 1-0.4 0.2 0.4-0.5 0.4-0.2 0.5-0.6 0.5-0.3 0-0.3 0.9 1 0.2 0.5 0.2-0.2 0.7 0.3 0.3 0.9-0.1 0.3 0.2 0 0.7-0.6 0.2 0.3 1.2-0.6 0.4-0.2-0.5-1.1 0-0.2-0.4 0.6-0.8-0.6-0.3 0.3-0.9-0.5-0.1-0.6-1.1-0.3 0-0.6 0.5-0.2-0.6-0.8 0.7-0.7-0.1-0.6 0.1-0.7-0.1-0.4 0.5-0.6-0.2-0.3-1.3-0.9 0.2-0.6-0.3-1.2-0.2 0-0.8-0.4-0.3 0.2-0.4-0.1-0.6 0.2-1.2-1.7-0.1-0.5-0.4-0.1 0.6-0.5 0.3-0.7-0.1-0.2 0.8 0.7 0.3 0.3-0.2 0.6 0.5 0.2 0.7 0.5 0.2 0.1 0.8-1 0.1-0.1 0.7 0.4 0.4 0.8 0.3 0.5 0.5-0.2 0.7 0.6 0.2 0.7 0.6 0.2 0.8-0.7 0.1-0.3 1.3-1 1.1 0.4 0.2-0.1 0.5 0.3 1.2 0.5 0.3 0.3-1.1 0.4 0 0.7 0.9 0.5 0 0-0.4 0.4-0.2 0.8 0.3 1.2-0.2 0.1-0.4-0.4-0.8 0.2-0.5-0.5-0.5-0.5-0.2 0.4-0.5 0.7-0.2-0.3-0.9 0.6-0.5 0.1 0.4-0.2 1.1 0.5 0.2 0.9-1.1 0.4 0 0.3 1.6 1-0.2 0.5-0.3 0.4 0.8 0.9-0.5 0.5 0.4 1.5 0.1-0.5 0.8 0.6 0.3 0.3-0.4 0.3 0.5 0.3 1.2-0.2 0.8-0.3 0.5 0.2 0.6 0.7-0.1 0.2-0.2-0.1-0.5 0.6 0 0.1 0.4 0.4 0 0.2-0.5-0.2-1 0.5 0 0.2 0.6 1-0.3 0.3-0.3 0.6 0.4 0-0.9 0.9-0.4 0.6-0.1-0.1 0.7 0.8-0.2 0.4 0.6 0.1-1.5 0.4-0.3 1.1-0.2 0.1-0.6 0.8-0.3 0.7-0.5-0.2-0.8-0.3-0.2-0.1-0.6 0.2-0.4 1.3 0.1 0.7-0.1 0.1 0.5 0.6 0.4 1.1-0.8 0.3-0.7 0.4 0.1-0.1 0.7 0.1 0.8-0.8 0.3-0.2 0.4 0.2 1.3 0.5 0.1 0.5-1.2 1.5 0.3 0-1 0.9 0.4 0.1 0.5 0.8 0.1 0.3 0.9-0.2 0.5 0.3 0.7-0.2 0.4-0.8 0.8 0.7 0.7-0.1 0.7-0.6 0.1-0.5-0.2 0 0.7 0.4 0.4 0 0.4 0.8-0.3 1-0.1 0.4 0.1 0 0.6 0.9 0.3 0 0.6-0.4 0.4 0.3 0.6 0.5-0.7 0.5-0.1 0.7 0.3 1.7-0.2 0.8 0.1 1-0.1 0.5 0.5-0.3 0.9-0.5 1.1-0.2 1.2 0.3 1.7-0.5 1 1.2 0.6-0.2 0.8 0.7-0.3 0.4 0 0.2 0.5 0.8-0.3 0.1 0.4 0.8 0.5 0.6 0.6 0.2-0.6 1 0.1 0.3 0.3-0.5 0.8-0.1 1.3 0.4 0.9-0.8 0.1-0.1 0.6-0.8 0.3 0.2 0.6 0 0.4-0.4 0.4 0.1 0.5-1 0.3-0.4 0.3-0.1 0.5 0.3 1 0 0.4-1-0.1 0 1.2 0.9 0.9 0 0.7-0.5-0.3-0.1-0.6-0.5 0.3-0.4-0.1-0.4-0.4-0.2 0.3-0.9-0.9-0.5 1.1-0.3-0.1-0.4 0.8 0 0.5-0.7-0.1-0.4-0.2-0.6 0.3 0 1-0.3 1.4-0.2 0.2-1.5-0.3-0.3 0.1-1-0.3-0.2-0.4-0.7-0.5-0.6-0.7-1.2-0.4-0.8 0.8 0.3 0.5-0.6 0 0-0.4-0.6-0.7-0.5 0.2-0.2 0.4-0.7-0.2 0.2-0.6 0.3-0.2-0.3-0.7-0.8 0.2-0.1 0.3-1.6-0.1-0.1 0.3-1 0.6 0.5 0.2-0.4 1.1-0.4 0.6 0.3 0.4-0.2 0.4-0.5 0.1 0.1 0.4-0.3 0.8-0.7 0.1-0.2 0.6-0.4-0.4-0.2 0.7-0.8 0 0.1-0.6-0.4-0.1-1.8 0.5-0.1 0.4 0.3 0.6-0.4 0.5 0 0.6-0.4 0.7 0.3 1.4 0.7 0.1-0.1 0.4-0.7 0.6 0.6 0.1 0.5-0.6 0.3 0.3-0.3 2-0.3 1.4-1 0.8-0.3 0.8-0.4 0.4-0.5 0.1-0.2 0.3-0.7-0.1-0.6 0.3-0.2 0.7 0.3 0.3-0.2 0.7 0.4 0.3 0.8 0.2 0.8-0.3 0.5 0.2 1.3-0.2 0.7 0.2 0.7 0 1.9 0.5 0.4 0.6 0 0.5 0.7 0.6-0.5 1.1-0.7 0.4-0.9 1.3-0.7 1.5 0 0.4-0.7 0-1.8 0.5-0.7-0.2-0.6 0.2-0.9-0.2-0.4 1.1-0.6 0 0 1.4-0.7 1.9-0.5 0.3-0.8-0.4-0.7-0.1-0.3 0.4-0.5 0.2-1.2-1.1-0.1 0.2-1-0.3-0.4 0.5-1.1 0-0.6 0.2-0.8 0.1-0.6 0.3-0.5 1.1-0.6 0-0.7-1 0.3-0.4-0.5-0.1-0.5-0.5-0.5-0.3-0.9 0.4-0.4 0.7-0.4-0.5-1.2 0-0.3 0.5-0.2 1.1-0.8 0.8-0.6 1.3 0 0.6 0.6 0.8-0.5 0.5-0.5-0.4-1.8-0.3-3.4 0.1-0.5 0.1-1.5-0.3-0.3-1.7-1-0.7-0.9 0.5-0.6 0.7-0.7-0.1-0.4-0.2-0.2-0.5 0-0.7 0.4-0.4-0.4-0.8-0.8 0.4-0.5-0.1-0.6 0.3-0.6-0.4-0.3-0.9-0.5-0.3-0.2-0.4-0.8 0.2-0.8-0.2-0.3-0.5-0.1-0.8-0.5-0.5-1.2 0.2-0.4 0.4-0.5-0.2 0-3.3-0.4 0.2-0.5 0-1.2 0.8-0.7 0-0.2 0.3-0.6-0.1-0.8-0.2-0.4 0.1-1.5-0.3-0.7-0.5-0.2-0.3-0.5-0.4 0-0.6-0.7-0.7-0.1-1.2-0.9-0.2-1.3 0.5-0.1-0.2-0.2-0.4-0.1-0.1-0.3-0.4-0.5 0.3-0.3 0-0.5-0.8 0-0.3-0.2-0.3-0.2 0-0.1-0.1-0.5-0.1-0.3 0.1-0.1 0-0.3-0.2-0.5-0.4-0.3-0.5-0.2-0.2-0.1-0.1-0.2-0.1 0.1-0.3-0.3-0.3-0.1-0.3-0.1-0.1 0-0.1-0.2-0.4 0-0.1-0.2-0.2-0.3-0.1-0.3-0.6-0.4-0.2-0.7 0.1-0.3 0-0.3 0.1 0.3-0.4-0.2-0.2-0.4-0.8 0.1-0.2 0.2-0.5-0.1-0.2-0.4-0.1 0-0.1-0.2-0.1-0.5-0.2-0.3-0.6 0.1-1.1-0.1-0.1 0.7 0.2 0.3-0.1 0.3-0.2 0.3-0.3-0.3-0.9-0.3 0.2-0.1-0.2-0.3 0.1-0.2 0.1-0.1 0.1-0.1 0.3-0.5 0.5-0.4 0.1 0-0.3-0.1-0.6-0.4-0.1-0.5-0.2 0-0.6-0.6 0-0.3-1 0.6-0.6 0.6 0.2-0.4-0.9-0.6-0.3-1.1 1.3-0.7-0.2-0.1-0.7-0.3-0.3 0.1-0.5-0.5-0.1-0.4 0.4-0.4-0.1-0.1-0.7 0.3-0.6-0.5-0.2-0.8-0.1-0.3-0.5-0.5 0.1 0 0.7-0.4 0.2-0.6-0.1-0.1-0.7 0.3 0-0.2-0.8-0.3-0.1-0.9 0.1-0.3-0.7 0.4-0.6-0.1-0.7-0.9 0.4-0.5-0.2-1.6 0.6-0.3 0.2-0.5-0.1-0.6-1.2-0.4-1.4-0.2-0.2-0.4-1.8-0.3-1.6-0.5-2.2 0.1-0.3-0.3-0.9-0.3-1.5-0.7-2.5-0.3-1.2 0-0.6-0.2-0.9-0.5-0.5-0.1-2.9-0.1-0.2-0.2-2.5-0.6-3-0.3-0.3-0.2-0.7-0.4-2.6-0.5-2.2-0.4-0.7-0.1-0.5-0.7-1.2-0.4 0-1-1.1-0.4-1 0-0.8-0.3-1-0.4-2.3-0.2-0.8-0.4-0.2-1.1-3.2-0.2-1.6-0.3-1.3-1-2.3 0.1-0.6 0.6-0.4-0.4-0.6-0.5 0.4 0.1 0.6-1 0.1-0.2-1-1-2.1 0.3-0.1-0.2-0.8 0.1-0.5-0.9-1.8-1.5 0.2-0.4-0.5-0.5-0.1-0.5-0.7-0.9-0.1-0.5-0.6 1-0.3-0.1-0.6-0.7-1.3 0.2-0.6 0.8-0.4 0.3 0 0.8 0.2 0-0.2-0.3-0.6 0.1-0.1 0.1-0.2 0.4-0.1 0.3 0.3 0.2 0.1 0 0.3 0.4-0.1 0.6-0.4 0.1-0.3 0.2-0.1 0.3 0.1 0.1-0.3 0.2-0.2-0.1-0.7 0.3-0.5 0.2-0.2 0-0.2 0.4-0.3-0.4-0.8-0.2-0.9 0.3-0.6-0.1-0.6 0.6-0.5 0.3-0.7-0.5-1.2-1.1-0.4 0.4-0.9 0.7-0.4 0.9 0.1 0.2-0.3-0.5-1 0.1-1.1-0.6-0.3-0.5-0.1-0.4-1.2 0.2-0.5-0.7-1.3 0.7-0.7 0.2-0.4-0.4-0.8-0.5-0.3 0.3-0.7 0-0.8-0.2-0.2-0.1-0.8-0.7-0.4-0.2 0.5-0.7-0.4-0.6-0.2 0 0.5-0.9 0.2-0.4-0.1-0.8-0.5 1-0.3 0.2-0.6-0.2-0.7 0.7-0.3 0.2-0.4 0.8-0.1 0.4-0.2 0.2-0.6 0.6 0-0.2 0.6 0.3 0.4 0.8-0.2 0.5 0.4 0.9-0.5 0.1-0.4 0.6 0.2 0.4-0.3 0.3-0.7-0.2-0.4 0.5-1-0.9 0 0-0.4 0.4-0.4 0.8 0-0.2-0.7 1.2-1.5 0.4-0.9 0-0.4 0.4-0.7 0.1-0.7-0.7-0.3-0.8 0.2-0.6 0.4-0.5-0.7 0.9-0.9 0.8-0.5 0.8 0.2 0.7 0.5 0.2-0.8-0.2-0.8 0.2-1.1 0.4-0.2-0.2-0.7 0.1-0.3-0.6-0.7-1.7-0.3-0.1-0.7-0.8 0.2-0.3-0.5-0.5 0.2-0.7 0.6-0.2-0.4 0.6-0.4-0.4-1.4-0.3-0.3 0.3-1 0.3-0.1 0.1 0.7 0.5-0.7-0.1-0.4-0.6 0.1-0.1-1.5-0.5 0.1-0.7-0.7 0.1-0.8-0.3 0-0.5 0.8-0.2-0.7 0.7-0.2-0.3-0.4 0-0.7 0.8 0.4 0.7-0.7 1.5 0.8 0.2-0.2 0-0.7 0.2-0.6 0.7-0.1 0.4-0.4 0.8-0.2-0.2-0.8 0-0.6 0.4-0.2 0.5 0.9 1.5-0.1 0 1.1 0.4 0.1-0.2 0.9 0.4 0.2 1.2-0.5 0.6-0.4 0.1-0.6 0.6 0.1 0.8-0.4-0.9-0.6 0.3-0.8 0.7-0.3 0-1.2 1.1 0 1.1-0.9 2-0.4 0.1-0.3 1.9 0.1-0.2-0.5-0.1-2 1-0.7 0.4 0.1 0.1-0.8-0.4 0-0.7-0.6 0.3-0.4 0.4 0.3 0.4-0.2 0.5 0.2 0.5-0.5 1.2 0.2 1.3-0.2 0 0.7 0.3 0.4 0.9 0.4 0 0.6 0.9 0.3 0.6-0.2-0.3 0.8 1.3 0 0.3-0.6 0.7 0.1 0.4-0.4 0.3-0.8-0.2-0.2 0-1.3 1.6 0 0.8-0.4 0.6-0.2 1 0.3 0.3-0.4 0.7-0.2 0.6 0.6 0.1 0.6 0.6-0.2 0.4-0.4 1.1 0 0-1.2 1.1 0.1 0 1 0.7 0.1 0.2 0.4 1-0.4-0.3-0.5 0.1-1.5-0.5 0.1-0.2-0.4 0.9-0.8-0.2-1.2-0.5 0 0-0.5-0.6-0.8-0.1-0.7 1-0.8-0.2-1.7-0.7 0-0.2-0.6-0.5-0.3 0.2-0.7 0-0.4-0.8-0.3-0.2-0.9 1-0.2 0-0.9 0.3-1 0.3-0.6 0.7 0.5 0.5 0.2 0 0.5 0.3 0.7 0.5 0.1 0.8-0.4 0.9 0.4 0.3 0.8 0.8 0.3 0.3-1.4 0.4-0.1 0.5 0.4 0.1 0.5 1-0.4-0.1 1.5 0.5 0.2 0.6 0.6 1.1-0.4 0.8 0 0.4-0.4 1.3 0 0.4 0.6 0.7-0.9 0.5-0.1 0.4 0.4 0.7 0.3 0 1.2 0.5-0.4-0.2-1 0.3-0.2 1.2-0.2 1.2 0.2 0.1 0.7 1.1 0-0.1-0.4 0.9-0.1 0.2 1.1 0.8 0 0.3-0.8 0.5-0.3-0.1-0.6-1.2-0.2 0.3-1.7-1.1 0.1-0.1-1.1 0.5 0 0.7-0.4-0.2-0.3-0.6 0.1 0-0.6 0.6-0.1-0.2-0.6-0.5-0.2-0.3-1.5 2.3-0.2 0.4-1.2 0.6-0.3 1.1-0.2-0.2-0.2 0.1-1.3 1 0 0-1.3 1-0.1 0.2 0.7 0 1 0.5-0.1 0.4-0.6 0.1-0.8 0.6 0 0.1 0.8 0.7 0.3 0.2 0.9 0.8 0.2 0-0.7 0.7-1.3 0.1-1 0.5 0.1 0.6-0.2 0.4-0.4 0.3-0.7-0.6-0.7-0.8-0.2 0.1-1.2 0.7 0 0.3 0.6 0.7 0.3 0.2-0.5 1.2-0.4 0.8 0.2 0.5-0.7 0.4 0 0-0.6 0.1-1.4 0-1.4 0.9-0.1 0-1.3 0.5-0.4-0.4-0.4-0.9-0.2 0.6-1.1 0.3-0.8 1-0.1 0.2 0.6 0.7 0.1 0.2-0.6 0.5 0.3 0.2 0.6 1.4 0 0.2-0.4-0.5-0.8 0.6-0.4 0.6 0 0.4-1.3 0.6-0.8 0.8 0.1-0.3-1 0.4-0.1 0.5-0.9 0.1-1.1 0.2-0.7 2-0.9 0.4-0.4 0.4 0.7 0.3-0.6 0.3 0.6 0.2 0.8 0.8 0.1 0.2 0.6-0.4 0.3 0 0.8-0.7 0.5-0.1 0.4 1.2 0.2 0.8-0.2 0 0.8 0.8 0.6 0.7-0.2 0.6-0.4-0.1-0.6 0.3-0.2 0.8 0.5z";

const TN_PATH =
  "M404.5 883.4l0.7 0.4-0.6 0.8 0.4 0.7 1.4 1.2 0.4 0.7-2-1.3-1.2-0.5-1.5-0.3-0.5-0.4 0.4-0.3 1.3-0.1 0.6-0.7 0.6-0.2z m-29.8-95.6l0.2 0.9-0.3 0.5-0.7 0.2 0.2 0.6 0.8 0-0.1-0.4 1.1-0.1 0.7 1.1 0.5 0.1 1.6 1.1 2.5-0.2-0.1-1.2 0.5 0.1 0.5-0.3 0-1.7 0.6 0.7 0.3 0.7 0.7-0.5-0.1-0.9 0.3-0.6 0.6-0.5 0.2-1 0.3-0.2-0.2-0.8 0.4-0.5 0-0.5 0.5-1.1 0.6-0.1-0.7-1.6 0-0.2 0.6-0.6 0.2-0.4 1.2 0.4 0.2-1.5 1.1 0.3 1-0.2 0.6-0.6 0.9 0.1 1.3 0 0.1 1.4 0.8-1.3 0.9 0.1 1-0.4 0.5 0.6 1.5 0.5 0.4 0.7 0.4 0 0.6-0.3 0.4 0.1 0.9 0.4 0.5-0.3 0.1-0.6-0.2-0.4 0.7-1 0.6-0.2 0.3-1.1 1.2-0.1 0.1 0.5 0.7 0.2 1.4-0.3-0.1-1.1 0.4 0.2 0.2-0.6 0.4-0.2 1 0 0-0.7 0.7-0.2-0.3-0.4-0.7 0.5-0.1-0.7 0.4-0.8 0-0.6-0.4 0.1-0.9-0.5 1.2-0.6 1 0 1.2 0.2 1.1 0.1 0.1 0.9 0.7 0.9 0.5 0 0.5-0.5 0.5 0.2 0.3-0.4 1-0.2 0.4 0.7-0.3 0.6 0.6 0.3 0.1 0.6 0.5-0.3 0.4-0.1 0.4 0.6 1-0.9-0.8-0.5-0.8-0.6 0.6-0.4 0.2-0.6 0.7 0.6 0.6-0.7 1.4 0.1 1.4-0.9 0.6-0.1 0.8-1-0.5-0.3-0.1-0.6 0.9-0.4-0.1-0.9 0.9-0.2 0.3-0.8 0.9 0.1 0-0.5-0.5 0-0.8-0.7 0.5-0.2 0.3 0.2 0.7 0.1 0.7-0.4 0.1 0.3 0.1-0.1 0.3 0.1 0.2 0.4 0.1 0.2 0.6 0.1 0.3 0.1 0.1 0.1 0.2 0.3 0.2 0.1 0.2 0 0.1 0.1 0.9 0 0.6-0.2 0.8 0.5 0.4 0.5 0.2 0.9 0.3 0.2-0.1 0.5 1.1 0.5-0.1-1.5 0.5-0.1 0 0.8 0.4 2.1 0.1 0.9-0.3 1.2-0.7 2.5-0.3 0.6 0.1 1.4-0.6 1-0.1 0.9-0.5 2.5-0.3 2.1-0.1 1.5 0.2 0.8-1.1 3.4-0.4 1.2-0.9 2.5-0.2 1.5-0.4 0.8-0.7 1.1-1.3 1.5-0.7-0.4-0.2 0.8 0.3 0.3-0.9 1.4-0.1 0.4-0.7 0.3-0.2 0.5 0.3 0.2-1.6 2.5-1.3 2-1 2.4-0.3 1.1-0.3 0-0.5-0.2-0.1-0.4-0.2 0-0.1 0.1-0.1 0.4-0.4-0.1-0.1 0 0 0.2-0.2 0.2-0.4 0.1 0 0.4-0.2 0.2-0.2-1.1-0.5-0.2 0-0.4 0.3 0.2 0.5-0.3 0.2-0.1-0.7-0.3-0.1 0.2-0.2 0.1-0.3 0-0.4-0.6 0-0.6-0.6 0.3-0.3 0.3-0.1 0-0.2 0.1-0.1 0.5 1.4 0 0.2 0.7-0.5 0.1 0 0.6 0.6-0.1 0 0.5 0.5 0.6-0.4 0.5-0.8-0.2-0.5 0.1-0.1 0.3 1-0.2 0 0.5 0.3 0.2 0.7 0 0.7-0.3 0.3 0.5 0.5 0.1 0.4 0.8-0.2 1.1-0.4 1.7-0.5 2.4-0.1 1.1 0.1 0.9 0.4 1.2 0.4 0.9 0.5 0.9 0.6 2.5 0.3 0.2-0.1 0.9 0.1 0.9 0.2 1.4 0.3 2.6-0.1 4.5-0.1 0-0.4 0-0.1 0-0.2-0.2-0.4 0.1-0.2-0.1-0.2 0-0.2 0.3-0.4-0.1-0.4-0.1-0.5-0.1-0.3 0 0 0.3 0.2 0.1 0 0.1 0.1 0.1 0 0.2 0.1 0.2-0.1 0.1-0.4-0.2-0.3 0-0.3 0.1 0.3 0.3 0.1 0.1-0.3 0.3-0.1 0.1 0.1 0 0 0.1 0 0.1 0.3 0.1 0 0.1 0.1-0.1 0.1 0.1 0 0.1 0.4 0.1 0.2 0.1 0.1 0.2 0.2 0.1 0.4-0.2 0 0.3-0.1 0.1 0.1 0 0.3 0.1 0.1 0.3 0.5 0.3-0.4 0.1 0 0.2 0.3 0.2 0.1 0.1 0.2 0 0 0.3 0 0.2 0.6 0 0.4 0 0 1.4 0.1 4.9 0.1 1 0.2 3.7 0.2 1.4 0.3 1.7-0.5 0.6-0.8 0.3-1.1 0-1.4 0 0.5-0.8-0.1-0.3-0.8 0.1-0.3-0.3-0.9-0.1-0.4 0.1-0.7 0-0.5-0.7-0.4 0.8-0.9 0.4 1.1 0.1 1.2 0.3 0.6 0 1.1 0.4-5.5-0.9 0.6-0.3 0.3-0.4 0.8 0.1 0-0.3-1.1-0.3-0.4 0.4 0.3 0.3-1.2 0.1 0.3 0.3-3.1-0.2-0.4 0-0.4 0.6-1.2 0.4-0.9 0.6-0.7 0.8 0.4 0.5-1.1 0.9 0 0.7-0.3 0.1 0.1 0.8-0.2 0.7 0.3 0.7 0.4 0.2 0.3 0.7-0.6 0.4-1.3 1.6-1.1 1 0 0.3-0.7 0.8-0.3 0.5 0.2 0.3-0.5 0.7-0.4 0.3-0.4 0.8-0.5 0.7-0.5 0.3-0.6 0.8-1.1 1.3-0.2 0.9-0.4 0.8-0.6 0.5-0.4 2-0.1 1.2-0.5 0.1 0.1 0.6 0.9 1.6 1.5 1.6 0.9 0.7 1.2 0.8 1.1 0.3 1.1-0.1 0.6 0.3-1.3 0.3-0.7 0.3-0.9-0.1-1-0.2-1.3-0.1-0.6 0-0.9 0.2-0.5 0.5-0.6-0.2-0.6 0-2.9 1.1-0.6 0.1-0.4 0.3 0 0.3-1.4-0.2-0.5 0.3-0.2 0.5 0.3 0.3-1.1 0.2-1 0.5-0.7-0.1-1.1 0-0.6 0.2-0.9 0.1-1.2 0.4-0.8 0.6-1.1 0.9-0.9 0.7-2 1.3-0.7 0.7-0.7 1.1-0.1 0.7-0.4 0.4-0.1 1.6-0.1 0.5 0.1 0.8 0.9 0.3 0.1 0.3-0.7 0.2-0.3 0.2-0.3 0.8-0.5 0.6-0.2 0.9-0.3-0.2-0.2 0.7-0.2 0 0 0.7 0.8 0.2 0.2 0.5-0.4 2 0.2 0.5-0.8 0.9-1 1.2-0.3 1.1 0.3 0.3-1.2 0.3-1.1 0.5-0.7 0.5-0.1 0.3-1.4 0.7-0.4 0.4-0.8 0.4-1.2 0.3-0.8 0.8 0 0.3-1.1 0.9-0.8 0.3-2.8 0.4-1 0.4-0.5 0.4 0.1 0.9-0.2 0.3-0.5 0-3.4-0.7-1.7-0.5-1.2-0.2-0.2-0.6-0.6-0.4-0.8-0.2-0.9-0.8-0.8-0.5-0.7-0.7-1.9-1.5 0.4-0.1 0.5-0.6 0.7 0 0.2-0.6-0.6-0.9 0.5 0 0.8-0.9 0.2-0.7 0.6-0.1-0.5-1.4 0.4-0.4 0.4 0.4 0.7-0.3 0.5-1-0.4-0.9-0.6-0.8 0-0.4-0.8-0.8-0.6-1.6-0.3-0.2-0.3-0.9 0.6 0.1 1-1.1 0.1-0.6 0.8-1-0.2-1-0.4-0.4-0.5-0.3-0.4-0.8-0.3 0.2 0-0.9-0.5-0.4-0.1-0.4-0.7-0.6 0-0.4 0.5-0.6 0.8-0.3 0.3-0.5 0.1-0.7 0.4-0.5 0.6-0.3 0.5-0.7 0-1.3 0.4-0.5-0.2-0.5 0.3-1-0.1-0.8 0.6-0.5 0.9-1.2 0-0.7 0.2-0.5-0.2-0.3 0.4-0.7 0.5-0.5 0.5 0.1 0.4-0.6-0.1-0.3 0.4-0.5-0.7-0.3-0.6-0.5 0-0.4-0.8-0.8-0.4-0.7-0.5 0.2-0.7 0.6-1.1-0.2-1-0.9-0.3 0.2-0.5-0.1 0-0.4 0.3-0.9 0.4-0.4 0.3-0.7-0.1-0.8 0.5-0.2 0.2-0.9-0.1-0.7 0.6-0.2-0.4-0.7 0.2-0.8-0.7-0.7 0.1-0.7 0.5-0.8 0.5-0.6 0.3 0 0.3-0.6-0.3-0.2-0.3-0.9 0.3-0.3-1.3-1.5-0.2-0.1-0.2-0.6 1.1-0.7 0.7 0.2 0.2-0.5-0.1-0.7 0.2-0.7 0.4-0.8-0.3-0.4-0.5 0 0-0.8-1-1.5 0.2-1-1.6-0.1-1.3 1-1.2 0.4-0.7 0.6-0.2 0.7-0.6 0.2-1 0.6-0.6 0-0.8-0.3-0.5 0.2-0.5-0.3-0.2-0.6-0.6-0.3 0-0.4-0.9-0.1-0.3-0.3 0.2-1.2 0.3-0.6-0.6-0.7 0.2-0.2-0.4-0.6 0.2-0.7 0.1-1.4 0.3-1.1-0.2-0.2 0.2-1.4-0.4-0.1-0.3-0.7 0-0.3 1.8-0.1 0-1-0.4-0.2 0.5-1 0.5-1.2 0.1-0.5-0.2-0.9-0.8 0.1-0.6-0.5 0.2-0.3-0.8-1-0.8-0.2-0.4-0.3-1.1 0-0.9-0.6-0.4 0-0.9-0.5 0.2-1.1 0.5-0.6 0.1-0.5 0.3-0.5 0.6-0.4 1.2 0.2-0.2-0.6-0.4-0.1 0-0.4 0.3-0.6-0.3-0.2 0.1-0.5-1.2-0.6-0.3-0.7 0.6-0.6 0.4-0.2 0.2-0.6-0.9-0.7-2 1.3-0.6-0.3-0.6 0-1.6 0.2-0.4-0.4-1.1 0.1-0.3 0.5-0.3-0.5 0.1-0.9 1.8-0.8 0.7-1.7 0-0.8-0.8 0.1 0-0.4-1.7-0.6-1.1-0.9 0.1-0.5-0.5 0.1-0.8-0.5-0.8-0.3-0.4 0.4-1.1-0.9-0.6 0.1-0.5 0.3 0.2-0.9-0.4-0.7 0.3-0.2-0.5-1.1 1.3-0.8 0.5 0.4 0.2 0.4 0.9-0.7 0.1 0.3 1-0.4 0.3-0.8 1.1-0.1 0.3-0.2-0.2-0.7 0.7 0.1 0.6-0.7 0.9-0.5 1 0.7 0.3 1.7 1.5 0.3 0.5-0.1 3.4-0.1 1.8 0.3 0.5 0.4 0.5-0.5-0.6-0.8 0-0.6 0.6-1.3 0.8-0.8 0.2-1.1 0.3-0.5 1.2 0 0.4 0.5 0.4-0.7 0.9-0.4 0.5 0.3 0.5 0.5 0.5 0.1-0.3 0.4 0.7 1 0.6 0 0.5-1.1 0.6-0.3 0.8-0.1 0.6-0.2 1.1 0 0.4-0.5 1 0.3 0.1-0.2 1.2 1.1 0.5-0.2 0.3-0.4 0.7 0.1 0.8 0.4 0.5-0.3 0.7-1.9 0-1.4 0.6 0 0.4-1.1 0.9 0.2 0.6-0.2 0.7 0.2 1.8-0.5 0.7 0 0-0.4 0.7-1.5 0.9-1.3 0.7-0.4 0.5-1.1-0.7-0.6 0-0.5-0.4-0.6-1.9-0.5-0.7 0-0.7-0.2-1.3 0.2-0.5-0.2-0.8 0.3-0.8-0.2-0.4-0.3 0.2-0.7-0.3-0.3 0.2-0.7 0.6-0.3 0.7 0.1 0.2-0.3 0.5-0.1 0.4-0.4 0.3-0.8 1-0.8 0.3-1.4 0.3-2-0.3-0.3-0.5 0.6-0.6-0.1 0.7-0.6 0.1-0.4-0.7-0.1-0.3-1.4 0.4-0.7 0-0.6 0.4-0.5-0.3-0.6 0.1-0.4 1.8-0.5 0.4 0.1-0.1 0.6 0.8 0 0.2-0.7 0.4 0.4 0.2-0.6 0.7-0.1 0.3-0.8-0.1-0.4 0.5-0.1 0.2-0.4-0.3-0.4 0.4-0.6 0.4-1.1-0.5-0.2 1-0.6 0.1-0.3 1.6 0.1 0.1-0.3 0.8-0.2 0.3 0.7-0.3 0.2-0.2 0.6 0.7 0.2 0.2-0.4 0.5-0.2 0.6 0.7 0 0.4 0.6 0-0.3-0.5 0.8-0.8 1.2 0.4 0.6 0.7 0.7 0.5 0.2 0.4 1 0.3 0.3-0.1 1.5 0.3z";

const STATES = [
  {
    id: "INMH",
    label: "Pune  ",
    count: "05",
    path: MH_PATH,
    vx: 170,
    vy: 420,
    vw: 510,
    vh: 260,
    cx: 470.7,
    cy: 720.9,
    finalDX: -520,
    finalDY: 20,
  },
  {
    id: "INKA",
    label: "Bengaluru",
    count: "01",
    path: KA_PATH,
    vx: 220,
    vy: 620,
    vw: 240,
    vh: 240,
    cx: 410.1,
    cy: 848.1,
    finalDX: 0,
    finalDY: 20,
  },
  {
    id: "INTN",
    label: "Chennai",
    count: "01",
    path: TN_PATH,
    vx: 290,
    vy: 745,
    vw: 170,
    vh: 205,
    cx: 369.6,
    cy: 950.6,
    finalDX: 520,
    finalDY: 20,
  },
];

const STATE_H = 300;
const DISPLAY = 700;
const SCALE = DISPLAY / 1000;

// Reveal-progress window (0–1) over which the three states travel from
// inside the India map out to their fixed resting columns. Progress here is
// *virtual* — driven by captured wheel input while the section is pinned
// (see the wheel-capture effect below) — not by real document scroll, so
// there's no "dead zone" to worry about: travel can run all the way to 1.
const STATE_TRAVEL_START = 0.32;
const STATE_TRAVEL_END = 1;

// India map's fully-faded-out resting values, and the progress window (also
// 0–1, same virtual progress) over which it fades/shrinks into them.
const INDIA_HIDDEN_OPACITY = 0;
const INDIA_HIDDEN_SCALE = 0.76;
const INDIA_FADE_START = 0.3;
const INDIA_FADE_END = 0.72;

// How many px of accumulated wheel deltaY correspond to the full 0→1 reveal
// — i.e. how much scrolling "effort" the reveal takes. Expressed in units of
// viewport height so the pacing stays consistent across screen sizes.
const VIRTUAL_SCROLL_VH = 200;

// A wheel/trackpad tick that carries the section's top edge past 0 by more
// than this is treated as a big jump (Page Down, scrollbar drag, keyboard) —
// pinning/capture is skipped for it entirely rather than folding the extra
// distance into view, since a snap that size is what caused the jerk this
// whole mechanism exists to avoid. Sized generously above a single mouse
// wheel "notch" (commonly ~100–120px in Chrome/Windows) so ordinary wheel
// and trackpad scrolling reliably engages capture; folding in an overshoot
// this size is itself unremarkable — it's the same distance a normal,
// uncaptured scroll tick would have moved the page anyway.
const ENTRY_SNAP_PX = 200;

// While capturing, 'wheel' and keyboard input (arrow keys, Page Up/Down,
// Space, Home/End — see the onKeyDown handler in the wheel-capture effect
// below) both move the reveal forward. Dragging the scrollbar or a
// touch-scroll swipe on any touch-capable screen ≥1024px wide still move the
// real page but remain invisible to both handlers, so without a backstop,
// capture (and the Lenis stop() it holds — see stopLenis/startLenis in
// LenisProvider.tsx) would never release: scrolling would stay dead
// sitewide, on every page, until a hard refresh. If neither a wheel nor a
// keydown event arrives for this long while capturing, treat it as the user
// having moved on some other way (scrollbar drag, touch swipe) and release
// on our own — resolving to whichever end (fully revealed vs. not-yet-
// engaged) is closer instead of leaving the reveal stranded mid-progress.
const IDLE_RELEASE_MS = 2500;

// Fraction of the gap to the raw wheel target that `virtualProgress` closes
// per animation frame — the same kind of frame-by-frame ease Lenis applies
// to real scroll. Without this, the reveal moves in raw, un-eased steps
// straight off each wheel event, which reads as choppy/stepped rather than
// the smooth motion the rest of the page has.
const PROGRESS_SMOOTHING = 0.14;
// How far past 0/1 the raw target is allowed to run ahead while the eased
// value is still catching up — bounds the brief "coast to a stop" after the
// eased value crosses the end, so release always uses a small, bounded
// input excess rather than an unbounded one.
const TARGET_OVERSHOOT = 0.02;

// Mobile breakpoint used throughout this file — matches Tailwind's `lg` (1024px)
// and Btn.tsx's own `winW < 1024` convention.
const MOBILE_BREAKPOINT = 1024;

// Smooth cubic ease-in-out
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Smooth ease-out for the state travel (decelerates into final position)
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

// India stays fully visible until INDIA_FADE_START, smoothly fades/shrinks
// into `target` between INDIA_FADE_START and INDIA_FADE_END, then holds
// there. Shared by opacity and scale — same window, different target value.
function indiaFadeValue(progress: number, target: number) {
  if (progress <= INDIA_FADE_START) return 1;
  if (progress >= INDIA_FADE_END) return target;
  const f = (progress - INDIA_FADE_START) / (INDIA_FADE_END - INDIA_FADE_START);
  const easedF = easeInOut(f);
  return 1 + (target - 1) * easedF;
}

// ─── Park data ───────────────────────────────────────────────────────────────

type Park = {
  name: string;
  city: string;
  area: string;
  buildings: string;
  image: string;
  mx: number; // marker left % inside state SVG container
  my: number; // marker top % inside state SVG container
  /** Real park page route — omitted when no page exists yet (e.g. Chennai). */
  link?: string;
  /** When true, the card shows a "Coming Soon" notice instead of city/area/buildings rows. */
  comingSoon?: boolean;
};

const PARKS: Record<string, Park[]> = {
  INMH: [
    {
      name: "KSH Chakan IV",
      city: "Chakan, pune",
      area: "0.36 Mn. Sq. Ft.",
      buildings: "02 Buildings",
      image: "/ParkPage/chakan-4/heroCh4/NewChakan4Spot.webp",
      mx: 10,
      my: 50,
      link: "/ksh-chakan-iv",
    },
    {
      name: "KSH Chakan III",
      city: "Chakan, pune",
      area: "1.50 Mn. Sq. Ft.",
      buildings: "08 Buildings",
      image: "/ParkPage/chakan-3/ch3spot.jpg",
      mx: 13,
      my: 60,
      link: "/ksh-chakan-iii",
    },
    {
      name: "KSH Chakan II",
      city: "Chakan, pune",
      area: "1.20 Mn. Sq. Ft.",
      buildings: "05 Buildings",
      image: "/ParkPage/chakan-2/ch2spot.jpg",
      mx: 18,
      my: 68,
      link: "/ksh-chakan-ii",
    },
    {
      name: "KSH Chakan I",
      city: "Chakan, pune",
      area: "0.85 Mn. Sq. Ft.",
      buildings: "04 Buildings",
      image: "/ParkPage/chakan-1/ch1spot.jpg",
      mx: 23,
      my: 56,
      link: "/ksh-chakan-i",
    },
    {
      name: "KSH Talegaon I",
      city: "Talegaon, pune",
      area: "0.14 Mn. Sq. Ft.",
      buildings: "02 Buildings",
      image: "/ParkPage/talegaon-i/t1spot.jpg",
      mx: 20,
      my: 48,
      link: "/ksh-talegaon-i",
    },
  ],
  INKA: [
    {
      name: "KSH Hosur I",
      city: "Hosur, Bengaluru",
      area: "1.26 Mn. Sq. Ft.",
      buildings: "04 Buildings",
      image: "/ParkPage/hosur-1/hspot.jpg",
      mx: 54,
      my: 66,
      link: "/ksh-hosur-i",
    },
  ],
  INTN: [
    {
      name: "Chennai Logistics",
      city: "Chennai",
      area: "lorem ipsum sq.ft",
      buildings: "lorem ipsum Buildings",
      image: "/home/warehouse.png",
      mx: 74,
      my: 47,
      // No link yet — /ksh-chennai-i page hasn't been built.
      comingSoon: true,
    },
  ],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function Marker({
  active = false,
  onClick,
}: {
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`w-[18.24px] h-[18.24px]  rounded-full border border-white flex items-center justify-center transition-[transform,background] duration-200 ease-in-out ${
        active ? "bg-[rgba(197,189,172,0.5)]" : "bg-white/20"
      }`}
    >
      <div className="w-3.5 h-3.5 rounded-full bg-[rgba(197,189,172,0.6)] flex items-center justify-center">
        <div className="w-[3.36px] h-[3.36px] rounded-full bg-white" />
      </div>
    </div>
  );
}

function StateCard({ park, winW }: { park: Park; winW: number }) {
  // Mobile: image left, title + Row details right, single horizontal card.
  // Branches internally on `winW` (matching the winW >= 1260 && winW <= 1320
  // special case above) instead of a divergent prop API, per Btn.tsx's own
  // `winW < 1024` mobile convention used throughout this file.
  if (winW < 1024) {
    const className = `bg-[#FBFBF9] rounded-[20px] p-3 flex flex-row items-stretch gap-3 shrink-0 w-full transition-all min-h-[140px] ${park.link ? "cursor-pointer" : ""}`;
    const content = (
      <>
        <div className="w-[40%] max-w-[170px] shrink-0 aspect-[4/3] rounded-xl overflow-hidden bg-[#CBC4B5]">
          <img
            src={park.image}
            alt={park.name}
            className="w-full h-full object-cover block"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1 gap-2 py-2">
          <h3 className="m-0 lg:my-4! 2xl:my-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[16px] text-[#1C2A48] leading-tight truncate">
            {park.name}
          </h3>
          <div className="flex flex-col gap-[7px]">
            {park.comingSoon ? (
              <p className="m-0 font-[family-name:var(--font-sora),sans-serif] text-xs font-medium text-[#8A8880]">
                Coming Soon
              </p>
            ) : (
              <>
                <Row label="City" value={park.city} />
                <Row label="Total Area" value={park.area} />
                <Row label="Buildings" value={park.buildings} />
              </>
            )}
          </div>
        </div>
      </>
    );
    return park.link ? (
      <Link href={park.link} className={className}>
        {content}
      </Link>
    ) : (
      <div className={className}>{content}</div>
    );
  }

  const className = `
    bg-[#FBFBF9]
    rounded-[20px]
    pt-3.5
    px-3.5
    pb-0
    flex
    flex-col
    shrink-0
    transition-all
    ${park.link ? "cursor-pointer" : ""}
    ${winW >= 1260 && winW <= 1320 ? "w-[245px]" : "2xl:w-80 w-65"}
  `;
  const content = (
    <>
      {/* Image */}
      <div className="w-full aspect-[312/200] rounded-xl overflow-hidden bg-[#CBC4B5]">
        <img
          src={park.image}
          alt={park.name}
          className="w-full h-full object-cover block"
        />
      </div>
      {/* Title + arrow row */}
      <div className="flex items-center justify-between gap-3.5 pt-3 xl:py-5 px-1.5 pb-3 xl:pb-4">
        <h3 className="m-0 font-[family-name:var(--font-sora),sans-serif] font-semibold text-[18px] xl:text-xl text-[#1C2A48] leading-tight">
          {park.name}
        </h3>
        <span
          className={`shrink-0 flex items-center justify-center w-[42px] h-[42px] rounded-full border border-[#C9C6BD] ${park.link ? "cursor-pointer" : ""}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 12 L12 4 M6 4 H12 V10"
              stroke="#1C2A48"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {/* Info rows */}
      <div className="px-1.5 pb-[22px] flex flex-col gap-[11px]">
        {park.comingSoon ? (
          <p className="m-0 border-t border-[#E4E3DD] py-6 px-6 text-center font-[family-name:var(--font-sora),sans-serif] text-base font-medium text-[#8A8880]">
            Coming Soon
          </p>
        ) : (
          <>
            <Row label="City" value={park.city} />
            <Row label="Total Area" value={park.area} />
            <Row label="Buildings" value={park.buildings} />
          </>
        )}
      </div>
    </>
  );
  return park.link ? (
    <Link href={park.link} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between font-[family-name:var(--font-sora),sans-serif] text-xs">
      <span className="text-[#8A8880]">{label}</span>
      <span className="text-[#2A3856] font-medium">{value}</span>
    </div>
  );
}

const StateSVG = memo(function StateSVG({
  path,
  vx,
  vy,
  vw,
  vh,
  fill,
  stroke,
}: {
  path: string;
  vx: number;
  vy: number;
  vw: number;
  vh: number;
  fill: string;
  stroke: string;
}) {
  return (
    <svg
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      className="w-full h-full overflow-visible"
    >
      <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth="0.7"
        strokeLinejoin="round"
        className="transition-[fill] duration-300 ease-in-out"
      />
    </svg>
  );
});

export default function Map({
  hideEyebrow = false,
}: {
  /** Hides the "// PORTFOLIO OVERVIEW" label above the heading — used on the
   * /overview page itself, where that label would just be redundant with
   * the page it's already on. */
  hideEyebrow?: boolean;
} = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const svgContRef = useRef<HTMLDivElement>(null);
  // Reveal progress (0–1), driven by captured wheel input — see the
  // wheel-capture effect below. Not real scroll: the placeholder this
  // section renders into is always exactly one screen tall, so there's
  // nothing to grow or shrink and thus no gap and no scroll-position
  // correction to ever get wrong.
  const [virtualProgress, setVirtualProgress] = useState(0);
  const virtualProgressRef = useRef(0);
  // Raw accumulated target from wheel input — `virtualProgress` eases toward
  // this every frame (see PROGRESS_SMOOTHING below) instead of snapping to
  // it directly, so the reveal keeps the same smoothed, eased motion Lenis
  // gives the rest of the page instead of moving in raw per-wheel-tick steps.
  const targetProgressRef = useRef(0);
  // True while this section is actively intercepting wheel input (pinned via
  // `position: fixed`) to drive the reveal. Becomes false the moment the
  // reveal completes OR the user backs out above the top before finishing.
  const [isCapturing, setIsCapturing] = useState(false);
  const isCapturingRef = useRef(false);
  // How many px of wheel deltaY the *current* capture session maps to 0→1 —
  // snapshotted at capture-start from the viewport height in effect at that
  // moment (see VIRTUAL_SCROLL_VH).
  const captureBudgetPxRef = useRef(0);
  // Timestamp of the last 'wheel' event seen while capturing — see
  // IDLE_RELEASE_MS below. Only wheel input ever advances the reveal, so
  // this is the only signal that tells us the user is still actively
  // engaged with it.
  const lastWheelAtRef = useRef(0);
  // True once the three states have fully travelled out of the India map and
  // reached their resting columns — from then on, scrolling back up must not
  // send them back in, and capture never re-engages (see the entry-detection
  // effect below). Only resets when this component remounts, i.e. on a full
  // page reload.
  const [statesSettled, setStatesSettled] = useState(false);
  const [mhShape, setMhShape] = useState<{
    path: string;
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  // Shared by mobile (tap a static state map) and desktop (click a
  // scroll-detached flying state shape) — both open the same full-screen
  // popup, `detailOverlay` below.
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const { hideNavbar, showNavbar } = useNavbarVisibility();
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  // Place this INSIDE your Map component function
  const [prevActive, setPrevActive] = useState(0);
  const [direction, setDirection] = useState(1);
  // Always seed with the SSR fallback (1920) so the first client render
  // matches the server-rendered HTML exactly. The real width is synced in
  // the effect below, once hydration has already completed.
  const [winW, setWinW] = useState(1920);
  const isMobileBP = winW < MOBILE_BREAKPOINT;
  const mhScrollRef = useRef<HTMLDivElement>(null);
  const mhProgrammaticScrollRef = useRef(false);
  const mhProgrammaticScrollTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // The popup's Back button sits where the sitewide navbar would otherwise
  // overlap it on mobile — hide the navbar for as long as the popup is open
  // instead of layering under/over it. Keyed only on whether a state is
  // selected (not `isMobileBP` too) so a boundary-width flicker while the
  // popup is open — e.g. devtools' responsive-mode scrollbar toggling the
  // viewport a few px across the 1024px breakpoint — can't tear this effect
  // down and immediately re-run it; only actually opening/closing the popup
  // does. `isMobileBP` is still checked once, at the moment the popup opens,
  // to skip this on desktop entirely.
  const isMobileBPRef = useRef(isMobileBP);
  isMobileBPRef.current = isMobileBP;
  useEffect(() => {
    if (selectedState === null || !isMobileBPRef.current) return;
    hideNavbar();
    // Locks background scroll for the popup's duration — without this,
    // any residual scroll while it's open (e.g. momentum from right before
    // it opened) still reaches the navbar's own scroll-direction listener,
    // which fights `forceHidden` by re-toggling its `hidden` state on top
    // of it every time that listener fires.
    stopLenis();
    return () => {
      showNavbar();
      startLenis();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState, hideNavbar, showNavbar]);

  // Navbar stays fully hidden for as long as any part of this section is on
  // screen (both mobile and desktop; `trackRef` is attached to both root
  // elements), and comes back the instant it's scrolled past in either
  // direction. Driven by IntersectionObserver rather than a `window.scroll`
  // listener kept subscribed for the component's entire mounted lifetime —
  // that version's hideNavbar()/showNavbar() calls fired on every scroll
  // tick ANYWHERE on the page (not just near this section), and a stale
  // `getBoundingClientRect()` read (mid-layout-shift, or a check that simply
  // raced this section's own real position) could call hideNavbar() while
  // the user was nowhere near the map, with nothing left to undo it once
  // they scrolled somewhere that stale check no longer revisited. The
  // observer only exists here, fires only on this section's own visibility,
  // and both branches always resolve (there's no "sometimes forget to call
  // showNavbar()" path), so this can't leak into any other section.
  //
  // The showNavbar() branch only defers to the popup-open effect on MOBILE
  // (isMobileBPRef.current) — that's the only viewport where the popup-open
  // effect actually runs and takes over ownership of the hidden state (see
  // its own `!isMobileBPRef.current` early-return above). On desktop the
  // popup renders as `absolute inset-0` INSIDE this same section rather than
  // locking scroll, so the user can freely scroll the real page away from
  // the map while the popup stays visually pinned on top — deferring to the
  // popup-open effect there left this branch permanently blocked from ever
  // calling showNavbar() again for as long as a state was selected (the
  // desktop effect never runs to pick up that responsibility), which is
  // exactly the "navbar gone site-wide until Back is clicked" bug: once
  // `trackRef` had genuinely scrolled out of view, nothing was left that
  // would call showNavbar() until the popup closed and selectedState went
  // back to null. Checking isIntersecting alone here is correct on both
  // viewports: on mobile the popup-open effect's showNavbar() will still run
  // on close, matching whatever this effect already left the state as.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hideNavbar();
        } else {
          showNavbar();
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [hideNavbar, showNavbar]);

  useEffect(() => {
    if (activeCard !== undefined && activeCard !== prevActive) {
      const isNext =
        activeCard > prevActive || (prevActive > 1 && activeCard === 0);
      setDirection(isNext ? 1 : -1);
      setPrevActive(activeCard);
    }
  }, [activeCard, prevActive]);

  // Mobile Maharashtra carousel: keep the scroll-snap track in sync with
  // `activeCard` when NavArrow buttons drive it. We set mhProgrammaticScrollRef
  // before calling scrollIntoView so the onScroll handler ignores the resulting
  // scroll events and doesn't fight back, causing the jerk/stall.
  useEffect(() => {
    const el = mhScrollRef.current;
    if (!el) return;
    const child = el.children[activeCard] as HTMLElement | undefined;
    if (!child) return;
    // Guard: mark as programmatic so the onScroll handler skips this scroll.
    if (mhProgrammaticScrollTimeoutRef.current) {
      clearTimeout(mhProgrammaticScrollTimeoutRef.current);
    }
    mhProgrammaticScrollRef.current = true;
    child.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    // Clear the flag after the smooth scroll animation settles (~400ms is safe).
    mhProgrammaticScrollTimeoutRef.current = setTimeout(() => {
      mhProgrammaticScrollRef.current = false;
      mhProgrammaticScrollTimeoutRef.current = null;
    }, 500);
  }, [activeCard]);

  useLayoutEffect(() => {
    const svgEl = svgContRef.current?.querySelector("svg");
    const mhPathEl = svgEl?.querySelector(
      '[id="INMH"]',
    ) as SVGGraphicsElement | null;
    if (!mhPathEl) return;
    try {
      const bbox = mhPathEl.getBBox();
      const PAD = 2;
      setMhShape({
        path: mhPathEl.getAttribute("d") || MH_PATH,
        x: bbox.x - PAD,
        y: bbox.y - PAD,
        width: bbox.width + PAD * 2,
        height: bbox.height + PAD * 2,
      });
    } catch {}
  }, []);

  // Engages capture the moment the track's top edge reaches or passes viewport top
  // while scrolling down. Immediately resets Lenis internal scroll momentum and
  // aligns window scroll position to trackRef.offsetTop to guarantee zero map cropping
  // and zero layout displacement when switching to position: fixed.
  //
  // Never re-engages once `statesSettled` — that's what makes the section
  // permanently normal (non-pinned) after the first full play-through.
  useEffect(() => {
    if (isMobileBP || statesSettled) return;
    const checkEntry = () => {
      // A hash-link jump (e.g. navbar -> Testimonials) is passing through
      // this section's scroll range — ignore it so the wheel-capture pin
      // never engages mid-flight and strands the jump here.
      if (
        isCapturingRef.current ||
        !trackRef.current ||
        isScrollJumpInProgress()
      )
        return;
      const rect = trackRef.current.getBoundingClientRect();
      // ENTRY_SNAP_PX guard: rect.top<=0 alone doesn't distinguish "just now
      // crossed the top by a few px on an ordinary wheel/trackpad tick" from
      // "already scrolled way past it" — both satisfy the same condition.
      // Without this check, a big scroll (Page Down, a fast trackpad flick,
      // a scrollbar drag, or simply this listener's callback running a frame
      // or two late relative to a fast gesture) could be caught here with
      // rect.top already far below 0, and the window.scrollTo() snap below
      // would then yank the page backward by however far past the trigger
      // point the user had already scrolled — that visible snap-back is
      // exactly the "whole section jumps" symptom. Capping the overshoot
      // this engages for means a big enough scroll just carries straight
      // through the section uncaptured (scrolling back up re-offers capture
      // next time rect.top<=0 is crossed normally, same as it does for any
      // other reason capture doesn't engage) instead of correcting itself
      // with a jump the size of the whole overshoot.
      if (rect.top <= 0 && rect.top >= -ENTRY_SNAP_PX && rect.bottom > 0) {
        isCapturingRef.current = true;

        // Locks scroll (hard overflow:hidden — see LenisProvider.tsx) in the
        // same synchronous tick isCapturingRef flips, rather than waiting for
        // the separate wheel-capture effect below to mount on React's next
        // commit (which only happens once `isCapturing` state itself has
        // committed). Without this, a keyboard scroll (arrow key/Page Down/
        // Space — native, un-preventable the way wheel is, see the
        // wheel-capture effect's own comment) landing in that one-render gap
        // could still move the real page before the lock engaged, which is
        // what produced the "jerky" snap on entry specifically for keyboard
        // input. This is the ONLY stopLenis() call for a capture session now
        // (the wheel-capture effect below no longer calls it) — stopLenis/
        // startLenis are reference-counted, so calling it from both places
        // would hold the lock at count 2 while only ever releasing once (that
        // effect's cleanup), permanently stranding scroll locked after every
        // capture. One call here, one matching startLenis() in that effect's
        // cleanup, keeps the count balanced.
        stopLenis();

        // Reset Lenis internal scroll momentum & target to trackRef top
        // instantly. force:true is required here — Lenis's own scrollTo()
        // silently no-ops while stopped (see stopLenis() call immediately
        // above) unless forced, which left this call doing NOTHING: Lenis's
        // internal targetScroll stayed wherever the user's momentum was
        // heading before capture engaged, and the next startLenis() (when
        // capture ends) eased scroll toward that stale target instead of
        // staying put — visible as the scrollbar thumb snapping backward on
        // entry (its position reflects window.scrollY jumping to match
        // window.scrollTo below, which was correct, but the FOLLOWING
        // release then dragged it toward the stale Lenis target) and, on a
        // fast enough scroll, as the section below Map briefly overlapping
        // into view when that stale target landed past Map's own end.
        lenisScrollTo(trackRef.current, { immediate: true, force: true });
        if (trackRef.current) {
          window.scrollTo({
            top: trackRef.current.offsetTop,
            behavior: "instant" as ScrollBehavior,
          });
        }

        captureBudgetPxRef.current =
          window.innerHeight * (VIRTUAL_SCROLL_VH / 100);
        virtualProgressRef.current = 0;
        targetProgressRef.current = 0;
        setVirtualProgress(0);

        setIsCapturing(true);
      }
    };
    checkEntry();
    window.addEventListener("scroll", checkEntry, { passive: true });
    return () => window.removeEventListener("scroll", checkEntry);
  }, [isMobileBP, statesSettled]);

  // While capturing, wheel input accumulates into a raw target and an rAF
  // loop eases `virtualProgress` toward it every frame (see PROGRESS_SMOOTHING).
  // Clamps target cleanly to prevent runaway momentum and scroll jumps on completion.
  //
  // stopLenis() for this capture session is called from checkEntry above
  // (synchronously, the instant capture starts) — NOT here. This effect only
  // mounts one render later, after `isCapturing` state has committed, and
  // calling stopLenis() a second time here (on top of checkEntry's) would
  // hold the reference count at 2 while cleanup below only ever calls
  // startLenis() once, permanently stranding scroll locked after every
  // capture. This effect's cleanup still balances checkEntry's single call.
  useEffect(() => {
    if (!isCapturing) return;
    lastWheelAtRef.current = Date.now();

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      lastWheelAtRef.current = Date.now();
      const budget =
        captureBudgetPxRef.current ||
        window.innerHeight * (VIRTUAL_SCROLL_VH / 100);
      targetProgressRef.current = Math.max(
        -0.05,
        Math.min(1.05, targetProgressRef.current + e.deltaY / budget),
      );
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    // Keyboard input (arrow keys, Page Up/Down, Space, Home/End) triggers
    // native browser scroll directly — it never fires a 'wheel' event, so
    // without this handler it's completely invisible to onWheel above and
    // the reveal just sits frozen until IDLE_RELEASE_MS force-releases it
    // with an abrupt, un-eased snap (see that constant's comment). This
    // treats each keypress as one wheel "notch" (~ENTRY_SNAP_PX worth of
    // deltaY, matching the size a real wheel tick already uses elsewhere in
    // this file) fed through the exact same budget/clamp math onWheel uses,
    // so the same rAF easing (PROGRESS_SMOOTHING) applies to keyboard input
    // too — no separate code path, no separate feel.
    const KEY_STEP_PX = ENTRY_SNAP_PX;
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't hijack Space/arrows/Home/End while the user is typing
      // somewhere else on the page (there's no visible form inside this
      // section, but this listener is global on `window`, not scoped to the
      // section's own DOM).
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return;

      let deltaY = 0;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          deltaY = KEY_STEP_PX;
          break;
        case "ArrowUp":
        case "PageUp":
          deltaY = -KEY_STEP_PX;
          break;
        case "End":
          deltaY = KEY_STEP_PX * 10;
          break;
        case "Home":
          deltaY = -KEY_STEP_PX * 10;
          break;
        default:
          return;
      }
      e.preventDefault();
      lastWheelAtRef.current = Date.now();
      const budget =
        captureBudgetPxRef.current ||
        window.innerHeight * (VIRTUAL_SCROLL_VH / 100);
      targetProgressRef.current = Math.max(
        -0.05,
        Math.min(1.05, targetProgressRef.current + deltaY / budget),
      );
    };
    window.addEventListener("keydown", onKeyDown);

    let rafId = 0;
    const tick = () => {
      // A hash-link jump (e.g. navbar -> Testimonials) wants to move the page
      // straight through this section. Lenis is stopped for the whole
      // duration of a capture (see stopLenis() in checkEntry, above), so the
      // jump's own lenis.scrollTo would otherwise be silently swallowed and
      // the user is left stranded here, wheel/keyboard input still trapped
      // by `onWheel`/`onKeyDown` below.
      // Bail out of capture immediately so Lenis is running again by the
      // time that scrollTo call lands. Deliberately does NOT call
      // startLenis() here itself — setIsCapturing(false) below tears down
      // this effect on the next render, and its own cleanup already calls
      // startLenis() exactly once. stopLenis()/startLenis() are
      // reference-counted across the WHOLE site (video modal, popups, ...
      // — see LenisProvider.tsx), not scoped to this capture session alone:
      // an extra release here would decrement whichever lock happens to be
      // outstanding at that exact moment, which could be a completely
      // unrelated feature's (e.g. a video modal open at the same time),
      // prematurely un-locking scroll out from under it.
      if (isScrollJumpInProgress()) {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("keydown", onKeyDown);
        isCapturingRef.current = false;
        setIsCapturing(false);
        return;
      }

      // No wheel/keyboard input for a while — see IDLE_RELEASE_MS above.
      // Resolve to whichever end is closer instead of leaving the reveal
      // stranded. lastWheelAtRef is touched by onKeyDown too, so ordinary
      // keyboard scrolling (holding an arrow key, repeated Page Downs) no
      // longer trips this — it only fires on genuine silence from both
      // input types.
      if (Date.now() - lastWheelAtRef.current > IDLE_RELEASE_MS) {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("keydown", onKeyDown);
        const finishing = virtualProgressRef.current >= 0.5;
        virtualProgressRef.current = finishing ? 1 : 0;
        setVirtualProgress(finishing ? 1 : 0);
        isCapturingRef.current = false;
        setIsCapturing(false);
        if (finishing) setStatesSettled(true);
        return;
      }

      const target = targetProgressRef.current;
      const current = virtualProgressRef.current;
      const next = current + (target - current) * PROGRESS_SMOOTHING;

      if (next >= 0.999 || (target >= 1 && Math.abs(next - 1) < 0.001)) {
        virtualProgressRef.current = 1;
        setVirtualProgress(1);
        isCapturingRef.current = false;
        setIsCapturing(false);
        setStatesSettled(true);
        return; // capture ends — effect cleanup releases Lenis cleanly via startLenis()
      }
      if (next <= 0.001 && target < 0) {
        virtualProgressRef.current = 0;
        setVirtualProgress(0);
        isCapturingRef.current = false;
        setIsCapturing(false);
        return; // user backed out above section top — cleanup releases Lenis
      }
      virtualProgressRef.current = next;
      setVirtualProgress(next);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      startLenis();
    };
  }, [isCapturing]);

  // Highlight the state paths inside the India SVG as the reveal progresses.
  // `fill`/`stroke` are constant (always the same two values, set once the
  // instant highlighting is possible) and `stroke-width` only ever toggles
  // between two fixed values at one boolean threshold (hlP crossing 0.01,
  // around virtualProgress ~0.184) — none of these ever needs a DIFFERENT
  // value at any other point in the 0-1 range. This used to be keyed on
  // [virtualProgress, isMobileBP], re-running 3x querySelector + 9x
  // setAttribute on the real DOM every single rAF tick virtualProgress
  // changed during capture (up to ~60/sec) — almost all of those calls just
  // re-wrote the exact same values that were already set, each one still
  // forcing the browser to invalidate style for that element. That
  // per-frame DOM-write churn, landing right in the same virtualProgress
  // window (~0.18-0.42) the three states are actively traveling/scaling in
  // (STATE_TRAVEL_START=0.32) and being highlighted, is what showed up as
  // the "minor jerk while the three states open." Keying on the derived
  // boolean instead means this effect only actually touches the DOM twice
  // total per capture (once to turn highlighting on crossing the threshold,
  // once more if a rare backward crossing turns it back off) — not once per
  // frame for the entire ~250-progress-unit window it's active across.
  const isHighlighted =
    Math.max(0, Math.min(1, (virtualProgress - 0.18) / 0.24)) > 0.01;
  useEffect(() => {
    if (isMobileBP) return;
    const svgEl = svgContRef.current?.querySelector("svg");
    if (!svgEl) return;
    ["INMH", "INKA", "INTN"].forEach((id) => {
      const el = svgEl.querySelector(`[id="${id}"]`) as SVGElement | null;
      if (!el) return;
      el.setAttribute("fill", "#C5BDAC");
      el.setAttribute("stroke", "#FFFFFF");
      el.setAttribute("stroke-width", isHighlighted ? "1.1" : ".5");
    });
  }, [isHighlighted, isMobileBP]);

  // The single source of truth for the reveal's visual state: live virtual
  // progress while capturing, pinned at 1 forever once settled (so scrolling
  // back up never sends the states/map back to their start), 0 the rest of
  // the time (not yet reached, or backed out before finishing).
  const effectiveProgress = statesSettled
    ? 1
    : isCapturing
      ? virtualProgress
      : 0;
  const indiaOpacityValue = indiaFadeValue(
    effectiveProgress,
    INDIA_HIDDEN_OPACITY,
  );
  const indiaScaleValue = indiaFadeValue(effectiveProgress, INDIA_HIDDEN_SCALE);
  const indiaContainerScaleValue = indiaScaleValue;

  // Full-screen popup (state map + park slider), shared by mobile and
  // desktop — mobile opens it by tapping one of the static state maps,
  // desktop opens it from the scroll-detached flying state shapes.
  // `positionClassName` is the only thing that differs between the two:
  // mobile keeps `fixed inset-0` (pinned to the viewport — this is already
  // correct there and must not change), desktop uses `absolute inset-0` so
  // the popup scrolls away with its own section instead of staying stuck to
  // the screen for the rest of the page underneath it.
  const renderDetailOverlay = (positionClassName: string) => (
    <AnimatePresence>
      {selectedState !== null &&
        (() => {
          const st = STATES.find((s) => s.id === selectedState)!;
          const measured = selectedState === "INMH" ? mhShape : null;
          const detailPath = measured ? measured.path : st.path;
          const dvx = measured ? measured.x : st.vx;
          const dvy = measured ? measured.y : st.vy;
          const dvw = measured ? measured.width : st.vw;
          const dvh = measured ? measured.height : st.vh;
          const parks = PARKS[selectedState] ?? [];
          const total = parks.length;
          const isMH = selectedState === "INMH";

          return (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`${positionClassName} z-[1000] bg-[#EDEDF0] flex max-lg:flex-col max-lg:justify-center max-lg:overflow-hidden`}
            >
              {/* Mobile top bar: just the back button — no title/eyebrow,
                  so "Explore Our Parks" doesn't repeat once a state is open */}
              {isMobileBP ? (
                <div className="flex-shrink-0 flex items-center pt-4 pb-2 px-4 relative z-50">
                  <Btn
                    onClick={() => {
                      setSelectedState(null);
                      setActiveCard(0);
                    }}
                    arrowColor="stroke-[#59624D]"
                    arrowClassName="rotate-180"
                    hoverBgColor="bg-[#5E6E4E]"
                    bgColor="bg-[transparent]"
                    borderColor="border-[#59624D]"
                    textColor="#59624D"
                    label="Back"
                    className="group inline-flex flex-row-reverse pl-3! h-[44px] gap-5! items-center rounded-full transition-colors"
                  />
                </div>
              ) : (
                <>
                  <Btn
                    onClick={() => {
                      setSelectedState(null);
                      setActiveCard(0);
                    }}
                    arrowColor="stroke-[#59624D]"
                    arrowClassName="rotate-180"
                    hoverBgColor="bg-[#5E6E4E]"
                    bgColor="bg-[transparent]"
                    borderColor="border-[#59624D]"
                    textColor="#59624D"
                    label="Back"
                    className="group mt-10 inline-flex flex-row-reverse absolute! mlcont z-50 pl-3! h-[clamp(50px,4.4cqw,38px)] gap-5! items-center rounded-full transition-colors"
                  />
                  <div className="absolute top-5 left-0 right-0 z-6 text-center pointer-events-none">
                    {/* <div className="inline-flex items-center gap-[9px] mb-3">
                      <h5 className="font-sora text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px]">
                        // PORTFOLIO OVERVIEW
                      </h5>
                    </div> */}
                    <h2 className="section-title m-0 font-semibold text-[clamp(28px,3vw,40px)] tracking-[-0.016em]">
                      Explore Our Parks
                    </h2>
                  </div>
                </>
              )}

              {/* Left panel — state map (full-width, stacked on top for mobile) */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="2xl:w-[45%] w-[42%] hidden lg:flex items-center justify-center relative pt-20 px-5 pb-10 max-lg:w-full max-lg:pl-0 max-lg:pt-2 max-lg:px-8 max-lg:pb-2"
              >
                <div
                  className="relative w-full max-w-[500px] max-lg:max-w-[260px] max-lg:mx-auto"
                  style={{ aspectRatio: `${dvw}/${dvh}` }}
                >
                  <StateSVG
                    path={detailPath}
                    vx={dvx}
                    vy={dvy}
                    vw={dvw}
                    vh={dvh}
                    fill="rgba(197, 189, 172, 0.80)"
                    stroke="#a8a196"
                  />
                  {/* Markers */}
                  {parks.map((park, i) => (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${park.mx}%`,
                        top: `${park.my}%`,
                      }}
                    >
                      <Marker />
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="2xl:w-[45%] w-[42%] pl-10! flex lg:hidden items-center justify-center relative pt-20 px-5 pb-10 max-lg:w-full max-lg:pl-0 max-lg:pt-2 max-lg:px-8 max-lg:pb-2"
              >
                <div
                  //
                  className="relative w-full max-w-[500px] max-lg:max-w-[260px] max-lg:mx-auto"
                  style={{ aspectRatio: `${dvw}/${dvh}` }}
                >
                  <StateSVG
                    path={detailPath}
                    vx={dvx}
                    vy={dvy}
                    vw={dvw}
                    vh={dvh}
                    fill="rgba(197, 189, 172, 0.80)"
                    stroke="#a8a196"
                  />
                  {/* Markers */}
                  {parks.map((park, i) => (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${park.mx}%`,
                        top: `${park.my}%`,
                      }}
                    >
                      <Marker />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right panel — cards (stacked below the map on mobile) */}
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.05,
                }}
                className="w-[55%] flex flex-col justify-center max-[1500px]:justify-around pt-[120px] pr-12 pb-10 pl-20 xl:gap-10.5 2xl:gap-1 1920:gap-10 max-lg:w-full max-lg:justify-start max-lg:pt-2 max-lg:pr-4 max-lg:pl-4 max-lg:pb-0"
              >
                {/* Header pill — matches parks.html dropdown pill */}
                <div className="self-start min-w-[320px] mb-0 max-lg:min-w-0 max-lg:w-full max-lg:mb-3">
                  <div className="flex items-center lg:my-6! 2xl:my-0 justify-between gap-5 h-[50px] 2xl:h-[60px] px-[30px] max-lg:h-[42px] max-lg:px-5 bg-black/10 border border-white/16 rounded-[999px] backdrop-blur-[8px]">
                    <span className="font-[family-name:var(--font-sora),sans-serif] font-medium text-[22px] max-lg:text-[17px] text-black">
                      {st.label}
                    </span>
                    <span className="font-[family-name:var(--font-sora),sans-serif] text-xl max-lg:text-base">
                      <span className="text-black">
                        {String(activeCard + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[#696D76]">
                        {" "}
                        / {String(total).padStart(2, "0")}
                      </span>
                    </span>
                  </div>
                </div>

                {isMH ? (
                  isMobileBP ? (
                    // ── Mobile Maharashtra carousel: one horizontal StateCard
                    // per swipeable slide, native scroll-snap (no new deps),
                    // kept in sync with activeCard/setActiveCard by the
                    // mhScrollRef effect above so the NavArrows below still
                    // mirror the desktop prev/next behaviour. ──
                    <div
                      ref={mhScrollRef}
                      data-lenis-prevent
                      onScroll={(e) => {
                        if (mhProgrammaticScrollRef.current) return;
                        const el = e.currentTarget;
                        if (!el.clientWidth) return;
                        const idx = Math.round(el.scrollLeft / el.clientWidth);
                        const clamped = Math.max(
                          0,
                          Math.min(idx, parks.length - 1),
                        );
                        setActiveCard((c) => (c === clamped ? c : clamped));
                      }}
                      className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                    >
                      {parks.map((park) => (
                        <div
                          key={park.name}
                          className="w-full flex-[0_0_100%] snap-center"
                        >
                          <StateCard park={park} winW={winW} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative w-80 h-[470px]">
                      {parks.map((park, i) => {
                        const total = parks.length;

                        // ── INFINITE LOOP INDEX CALCULATIONS ──
                        let rel = (i - activeCard) % total;
                        if (rel < 0) rel += total;

                        if (rel > total / 2) rel -= total;

                        const isVisible = rel >= 0 && rel <= 2;
                        const effectiveRel = isVisible ? rel : 3;

                        // StateCard's own width breakpoints (see its w-[245px] /
                        // w-65 / 2xl:w-80 classes below) — mirrored here so the
                        // stack's overlap % stays the same at every width instead
                        // of only matching the tuned 320px (2xl) card.
                        const is1272 = winW >= 1260 && winW <= 1320;
                        const cardW = winW >= 1536 ? 320 : is1272 ? 245 : 260;

                        // Ratios below are the original tx values (245/400/70)
                        // divided by the 320px card they were tuned for — keeps
                        // the already-correct >=1536px overlap identical while
                        // scaling proportionally for narrower cards.
                        let tx = 0;
                        if (effectiveRel === 1) tx = cardW * (245 / 320);
                        if (effectiveRel === 2) tx = cardW * (400 / 320);
                        if (effectiveRel === 3) tx = cardW * (70 / 320);

                        const ty = effectiveRel * 8;
                        const sc = 1 - effectiveRel * 0.14;

                        const op =
                          rel === 0 ? 1 : rel === 1 ? 0.8 : rel === 2 ? 0.3 : 0;

                        const zIdx = 10 - effectiveRel;

                        return (
                          <motion.div
                            key={park.name}
                            animate={{
                              x: tx,
                              y: ty,
                              scale: sc,
                              opacity: op,
                              visibility: op === 0 ? "hidden" : "visible",
                            }}
                            transition={{
                              duration: 0.5,
                              ease: [0.22, 0.61, 0.36, 1],
                            }}
                            className="absolute top-0 left-0"
                            style={{
                              zIndex: zIdx,
                              pointerEvents: rel === 0 ? "auto" : "none",
                            }}
                          >
                            <StateCard park={park} winW={winW} />
                          </motion.div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  <StateCard park={parks[0]} winW={winW} />
                )}

                {/* ── Only render arrows when there are 2 or more parks ── */}
                {parks.length > 1 && (
                  <div className="flex gap-1.75 1920:mb-10! 1920:mt-0! mt-[clamp(18px,2vw,28px)] max-lg:justify-center">
                    <NavArrow
                      direction="prev"
                      tone="dark"
                      className="w-14!"
                      disabled={isMobileBP && activeCard === 0}
                      onClick={() =>
                        setActiveCard((c) =>
                          // Mobile: stop at the first card, don't wrap.
                          // Desktop's stacked view is unchanged.
                          isMobileBP
                            ? Math.max(0, c - 1)
                            : (c - 1 + parks.length) % parks.length,
                        )
                      }
                    />
                    <NavArrow
                      direction="next"
                      tone="dark"
                      className="w-14!"
                      disabled={isMobileBP && activeCard === parks.length - 1}
                      onClick={() =>
                        setActiveCard((c) =>
                          // Mobile: stop at the last card, don't wrap
                          // back to the first. Desktop is unchanged.
                          isMobileBP
                            ? Math.min(parks.length - 1, c + 1)
                            : (c + 1) % parks.length,
                        )
                      }
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })()}
    </AnimatePresence>
  );

  if (isMobileBP) {
    return (
      <div ref={trackRef} className="relative bg-[#EEEDF0] py-10 px-4">
        {/* Hidden off-screen mount so the mhShape-measurement effect above
            can still find the real INMH path and getBBox() it — MH_PATH's
            own hand-tuned vx/vy/vw/vh undershoots its actual geometry (the
            shape only fills a small corner of that box), which is why
            desktop never renders MH_PATH directly and always prefers this
            runtime-measured shape instead. */}
        <div
          ref={svgContRef}
          aria-hidden
          className="absolute top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none -z-10"
        >
          <SVGScroll />
        </div>
        <div className="text-center mb-8">
          {/* {!hideEyebrow && (
            <div className="inline-flex items-center gap-[9px] mb-3">
              <h1 className="font-sora text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px]">
                // PORTFOLIO OVERVIEW
              </h1>
            </div>
          )} */}
          <h2 className="section-title m-0 font-semibold text-[clamp(28px,3vw,40px)] tracking-[-0.016em]">
            Explore Our Parks
          </h2>
        </div>

        {STATES.map((st, idx) => {
          const parks = PARKS[st.id] ?? [];
          const isMH = st.id === "INMH";
          const isComingSoon = st.id === "INTN";
          // Maharashtra's hand-tuned vx/vy/vw/vh undershoots the actual
          // MH_PATH geometry — same runtime-measured override desktop uses.
          const measured = isMH ? mhShape : null;
          const svgPath = measured ? measured.path : st.path;
          const svgVx = measured ? measured.x : st.vx;
          const svgVy = measured ? measured.y : st.vy;
          const svgVw = measured ? measured.width : st.vw;
          const svgVh = measured ? measured.height : st.vh;

          return (
            <div
              key={st.id}
              className={`pb-8 mb-8 ${idx < STATES.length - 1 ? "border-b border-[#B9B9B9]" : ""}`}
            >
              <button
                type="button"
                onClick={() => {
                  // Chennai has no park page yet — tapping its map only
                  // toggles the "Coming Soon" tooltip, same as desktop hover.
                  if (isComingSoon) {
                    setHoveredState((h) => (h === st.id ? null : st.id));
                    return;
                  }
                  setSelectedState(st.id);
                  setActiveCard(0);
                }}
                className="flex flex-col items-center w-full bg-transparent border-0 p-0 cursor-pointer"
              >
                <div
                  className="relative w-full max-w-[300px] mx-auto"
                  style={{ aspectRatio: `${svgVw}/${svgVh}` }}
                >
                  <StateSVG
                    path={svgPath}
                    vx={svgVx}
                    vy={svgVy}
                    vw={svgVw}
                    vh={svgVh}
                    fill="rgba(203, 196, 181, 0.70)"
                    stroke="#9D9D9D"
                  />
                  {parks.map((park, i) => (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${park.mx}%`, top: `${park.my}%` }}
                    >
                      <Marker active />
                      {/* "Coming Soon" tooltip — Chennai only, anchored to
                          this marker point, toggled by tapping the map */}
                      {isComingSoon && hoveredState === st.id && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30 pointer-events-none">
                          <div className="bg-cream text-[#212121] text-[20px] font-medium px-4 py-2 rounded-lg shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] whitespace-nowrap">
                            Coming Soon
                          </div>
                          <div className="w-3 h-3 bg-cream rotate-45 mx-auto -mt-1.5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center w-full max-w-[260px]">
                  <span className="font-[family-name:var(--font-sora),sans-serif] font-normal text-lg text-[#212121] tracking-[0.06em]">
                    {st.label}
                  </span>
                  <div className="leading-[1.4] font-[family-name:var(--font-sora),sans-serif] text-[28px] text-black/50">
                    {st.count}
                  </div>
                </div>
              </button>
            </div>
          );
        })}

        {renderDetailOverlay("fixed inset-0")}
      </div>
    );
  }

  return (
    // Always exactly one screen tall — never resized, at any point, for any
    // reason. That's what guarantees there's never a gap: there's nothing to
    // shrink later. While capturing, the inner content is pinned via
    // `position: fixed` instead (see below), which — unlike `sticky` — takes
    // it out of flow entirely, so this wrapper's own height never has to
    // change to accommodate it.
    <div ref={trackRef} className="relative h-screen">
      <div
        className={`h-screen overflow-hidden bg-[#EEEDF0] ${
          // `fixed` only while actively capturing wheel input for the
          // reveal — never `sticky`, so there's nothing pinned once that's
          // done, in either scroll direction, ever again.
          isCapturing ? "fixed inset-0" : "relative"
        }`}
      >
        <div className="absolute bottom-0 left-0 h-10 1920:h-[400px] w-full bg-gradient-to-b from-transparent to-[#EEEDF0] z-40 from-10% to-90%" />
        {/* <div className="absolute top-0 left-0 h-10 1920:h-[360px] w-full bg-gradient-to-t from-transparent to-[#EEEDF0] z-40" /> */}
        <div className="absolute top-0 left-0 h-10 1920:h-[360px] w-full bg-gradient-to-t from-transparent to-[#EEEDF0] z-40" />
        {/* World map background — India lines up with SVGScroll's India shape.
            Wrapper matches the parent box exactly (inset-0) on desktop, so all
            percentage/absolute children below render identically to before.
            On mobile it insets 6% each side, which shrinks + recenters the
            world map image and the three mapcircle dots together without
            needing to hand-tune each child's own offsets. */}
        <div className="absolute inset-0 max-lg:inset-x-[6%] pointer-events-none">
          <motion.div
            // className="absolute top-0 left-10 z-1 pointer-events-none w-[95%]"
            // className="absolute w-full 2xl:w-[95%]! 1600:-top-3 2xl:left-10 1600:left-[48px] -top-2  1920:left-[165px] 1920:top-[45px] 1920:w-[64%]! z-1 pointer-events-none max-lg:hidden"
            className="absolute w-full 2xl:w-[95%] 1600:-top-3 2xl:left-10 1600:left-[48px] -top-2 1920:left-[165px] 1920:top-[45px] 1920:w-[83.7%]! z-1 pointer-events-none max-lg:hidden"
            style={{
              opacity: indiaOpacityValue,
              scale: indiaScaleValue,
            }}
          >
            <img src="/home/worldmap.webp" alt="" className="w-full h-auto" />
          </motion.div>
          <motion.div
            style={{
              opacity: indiaOpacityValue,
              scale: indiaScaleValue,
            }}
            className="absolute z-[101] max-lg:hidden 1920:top-[63%] 1920:left-[44%] top-[67%] left-[43%] w-10 h-10"
          >
            <img
              src="/home/map/mapcircle.svg"
              className="w-full h-full"
              alt=""
            />
          </motion.div>
          <motion.div
            style={{
              opacity: indiaOpacityValue,
              scale: indiaScaleValue,
            }}
            className="absolute z-[101] max-lg:hidden 1920:top-[72%] 1920:left-[44.5%] top-[79%] left-[43.3%] w-10 h-10"
          >
            <img
              src="/home/map/mapcircle.svg"
              className="w-full h-full"
              alt=""
            />
          </motion.div>
          <motion.div
            style={{
              opacity: indiaOpacityValue,
              scale: indiaScaleValue,
            }}
            className="absolute z-[101] max-lg:hidden 1920:top-[79%] 1920:left-[47%] top-[88%] 2xl:top-[87%] left-[47%] 2xl:left-[47.5%] w-10 h-10"
          >
            <img
              src="/home/map/mapcircle.svg"
              className="w-full h-full"
              alt=""
            />
          </motion.div>
        </div>

        <div
          className="absolute inset-y-0 right-0 z-1 pointer-events-none"
          style={{
            width: "var(--container-gap)",
            background:
              "linear-gradient(to left, #EEEDF0, rgba(238,237,240,0))",
          }}
        />

        {/* Section header */}
        <div className="absolute z-52 1920:top-20 top-5 left-0 right-0 z-6 text-center pointer-events-none max-lg:px-4">
          {/* {!hideEyebrow && (
            <div className="inline-flex items-center gap-[9px] mb-3">
              <h1 className="font-sora text-[#59624D] font-normal text-[12px] uppercase tracking-[-0.24px]">
                // PORTFOLIO OVERVIEW
              </h1>
            </div>
          )} */}
          <h2 className="section-title m-0 font-semibold text-[clamp(28px,3vw,40px)] tracking-[-0.016em]">
            Explore Our Parks
          </h2>
        </div>

        <motion.div
          className="absolute left-1/2 top-1/2 z-[100]! pointer-events-none w-137.5 h-137.5"
          style={{
            opacity: indiaOpacityValue,
            scale: indiaContainerScaleValue,
            x: "-50%",
            y: "-50%",
          }}
        >
          <div
            ref={svgContRef}
            className="w-125 h-125 origin-top-left pointer-events-none"
            style={{ transform: `scale(${SCALE})` }}
          >
            <SVGScroll />
          </div>
        </motion.div>

        {/* Desktop-only: states detach from India and fly out to fixed positions as
            the user scrolls. On mobile the same three states stay highlighted in
            place directly on the India map above (see the mobile highlight/click
            effect near the top of this component) — no separate rendering here. */}
        {!isMobileBP &&
          STATES.map((state) => {
            const { id, label, count, cx, cy, finalDX, finalDY } = state;
            const viewportScale = winW <= 1260 ? 0.78 : winW <= 1440 ? 0.9 : 1;

            const measured = id === "INMH" ? mhShape : null;
            const path = measured ? measured.path : state.path;
            const vx = measured ? measured.x : state.vx;
            const vy = measured ? measured.y : state.vy;
            const vw = measured ? measured.width : state.vw;
            const vh = measured ? measured.height : state.vh;

            // const scaleFactor = id === "INKA" ? 1.25 : id === "INTN" ? 1.25 : 1;
            const responsiveBoost = winW <= 1536 ? 0.92 : 1;

            const scaleFactor =
              (id === "INKA" ? 1.25 : id === "INTN" ? 1.25 : 1) *
              responsiveBoost;
            const shapeH = STATE_H * scaleFactor * viewportScale;
            const shapeW = (vw / vh) * shapeH;

            // Same fade window/target as `indiaScaleValue` above — always
            // equal to it here, since this only ever renders on desktop.
            const startDX = (cx - 500) * SCALE * indiaScaleValue;
            const startDY = (cy - 500) * SCALE * indiaScaleValue;

            const rawP = Math.max(
              0,
              Math.min(
                1,
                (effectiveProgress - STATE_TRAVEL_START) /
                  (STATE_TRAVEL_END - STATE_TRAVEL_START),
              ),
            );
            const travelP = easeOutQuart(rawP);

            const layoutScale =
              winW <= 1260
                ? 0.78
                : winW <= 1440
                  ? 0.88
                  : winW <= 1536
                    ? 0.95
                    : 1;

            let responsiveOffset = 0;

            if (winW <= 1536 && winW > 1260) {
              switch (id) {
                case "INMH":
                  responsiveOffset = 45; // Maharashtra → move right
                  break;

                case "INKA":
                  responsiveOffset = -20; // Bengaluru → move slightly left
                  break;

                case "INTN":
                  responsiveOffset = -45; // Chennai → move left
                  break;
              }
            }

            const adjustedFinalDX = finalDX * layoutScale + responsiveOffset;

            const curDX = startDX + (adjustedFinalDX - startDX) * travelP;
            const curDY = startDY + (finalDY - startDY) * travelP;
            const svgScale = 0.38 + 0.62 * travelP;

            const alpha = Math.max(0, Math.min(1, rawP / 0.25));
            // const labelAlpha = Math.max(0, Math.min(1, (rawP - 0.72) / 0.22));
            const labelAlpha = Math.max(0, Math.min(1, (rawP - 0.3) / 0.22));

            const isInteractive = rawP >= 0.05 && selectedState === null;
            const fillColor = hoveredState === id ? "#C5BDAC" : "#CBC4B5";
            // Chennai (Tamil Nadu) has no park page yet — it shows the
            // default arrow cursor (not the pointer) and the hover tooltip
            // below, and clicking it never opens the detail view (unlike
            // Maharashtra/Bengaluru).
            const isComingSoon = id === "INTN";

            return (
              <div
                key={id}
                className="absolute z-[100]! will-change-transform"
                style={{
                  // left/top are STATIC now — only the base "centered,
                  // shapeW/2-adjusted" position, computed once per render
                  // from values (shapeW) that only change on
                  // resize/breakpoint, not every animation frame. The
                  // actual per-frame motion (curDX/curDY, which DO change
                  // every rAF tick while traveling) moves via `transform:
                  // translate()` below instead of left/top's calc(). left/
                  // top are layout properties — animating them forces the
                  // browser to recompute layout for this subtree on every
                  // single frame (3 states x 60fps while traveling), which
                  // is real, avoidable main-thread cost landing exactly in
                  // the "three states open" window and is what actually
                  // produced the reported jerk (the previous DOM-attribute
                  // fix addressed a real but much smaller per-frame cost
                  // elsewhere in this file — this was the dominant one).
                  // `transform` is compositor-only: no layout, no paint of
                  // anything else, just a GPU-composited translate — which
                  // is also what `will-change-transform` above was already
                  // hinting for, except the animated property used to be
                  // left/top, not transform, making that hint a no-op.
                  left: `calc(50% - ${(shapeW / 2).toFixed(2)}px)`,
                  top: "calc(50% - 180px)",
                  transform: `translate(${curDX.toFixed(2)}px, ${curDY.toFixed(2)}px)`,
                  width: shapeW,
                  pointerEvents: isInteractive ? "auto" : "none",
                  opacity: alpha,
                }}
              >
                {/* ── VERTICAL DIVIDER LINE ── */}
                {id !== "INTN" && (
                  <div
                    className="absolute lg:-right-12 top-0 w-px h-[442px] bg-[#B9B9B9] transition-opacity duration-200 ease-in-out pointer-events-none"
                    style={{ opacity: labelAlpha }}
                  />
                )}

                <div className="relative flex items-center justify-center h-[220px] sm:h-[260px] lg:h-[300px] 2xl:h-[360px]">
                  {/* SVG Click Area */}
                  <svg
                    viewBox={`${vx} ${vy} ${vw} ${vh}`}
                    width={shapeW}
                    height={shapeH}
                    className={`block overflow-visible origin-center ${
                      isInteractive && !isComingSoon
                        ? "cursor-pointer"
                        : "cursor-default"
                    }`}
                    style={{ transform: `scale(${svgScale.toFixed(4)})` }}
                    onMouseEnter={() => isInteractive && setHoveredState(id)}
                    onMouseLeave={() => isInteractive && setHoveredState(null)}
                    onClick={() => {
                      // Chennai has no park page yet — normal arrow cursor on
                      // hover, and clicking it never opens the detail view.
                      if (isComingSoon) return;
                      setSelectedState(id);
                      setActiveCard(0);
                      setHoveredState(null);
                    }}
                  >
                    <path
                      d={path}
                      fill={
                        isInteractive && hoveredState === id
                          ? "#CBC4B5"
                          : "rgba(203, 196, 181, 0.70)"
                      }
                      stroke="#9D9D9D"
                      strokeWidth="0.7"
                      strokeLinejoin="round"
                      className="transition-[fill] duration-300 ease-in-out"
                    />
                  </svg>

                  {/* Marker Click Area */}
                  <div
                    className="absolute origin-center pointer-events-none transition-opacity duration-200 ease-in-out z-5"
                    style={{
                      width: shapeW,
                      height: shapeH,
                      transform: `scale(${svgScale.toFixed(4)})`,
                      opacity: labelAlpha,
                    }}
                  >
                    {(PARKS[id] ?? []).map((park, i) => (
                      <div
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${park.mx}%`,
                          top: `${park.my}%`,
                          pointerEvents: labelAlpha > 0.2 ? "auto" : "none",
                        }}
                      >
                        <Marker
                          active={true}
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   setSelectedState(id);
                          //   setActiveCard(i);
                          //   setHoveredState(null);
                          // }}
                        />
                        {/* "Coming Soon" tooltip — Chennai only, anchored to
                            this marker point, shown on hover */}
                        {isComingSoon && hoveredState === id && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30 pointer-events-none">
                            <div className="bg-cream text-[#212121] text-[20px] font-medium px-4 py-2 rounded-lg shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] whitespace-nowrap">
                              Coming Soon
                            </div>
                            <div className="w-3 h-3 bg-cream rotate-45 mx-auto -mt-1.5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── STATE INFO TEXT LABELS ── */}
                <div
                  className="mt-10 relative flex justify-between 2xl:justify-between items-center w-full min-w-[180px]! xl:min-w-[280px] 2xl:min-w-[320px] h-[60px]"
                  style={{ opacity: labelAlpha }}
                >
                  <span className="font-[family-name:var(--font-sora),sans-serif] font-normal text-lg text-[#212121] tracking-[0.06em]">
                    {label}
                  </span>
                  <div className="leading-[1.4] font-[family-name:var(--font-sora),sans-serif] text-[28px] mb-2 text-black/50">
                    {count}
                  </div>
                </div>
              </div>
            );
          })}

        {renderDetailOverlay("absolute inset-0")}
      </div>
    </div>
  );
}
