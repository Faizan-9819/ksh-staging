"use client";

import { createContext, useCallback, useContext, useRef } from "react";

interface FormSubmitCtx {
  /** Called by a form on successful submission, right before redirecting to /thank-you. */
  grantAccess: () => void;
  /** Called by /thank-you on mount — consumes the grant and reports whether it was valid. */
  syncAccess: () => boolean;
  /** Called by /thank-you on unmount/unload so the grant is single-use. */
  revokeAccess: () => void;
}

const FormSubmitContext = createContext<FormSubmitCtx | null>(null);

// Guards /thank-you against direct navigation: only a form that actually
// called grantAccess() right before router.push("/thank-you") can land
// there and stay — anyone else typing/bookmarking the URL gets bounced to
// "/". A ref (not state) because the grant only needs to survive the one
// synchronous navigation to /thank-you, not trigger a re-render.
export function FormSubmitProvider({ children }: { children: React.ReactNode }) {
  const hasAccessRef = useRef(false);

  const grantAccess = useCallback(() => {
    hasAccessRef.current = true;
  }, []);

  const syncAccess = useCallback(() => hasAccessRef.current, []);

  const revokeAccess = useCallback(() => {
    hasAccessRef.current = false;
  }, []);

  return (
    <FormSubmitContext.Provider value={{ grantAccess, syncAccess, revokeAccess }}>
      {children}
    </FormSubmitContext.Provider>
  );
}

export function useFormSubmit() {
  const ctx = useContext(FormSubmitContext);
  if (!ctx) {
    throw new Error("useFormSubmit must be used within a FormSubmitProvider");
  }
  return ctx;
}
