import { TrendingUp, Gamepad2, Award, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function ProfileStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const AnimatedNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [value, isVisible]);

    return <span>{displayValue}</span>;
  };

  return (
    <div ref={sectionRef} className="mb-20">
      <div className="max-w-4xl mx-auto">
        {/* Main Intro Card */}
        <div
          className={`relative bg-gradient-to-br from-gray-900/80 via-gray-800/40 to-black/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 p-8 md:p-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decorative Elements - Animated */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-600/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-700/10 rounded-full blur-3xl animate-pulse-slow-delayed" />

          <div className="relative space-y-8">
            {/* Greeting */}
            <div
              className={`space-y-4 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="inline-block px-4 py-2 bg-gray-700/30 border border-gray-600/30 rounded-full animate-scale-in">
                <span className="text-gray-300 animate-shimmer">
                  👋 Hi! Let me introduce myself
                </span>
              </div>

              <h2 className="text-white leading-relaxed">
                I've played Mobile Legends for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 animate-gradient">
                  more than 1000 matches
                </span>{" "}
                and still grinding to this day.
              </h2>
            </div>

            {/* Stats Story */}
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p
                className={`text-lg transition-all duration-700 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                From all the matches I've played, my win rate stands at{" "}
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700/40 border border-gray-600/40 rounded-lg text-gray-200 hover:scale-110 transition-transform hover:bg-gray-700/60 cursor-default">
                  <TrendingUp className="w-4 h-4 animate-bounce" />
                  {isVisible && <AnimatedNumber value={67} />}%
                </span>{" "}
                — pretty good for putting pressure on enemies.
              </p>

              <p
                className={`text-lg transition-all duration-700 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                My total wins have reached{" "}
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700/40 border border-gray-600/40 rounded-lg text-gray-200 hover:scale-110 transition-transform hover:bg-gray-700/60 cursor-default">
                  <Award className="w-4 h-4 animate-float" />
                  {isVisible && <AnimatedNumber value={844} />} wins
                </span>{" "}
                with{" "}
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700/40 border border-gray-600/40 rounded-lg text-gray-200 hover:scale-110 transition-transform hover:bg-gray-700/60 cursor-default">
                  <Target className="w-4 h-4 animate-spin-slow" />
                  {isVisible && <AnimatedNumber value={234} />} MVP
                </span>
                . Love being the team carry!
              </p>

              <p
                className={`text-lg transition-all duration-700 delay-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                Currently sitting comfortably at rank{" "}
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg text-white shadow-lg shadow-gray-900/50 border border-gray-600/50 hover:scale-110 transition-all hover:shadow-gray-700/50 cursor-default animate-gradient">
                  <Gamepad2 className="w-5 h-5 animate-float-slow" />
                  Mythic III
                </span>{" "}
                and my next target is to reach Mythical Glory.
              </p>
            </div>

            {/* Play Style */}
            <div
              className={`pt-6 border-t border-white/10 transition-all duration-700 delay-900 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-white mb-4">My Play Style:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-gray-500/50 transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-700/30 cursor-default animate-scale-in"
                  style={{ animationDelay: "1s" }}
                >
                  <div
                    className="text-3xl mb-2 animate-bounce"
                    style={{ animationDelay: "1s" }}
                  >
                    ⚔️
                  </div>
                  <div className="text-gray-200 mb-1">45% Fighter</div>
                  <div className="text-gray-600">Main role</div>
                </div>
                <div
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-gray-500/50 transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-700/30 cursor-default animate-scale-in"
                  style={{ animationDelay: "1.2s" }}
                >
                  <div
                    className="text-3xl mb-2 animate-bounce"
                    style={{ animationDelay: "1.2s" }}
                  >
                    🛡️
                  </div>
                  <div className="text-gray-200 mb-1">30% Tank</div>
                  <div className="text-gray-600">When team needs</div>
                </div>
                <div
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-gray-500/50 transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-700/30 cursor-default animate-scale-in"
                  style={{ animationDelay: "1.4s" }}
                >
                  <div
                    className="text-3xl mb-2 animate-bounce"
                    style={{ animationDelay: "1.4s" }}
                  >
                    ⚡
                  </div>
                  <div className="text-gray-200 mb-1">25% Assassin</div>
                  <div className="text-gray-600">For fun</div>
                </div>
              </div>
            </div>

            {/* Closing */}
            <div
              className={`pt-6 transition-all duration-700 delay-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-gray-500 italic animate-shimmer">
                "Here are my top 3 go-to heroes that I can always rely on in
                every match 👇"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
