"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface VideoModalCtx {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const VideoModalContext = createContext<VideoModalCtx>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <VideoModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  return useContext(VideoModalContext);
}
