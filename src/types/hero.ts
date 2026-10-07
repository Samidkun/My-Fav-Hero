export interface Skill {
  name: string;
  description: string;
}

export interface HeroStats {
  durability: number;
  offense: number;
  controlEffect: number;
  difficulty: number;
}

export interface BuildItem {
  name: string;
  description: string;
  type: 'core' | 'boots' | 'situational';
}

export interface SkillOrder {
  priority: string;
  explanation: string;
}

export interface Hero {
  id: number;
  name: string;
  role: string;
  specialty: string;
  difficulty: string;
  image: string;
  description: string;
  skills: Skill[];
  strengths: string[];
  weaknesses: string[];
  tips: string[];
  stats: HeroStats;
  buildItems?: BuildItem[];
  skillOrder?: SkillOrder;
}