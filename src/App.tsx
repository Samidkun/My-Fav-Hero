import { HeroCard } from "./components/HeroCard";
import { HeroDetail } from "./components/HeroDetail";
import { ProfileStats } from "./components/ProfileStats";
import { SplashScreen } from "./components/SplashScreen";
import { useState, useEffect } from "react";
import { Hero } from "./types/hero";
import { Sparkles } from "lucide-react";

const heroes: Hero[] = [
  {
    id: 1,
    name: "Lapu-Lapu",
    role: "Fighter",
    specialty: "Charge/Damage",
    difficulty: "Medium",
    image: "/lapulapu.jpg",
    description:
      "A fighter hero with dual blades who has high burst damage capabilities. Lapu-Lapu is very strong in teamfights with an ultimate that deals massive area damage.",
    skills: [
      {
        name: "Justice Blade (Passive)",
        description:
          "Every 4 basic attacks, Lapu-Lapu will deal additional damage and apply a slow effect to enemies.",
      },
      {
        name: "Jungle Warrior",
        description:
          "Lapu-Lapu dashes towards the target and deals damage. This skill can be used twice consecutively.",
      },
      {
        name: "Brave Stance",
        description:
          "Lapu-Lapu swings his sword dealing damage and slow effect. In heavy sword mode, it will stun enemies.",
      },
      {
        name: "Bravest Fighter (Ultimate)",
        description:
          "Lapu-Lapu combines both swords into a massive heavy sword, increasing damage and transforming skills 1 and 2.",
      },
    ],
    strengths: [
      "High burst damage",
      "Good crowd control",
      "Strong in teamfights",
    ],
    weaknesses: [
      "Vulnerable in early game",
      "Skill shots require accuracy",
      "Relatively long cooldowns",
    ],
    tips: [
      "Use ultimate during teamfights to maximize damage",
      "The combo skill 2 + ultimate + skill 2 is deadly",
      "Farm in early game to get core items",
    ],
    stats: {
      durability: 65,
      offense: 85,
      controlEffect: 70,
      difficulty: 60,
    },
    skillOrder: {
      priority: "Ultimate > Skill 2 > Skill 1",
      explanation:
        "Prioritize ultimate first for maximum burst damage potential. Then max skill 2 for crowd control and damage, followed by skill 1 for mobility and chase potential.",
    },
    buildItems: [
      {
        name: "Bloodlust Axe",
        description:
          "Core item for spell vamp and cooldown reduction. Essential for sustain in teamfights.",
        type: "core",
      },
      {
        name: "War Axe",
        description:
          "Increases physical attack and armor penetration over time. Great for sustained damage.",
        type: "core",
      },
      {
        name: "Hunter Strike",
        description:
          "Provides penetration and movement speed boost after kills. Perfect for aggressive plays.",
        type: "core",
      },
      {
        name: "Warrior Boots",
        description:
          "Basic defense with physical defense. Good against physical damage heavy teams.",
        type: "boots",
      },
      {
        name: "Tough Boots",
        description:
          "Alternative boots with magic resist and tenacity. Use against CC-heavy teams.",
        type: "boots",
      },
      {
        name: "Blade of Despair",
        description:
          "Massive damage boost when enemies are low HP. Great for securing kills.",
        type: "situational",
      },
      {
        name: "Immortality",
        description:
          "Resurrection passive for survivability. Good when you're the main damage dealer.",
        type: "situational",
      },
      {
        name: "Malefic Roar",
        description:
          "High armor penetration. Use against tanky enemy compositions.",
        type: "situational",
      },
    ],
  },
  {
    id: 2,
    name: "Yu Zhong",
    role: "Fighter/Tank",
    specialty: "Regen/Damage",
    difficulty: "Medium",
    image: "yuzhong.jpg",
    description:
      "The Black Dragon with exceptional sustain through lifesteal. Yu Zhong is very durable in lane and can survive in the middle of teamfights while dealing consistent damage.",
    skills: [
      {
        name: "Cursed Destiny (Passive)",
        description:
          "Yu Zhong's skills apply Sha to enemies. When Sha explodes, it deals damage and Yu Zhong gains a shield + heal.",
      },
      {
        name: "Dragon Tail",
        description:
          "Yu Zhong attacks with his tail, dealing damage and slow. Can be used up to 3 times.",
      },
      {
        name: "Soul Grip",
        description:
          "Yu Zhong grabs enemies in front of him, dealing damage and pulling them closer.",
      },
      {
        name: "Black Dragon Form (Ultimate)",
        description:
          "Yu Zhong transforms into a Black Dragon, flies and deals area damage. In this form, Yu Zhong is immune to CC and gains additional lifesteal.",
      },
    ],
    strengths: [
      "Very high sustain",
      "Consistent damage",
      "Hard to kill",
      "Immune to CC during ultimate",
    ],
    weaknesses: [
      "Limited mobility",
      "Vulnerable to anti-heal",
      "Needs time to stack Sha",
    ],
    tips: [
      "Stack Sha on enemies before detonating for maximum heal",
      "Use ultimate to escape or engage in teamfights",
      "Build items with spell vamp for maximum sustain",
    ],
    stats: {
      durability: 90,
      offense: 75,
      controlEffect: 60,
      difficulty: 65,
    },
    skillOrder: {
      priority: "Skill 1 > Skill 2 > Ultimate",
      explanation:
        "Max skill 1 first for maximum sustain and damage output. Then skill 2 for CC and gap close. Ultimate is important but gets value from base stats, so max it last.",
    },
    buildItems: [
      {
        name: "Cursed Helmet",
        description:
          "Provides HP and magic damage aura. Perfect for Yu Zhong's playstyle of staying in teamfights.",
        type: "core",
      },
      {
        name: "Oracle",
        description:
          "Increases shield and HP regen effectiveness. Synergizes perfectly with Yu Zhong's passive.",
        type: "core",
      },
      {
        name: "Brute Force Breastplate",
        description:
          "Stacking defense and movement speed. Great for sustained combat.",
        type: "core",
      },
      {
        name: "Tough Boots",
        description:
          "Tenacity and magic resist. Essential against CC-heavy teams.",
        type: "boots",
      },
      {
        name: "Warrior Boots",
        description:
          "Physical defense alternative. Use against full physical damage teams.",
        type: "boots",
      },
      {
        name: "Dominance Ice",
        description:
          "Anti-heal and mana. Counters enemy lifesteal and sustain heroes.",
        type: "situational",
      },
      {
        name: "Immortality",
        description:
          "Second life for extended teamfight presence. Good when you're main frontline.",
        type: "situational",
      },
      {
        name: "Athena's Shield",
        description:
          "Magic shield against burst magic damage. Use against mage-heavy teams.",
        type: "situational",
      },
    ],
  },
  {
    id: 3,
    name: "Benedetta",
    role: "Assassin",
    specialty: "Chase/Damage",
    difficulty: "Hard",
    image: "benedetta.jpeg",
    description:
      "A shadow ranger with high mobility and deadly burst damage. Benedetta has unique mechanics with sword intent and dashes that can dodge enemy skills.",
    skills: [
      {
        name: "Elapsed Daytime (Passive)",
        description:
          "After using a skill or dash, the next basic attack deals additional damage and generates Sword Intent which increases damage.",
      },
      {
        name: "Phantom Slash",
        description:
          "Benedetta dashes while slashing, dealing damage. This skill can dodge enemy skills when used with precise timing.",
      },
      {
        name: "An Eye for an Eye",
        description:
          "Benedetta deploys a shadow shield. If hit by an enemy skill, the shield explodes dealing damage and slow.",
      },
      {
        name: "Alecto: Final Blow (Ultimate)",
        description:
          "Benedetta dashes in a direction while slashing all enemies in her path, dealing massive burst damage.",
      },
    ],
    strengths: [
      "Very high mobility",
      "Deadly burst damage",
      "Can dodge skills with skill 1",
      "High outplay potential",
    ],
    weaknesses: [
      "Very squishy",
      "Skill shots require precise timing",
      "Difficult to play",
      "Vulnerable to crowd control",
    ],
    tips: [
      "Use skill 1 to dodge dangerous enemy skills",
      "Stack Sword Intent before engaging for maximum damage",
      "Ultimate can be used to chase or escape",
      "Timing is everything - practice dodge timing with skill 1",
    ],
    stats: {
      durability: 40,
      offense: 95,
      controlEffect: 50,
      difficulty: 90,
    },
    skillOrder: {
      priority: "Skill 1 > Ultimate > Skill 2",
      explanation:
        "Max skill 1 first for mobility and damage - it's your main tool for dodging and dealing damage. Then ultimate for burst combo potential. Skill 2 is maxed last as it provides utility that doesn't scale as much with levels.",
    },
    buildItems: [
      {
        name: "Endless Battle",
        description:
          "True damage and lifesteal. Perfect for Benedetta's hit-and-run playstyle.",
        type: "core",
      },
      {
        name: "Hunter Strike",
        description:
          "Penetration and movement speed on kill. Essential for chasing and mobility.",
        type: "core",
      },
      {
        name: "Blade of Despair",
        description:
          "Massive damage boost. Core for maximum burst damage potential.",
        type: "core",
      },
      {
        name: "Warrior Boots",
        description:
          "Physical defense for early game survivability. Standard choice.",
        type: "boots",
      },
      {
        name: "Tough Boots",
        description:
          "Tenacity and magic resist. Use against heavy CC compositions.",
        type: "boots",
      },
      {
        name: "Malefic Roar",
        description:
          "High armor penetration. Use against tank-heavy enemy teams.",
        type: "situational",
      },
      {
        name: "Rose Gold Meteor",
        description:
          "Shield and lifesteal. Provides survivability when diving backline.",
        type: "situational",
      },
      {
        name: "Wind of Nature",
        description:
          "Physical immunity active. Counter to marksmen and physical burst heroes.",
        type: "situational",
      },
    ],
  },
];

