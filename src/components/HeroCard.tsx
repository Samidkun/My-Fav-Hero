import { Hero } from "../types/hero";
import { Sword, Shield, Zap, ArrowRight } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";

interface HeroCardProps {
  hero: Hero;
  onClick: () => void;
}

export function HeroCard({ hero, onClick }: HeroCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes("fighter")) return Sword;
    if (role.toLowerCase().includes("tank")) return Shield;
    if (role.toLowerCase().includes("assassin")) return Zap;
    return Sword;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on mouse position (-15 to 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const RoleIcon = getRoleIcon(hero.role);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-gray-700/50 hover:border-gray-500/80 transition-all duration-500 cursor-pointer"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg) translateY(-8px) scale(1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(107, 114, 128, 0.2)"
          : "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Gradient Overlay on Hover - Animated */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-700/0 to-gray-800/0 transition-all duration-500 z-10 pointer-events-none ${
          isHovered ? "from-gray-700/20 to-gray-800/20 animate-gradient" : ""
        }`}
      />

      {/* Shimmer Effect */}
      {isHovered && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      )}

      {/* Hero Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={hero.image}
          alt={hero.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0"
          style={{
            transform: isHovered
              ? `scale(1.15) translateY(${mousePosition.x * 2}px)`
              : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Role Icon - Floating */}
        <div
          className={`absolute top-4 right-4 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 group-hover:bg-gray-700/30 group-hover:border-gray-500/30 transition-all duration-300 ${
            isHovered ? "animate-float" : ""
          }`}
        >
          <RoleIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors" />
        </div>

        {/* Hero Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white mb-1 group-hover:animate-shimmer">
            {hero.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-400">
            <span>{hero.role}</span>
            <span className="text-gray-600">•</span>
            <span>{hero.specialty}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Preview */}
      <div className="relative z-20 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-lg p-3 border border-white/5 group-hover:border-gray-600/30 transition-all group-hover:animate-scale-in">
            <div className="text-gray-500 mb-1">Offense</div>
            <div className="text-white">{hero.stats.offense}</div>
          </div>
          <div
            className="bg-white/5 rounded-lg p-3 border border-white/5 group-hover:border-gray-600/30 transition-all group-hover:animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="text-gray-500 mb-1">Durability</div>
            <div className="text-white">{hero.stats.durability}</div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="flex items-center justify-between text-gray-400 group-hover:text-gray-200 transition-colors pt-2">
          <span>View Details</span>
          <ArrowRight
            className={`w-5 h-5 transition-transform ${
              isHovered ? "translate-x-2 animate-bounce" : ""
            }`}
          />
        </div>
      </div>

      {/* Glow Effect on Bottom */}
      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-shimmer" />
      )}
    </div>
  );
}
