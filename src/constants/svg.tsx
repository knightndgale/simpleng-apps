import { memo } from "react";
type SVGProps = {
  className?: string;
};

export const Hamburger: React.FC<SVGProps> = memo(function Hamburger({
  className,
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z"
        clipRule="evenodd"
      />
    </svg>
  );
});
