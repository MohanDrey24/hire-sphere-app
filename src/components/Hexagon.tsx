import { StringValidation } from "zod";

interface HexagonProps{
  size: "sm" | "md" | "lg";
  color: "blue" | 'red' | 'green';
  children?: React.ReactNode;
  className?: string;
}

const Hexagon = ({ 
  size = 'md', 
  color = 'blue', 
  children,
  className, 
}: HexagonProps) => {
  const sizeClasses = {
    sm: 'w-16 h-14',
    md: 'w-24 h-21',
    lg: 'w-32 h-28',
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        clip-path-hexagon 
        flex items-center justify-center
      `}
      style={{
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
      }}
    >
      {children}
    </div>
  );
};

export default Hexagon;