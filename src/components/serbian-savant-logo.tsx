import type { SVGProps } from 'react';

const SerbianSavantLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg width="100" height="30" viewBox="0 0 100 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text x="5" y="22" fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="18" fontWeight="bold">
      Serbian
    </text>
    <text x="50" y="22" fontFamily="var(--font-geist-sans), system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="hsl(var(--accent))">
      Savant
    </text>
  </svg>
);

export default SerbianSavantLogo;