export default function App() {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (hasSeenOnboarding === "true") {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleResetSplash = () => {
    localStorage.removeItem("hasSeenOnboarding");
    setShowSplash(true);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-gray-600/30 to-gray-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-gray-700/25 via-gray-600/15 to-transparent rounded-full blur-3xl animate-pulse-slow-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-500/10 to-black/20 rounded-full blur-3xl animate-pulse-slow" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 text-gray-400 animate-spin-slow" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              My Heroes
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            3 Main Heroes Ready to Dominate
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-16">
        {!selectedHero ? (
          <div className="space-y-12">
            {/* Profile Stats Section */}
            <ProfileStats />

            {/* Heroes Section */}
            <div className="text-center space-y-4 animate-fadeIn">
              <h2 className="text-slate-300">Choose Your Favorite Hero</h2>
              <p className="text-slate-400">
                Click to view detailed skills, stats, and tips
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {heroes.map((hero, index) => (
                <div
                  key={hero.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <HeroCard hero={hero} onClick={() => setSelectedHero(hero)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <HeroDetail
            hero={selectedHero}
            onBack={() => setSelectedHero(null)}
          />
        )}
      </main>

      {/* Floating Reset Button - Bottom Right */}
      <button
        onClick={handleResetSplash}
        className="fixed bottom-6 right-6 group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-full shadow-lg shadow-gray-900/50 transition-all hover:scale-110 hover:shadow-xl hover:shadow-gray-700/50 z-50 border border-gray-600/30 animate-scale-in"
        title="View Splash Screen Again"
      >
        <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        <span className="text-sm">Reset Intro</span>
      </button>
    </div>
  );
}
