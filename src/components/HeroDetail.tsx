import { Hero } from "../types/hero";
import {
  ArrowLeft,
  Info,
  Zap,
  TrendingUp,
  TrendingDown,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";

interface HeroDetailProps {
  hero: Hero;
  onBack: () => void;
}

export function HeroDetail({ hero, onBack }: HeroDetailProps) {
  const [activeTab, setActiveTab] = useState<"skills" | "stats" | "tips">(
    "skills"
  );
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <div className="animate-fadeIn space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-all hover:scale-110"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      {/* Hero Header Card */}
      <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/5 animate-scale-in">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Hero Image Side */}
          <div className="relative h-96 lg:h-auto overflow-hidden group">
            <img
              src={hero.image}
              alt={hero.name}
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />

            {/* Shimmer overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>

          {/* Hero Info Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
            <div className="animate-slide-in-right">
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-3 animate-gradient">
                {hero.name}
              </h2>
              <div className="flex items-center gap-3 text-gray-400">
                <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 hover:scale-110 transition-transform hover:border-gray-500/30">
                  {hero.role}
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 hover:scale-110 transition-transform hover:border-gray-500/30">
                  {hero.specialty}
                </span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed animate-slide-in-left">
              {hero.description}
            </p>

            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(hero.stats).map(([key, value], index) => (
                <div
                  key={key}
                  className="space-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between text-gray-400">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span>{value}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transition-all duration-1000 animate-slideRight"
                      style={{
                        width: `${value}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1.5 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/5 max-w-md mx-auto animate-slide-in-left">
        <button
          onClick={() => setActiveTab("skills")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            activeTab === "skills"
              ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg scale-105"
              : "text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105"
          }`}
        >
          <Zap
            className={`w-4 h-4 ${
              activeTab === "skills" ? "animate-bounce" : ""
            }`}
          />
          <span>Skills</span>
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            activeTab === "stats"
              ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg scale-105"
              : "text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105"
          }`}
        >
          <Info
            className={`w-4 h-4 ${
              activeTab === "stats" ? "animate-float" : ""
            }`}
          />
          <span>Stats</span>
        </button>
        <button
          onClick={() => setActiveTab("tips")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            activeTab === "tips"
              ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg scale-105"
              : "text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105"
          }`}
        >
          <Lightbulb
            className={`w-4 h-4 ${
              activeTab === "tips" ? "animate-spin-slow" : ""
            }`}
          />
          <span>Tips</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-fadeIn">
        {activeTab === "skills" && (
          <div className="grid gap-4">
            {hero.skills.map((skill, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 animate-slide-in-left ${
                  hoveredSkill === index
                    ? "border-gray-500/50 shadow-lg shadow-gray-700/30 -translate-y-1 scale-[1.02]"
                    : "border-white/5 hover:border-white/10"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Skill Number Badge */}
                <div
                  className={`absolute -left-3 -top-3 w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center shadow-lg transition-transform ${
                    hoveredSkill === index ? "scale-125 rotate-12" : ""
                  }`}
                >
                  <span className="text-white">{index + 1}</span>
                </div>

                {/* Shimmer on hover */}
                {hoveredSkill === index && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 animate-shimmer" />
                  </div>
                )}

                <div className="ml-6 space-y-3">
                  <h4 className="text-white">{skill.name}</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all ${
                    hoveredSkill === index
                      ? "opacity-100 scale-110 animate-bounce"
                      : "opacity-0 scale-75"
                  }`}
                >
                  <Zap className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-gray-600/50 transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-700/30 animate-slide-in-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-700/30 rounded-lg animate-float">
                  <TrendingUp className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-gray-200">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {hero.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300 group hover:text-gray-100 transition-all hover:translate-x-2 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-gray-400 mt-1 group-hover:scale-125 transition-transform">
                      ✓
                    </span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-gray-600/50 transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-700/30 animate-slide-in-right">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-700/30 rounded-lg animate-float-slow">
                  <TrendingDown className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-gray-300">Weaknesses</h3>
              </div>
              <ul className="space-y-3">
                {hero.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-400 group hover:text-gray-200 transition-all hover:translate-x-2 animate-slide-in-right"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-gray-500 mt-1 group-hover:scale-125 transition-transform">
                      ✗
                    </span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-700/30 rounded-lg animate-bounce">
                <Lightbulb className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-gray-200">Tips & Tricks Pro</h3>
            </div>
            <div className="space-y-4">
              {hero.tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gray-600/40 hover:bg-gray-800/20 transition-all group hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-700/30 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform">
                    <span className="text-white">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-100 transition-colors">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
