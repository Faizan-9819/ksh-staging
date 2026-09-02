"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface NavbarVisibilityCtx {
  forceHidden: boolean;
  hideNavbar: () => void;
  showNavbar: () => void;
}

const NavbarVisibilityContext = createContext<NavbarVisibilityCtx>({
  forceHidden: false,
  hideNavbar: () => {},
  showNavbar: () => {},
});

export function NavbarVisibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [forceHidden, setForceHidden] = useState(false);
  const hideNavbar = useCallback(() => setForceHidden(true), []);
  const showNavbar = useCallback(() => setForceHidden(false), []);

  return (
    <NavbarVisibilityContext.Provider
      value={{ forceHidden, hideNavbar, showNavbar }}
    >
      {children}
    </NavbarVisibilityContext.Provider>
  );
}

export function useNavbarVisibility() {
  return useContext(NavbarVisibilityContext);
}
