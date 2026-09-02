interface ArrowUpRightIconProps {
  className?: string;
  size?: number | string;
}

// Shared "right-up arrow" glyph used everywhere the site needs one (nav
// links, footer links, cards, tab accordions). Uses fill="currentColor" so
// every existing usage's text-color classes/inline color styles keep
// controlling the icon's color exactly as they did with the react-icons
// component this replaces.
export default function ArrowUpRightIcon({
  className,
  size = 16,
}: ArrowUpRightIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M15.5014 7.77825L-0.000484362 -3.91877e-06L3.99952 7.77817L-0.000484362 15.5563L15.5014 7.77825Z"
        fill="currentColor"
      />
    </svg>
  );
}
