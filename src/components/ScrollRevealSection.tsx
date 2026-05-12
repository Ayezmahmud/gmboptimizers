import { ReactNode } from "react";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  scaleFrom?: number;
  clipReveal?: boolean;
  parallaxZoom?: boolean;
  delay?: number;
}

/**
 * Scroll reveal disabled site-wide — renders children plainly.
 */
const ScrollRevealSection = ({ children, className = "" }: ScrollRevealSectionProps) => (
  <div className={className}>{children}</div>
);

export const ScrollParallaxImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className={`overflow-hidden ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
  </div>
);

export const ScrollTextReveal = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const ScrollStaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) => <div className={className}>{children}</div>;

export default ScrollRevealSection;
