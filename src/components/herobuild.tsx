import { Hero } from "../types/hero";
import { Package, ArrowUpCircle, Info } from "lucide-react";

interface HeroBuildProps {
  hero: Hero;
}

export function HeroBuild({ hero }: HeroBuildProps) {
  // Early return if hero doesn't have build data
  if (!hero.skillOrder || !hero.buildItems) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 text-center">
        <p className="text-gray-400">
          Build information not available for this hero yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Skill Order Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-gray-600/50 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-700/30 animate-scale-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-700/30 rounded-lg animate-bounce">
            <ArrowUpCircle className="w-6 h-6 text-gray-300" />
          </div>
          <h3 className="text-gray-200">Urutan Skill Priority</h3>
        </div>

        <div className="space-y-4">
          {/* Priority Display */}
          <div className="flex items-center justify-center gap-3 p-6 bg-gradient-to-r from-gray-800/50 via-gray-700/30 to-gray-800/50 rounded-xl border border-gray-600/30 animate-gradient">
            <div className="text-2xl text-white text-center animate-shimmer">
              {hero.skillOrder.priority}
            </div>
          </div>

          {/* Explanation */}
          <div className="p-5 bg-white/5 rounded-xl border border-white/10">
            <p className="text-gray-300 leading-relaxed">
              <span className="text-gray-500 mr-2">💡</span>
              {hero.skillOrder.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Build Items Section */}
      <div
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 animate-scale-in"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-700/30 rounded-lg animate-float">
            <Package className="w-6 h-6 text-gray-300" />
          </div>
          <h3 className="text-gray-200">Build Items</h3>
        </div>

        <div className="space-y-6">
          {/* Core Items */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" />
              <h4 className="text-gray-300">Core Items (Wajib)</h4>
            </div>
            <div className="grid gap-3">
              {hero
                .buildItems!.filter((item) => item.type === "core")
                .map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/40 hover:border-gray-600/60 hover:from-gray-800/60 hover:to-gray-900/60 transition-all hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-700/30 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h5 className="text-gray-100 group-hover:text-white transition-colors">
                        {item.name}
                      </h5>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Boots */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full" />
              <h4 className="text-gray-300">Boots (Sepatu)</h4>
            </div>
            <div className="grid gap-3">
              {hero
                .buildItems!.filter((item) => item.type === "boots")
                .map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-4 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/40 hover:border-gray-600/60 hover:from-gray-800/60 hover:to-gray-900/60 transition-all hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-700/30 animate-slide-in-left"
                    style={{
                      animationDelay: `${
                        (hero.buildItems!.filter((i) => i.type === "core")
                          .length +
                          index) *
                        0.05
                      }s`,
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                      <span className="text-xl">👟</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h5 className="text-gray-100 group-hover:text-white transition-colors">
                        {item.name}
                      </h5>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Situational Items */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full" />
              <h4 className="text-gray-400">Situational Items (Opsional)</h4>
            </div>
            <div className="grid gap-3">
              {hero
                .buildItems!.filter((item) => item.type === "situational")
                .map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-4 p-4 bg-gradient-to-r from-gray-900/40 to-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/60 hover:from-gray-900/60 hover:to-black/60 transition-all hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-800/30 animate-slide-in-left"
                    style={{
                      animationDelay: `${
                        (hero.buildItems!.filter((i) => i.type === "core")
                          .length +
                          hero.buildItems!.filter((i) => i.type === "boots")
                            .length +
                          index) *
                        0.05
                      }s`,
                    }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <Info className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h5 className="text-gray-200 group-hover:text-gray-100 transition-colors">
                        {item.name}
                      </h5>
                      <p className="text-gray-500 group-hover:text-gray-400 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
