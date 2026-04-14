import Image from "next/image";

interface Props {
  size?:      number;
  opacity?:   number;
  rotate?:    number;   // degrees
  className?: string;
}

/**
 * Ghost AZ logo watermark — drop inside any `position: relative` section.
 * Pure server component, zero JS.
 */
export default function AZWatermark({
  size    = 420,
  opacity = 0.028,
  rotate  = 0,
  className = "",
}: Props) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        width:   size,
        height:  size,
        opacity,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
      aria-hidden="true"
    >
      <Image
        src="/brand/az-logo.png"
        alt=""
        fill
        className="object-contain"
        sizes={`${size}px`}
        loading="lazy"
      />
    </div>
  );
}
