import { useState, MouseEvent } from "react";
import { ChevronRight, Sparkles, Gamepad2 } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const slides = [
    {
      icon: Sparkles,
      title: "Welcome!",
      subtitle: "My Heroes Collection",
      description:
        "Meet my 3 main heroes in Mobile Legends. Fought 1000+ matches with them! 🎮",
      gradient: "from-gray-700 via-gray-600 to-gray-500",
    },
    {
      icon: Gamepad2,
      title: "Ready to Explore?",
      subtitle: "Skills, Stats & Pro Tips",
      description:
        "Click on a hero to see detailed skills, strengths & weaknesses, plus tips & tricks I use to win! 🔥",
      gradient: "from-gray-600 via-gray-500 to-gray-700",
    },
  ];

  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleStart = (e: MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    setIsAnimating(true);
    setTimeout(() => {
      onComplete();
      localStorage.setItem("hasSeenOnboarding", "true");
    }, 300);
  };

  const handleSkip = (e: MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    setIsAnimating(true);
    setTimeout(() => {
      onComplete();
      localStorage.setItem("hasSeenOnboarding", "true");
    }, 300);
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center animate-gradient">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-gray-600/20 to-gray-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-gray-700/15 via-gray-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow-delayed" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Content */}
      <div className="relative max-w-2xl mx-auto px-6 w-full">
        <div
          className={`transition-all duration-300 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {/* Icon - Floating with Rotation */}
          <div className="flex justify-center mb-8 animate-fadeIn">
            <div
              className={`p-6 bg-gradient-to-br ${currentSlideData.gradient} rounded-3xl shadow-2xl shadow-gray-900/50 animate-float animate-gradient`}
            >
              <Icon className="w-16 h-16 text-white animate-spin-slow" />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-6 mb-12">
            <div className="space-y-2">
              <p className="text-gray-400 animate-slide-in-left">
                {currentSlideData.subtitle}
              </p>
              <h1
                className="text-white animate-slideUp bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text animate-shimmer"
                style={{ backgroundSize: "200% auto" }}
              >
                {currentSlideData.title}
              </h1>
            </div>
            <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed animate-slide-in-right">
              {currentSlideData.description}
            </p>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mb-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentSlide) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setIsAnimating(false);
                    }, 300);
                  }
                }}
                className={`transition-all duration-300 rounded-full hover:scale-110 ${
                  index === currentSlide
                    ? "w-12 h-3 bg-gradient-to-r from-gray-400 to-gray-500 animate-shimmer"
                    : "w-3 h-3 bg-gray-700 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentSlide < slides.length - 1 ? (
              <>
                <button
                  onClick={handleSkip}
                  className="relative overflow-hidden text-gray-400 hover:text-gray-200 transition-all px-6 py-3 hover:scale-110"
                >
                  Skip
                  {ripples.map((ripple) => (
                    <span
                      key={ripple.id}
                      className="absolute bg-gray-400/30 rounded-full animate-[ripple_0.6s_ease-out]"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 10,
                        height: 10,
                      }}
                    />
                  ))}
                </button>
                <button
                  onClick={handleNext}
                  className="group relative overflow-hidden flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg shadow-gray-900/50 transition-all hover:scale-110 hover:shadow-xl hover:shadow-gray-700/50 animate-gradient"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 group-hover:animate-bounce transition-transform" />
                  {ripples.map((ripple) => (
                    <span
                      key={ripple.id}
                      className="absolute bg-white/30 rounded-full animate-[ripple_0.6s_ease-out]"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 10,
                        height: 10,
                      }}
                    />
                  ))}
                </button>
              </>
            ) : (
              <button
                onClick={handleStart}
                className="group relative overflow-hidden flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 hover:from-gray-500 hover:via-gray-600 hover:to-gray-500 text-white rounded-xl shadow-2xl shadow-gray-900/50 transition-all hover:scale-125 hover:shadow-gray-700/50 text-lg animate-gradient animate-pulse"
              >
                <span>Start</span>
                <Sparkles className="w-6 h-6 group-hover:rotate-12 group-hover:animate-bounce transition-transform" />
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-[ripple_0.6s_ease-out]"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 10,
                      height: 10,
                    }}
                  />
                ))}
              </button>
            )}
          </div>

          {/* Progress Text */}
          <div className="text-center mt-8">
            <p className="text-gray-600 animate-fadeIn">
              {currentSlide + 1} / {slides.length}
            </p>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-500/20 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
