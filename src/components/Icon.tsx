interface IconProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

export default function Icon ({ src, alt, width, height}: IconProps) {
  return (
    <img 
      src={src} 
      alt={src} 
      width={width} 
      height={height} 
    />
  );
}