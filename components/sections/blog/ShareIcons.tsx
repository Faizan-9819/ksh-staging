interface ShareIconsProps {
  url: string;
  title: string;
}

export default function ShareIcons({ url, title }: ShareIconsProps) {
  const encodedUrl = encodeURIComponent(url);
  const whatsappMessage = encodeURIComponent(`${title} - ${url}`);

  return (
    <div className="flex md:flex-col flex-row gap-6 md:gap-5">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-10 h-10 rounded-full border border-[#cdcdcd] flex items-center justify-center text-[#212121] hover:bg-[#59624d] hover:text-white hover:border-[#59624d] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"
            fill="currentColor"
          />
        </svg>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-10 h-10 rounded-full border border-[#cdcdcd] flex items-center justify-center text-[#212121] hover:bg-[#59624d] hover:text-white hover:border-[#59624d] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.16 8.75h3.56V21H3.16V8.75ZM9.34 8.75h3.41v1.68h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.28 2.38 4.28 5.48V21h-3.56v-6.13c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.35 1.6-2.35 3.24V21H9.34V8.75Z"
            fill="currentColor"
          />
        </svg>
      </a>

      <a
        href={`https://wa.me/?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="w-10 h-10 rounded-full border border-[#cdcdcd] flex items-center justify-center text-[#212121] hover:bg-[#59624d] hover:text-white hover:border-[#59624d] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.36c0-4.52 3.68-8.2 8.24-8.2 2.2 0 4.27.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.81c0 4.52-3.68 8.2-8.23 8.2Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
