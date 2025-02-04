import Image from "next/image";

interface IconProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function Icon({
  src,
  alt,
  width,
  height,
  className,
}: IconProps) {
  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
