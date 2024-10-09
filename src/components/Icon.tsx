interface IconProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function Icon ({ src, alt, width, height, className }: IconProps) {
  return (
    <img
      className={className}
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
    />
  );
}