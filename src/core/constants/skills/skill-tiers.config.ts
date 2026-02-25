import { ALL_SKILL_DEFINITIONS } from './skills.config';
import { SkillDefinition } from '../../models';

export const SKILL_TIER_CONFIG = {
  1: {
    REQUIRED_LEVEL: 5,
    GOLD_COST: 2_500
  },
  2: {
    REQUIRED_LEVEL: 15,
    GOLD_COST: 10_000
  },
  3: {
    REQUIRED_LEVEL: 25,
    GOLD_COST: 25_000
  },
  4: {
    REQUIRED_LEVEL: 40,
    GOLD_COST: 50_000
  },
  5: {
    REQUIRED_LEVEL: 50,
    GOLD_COST: 100_000
  }
};

export const SKILL_TIER_1_SKILLS: SkillDefinition[] = [
  ...ALL_SKILL_DEFINITIONS.filter((s) => s.Tier === 'I')
];
export const SKILL_TIER_2_SKILLS: SkillDefinition[] = [
  ...ALL_SKILL_DEFINITIONS.filter((s) => s.Tier === 'II')
];
export const SKILL_TIER_3_SKILLS: SkillDefinition[] = [
  ...ALL_SKILL_DEFINITIONS.filter((s) => s.Tier === 'III')
];
export const SKILL_TIER_4_SKILLS: SkillDefinition[] = [
  ...ALL_SKILL_DEFINITIONS.filter((s) => s.Tier === 'IV')
];
export const SKILL_TIER_5_SKILLS: SkillDefinition[] = [
  ...ALL_SKILL_DEFINITIONS.filter((s) => s.Tier === 'V')
];
