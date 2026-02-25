import {
  BattleMechGolem,
  Brute,
  BullyMinion,
  CobraSnake,
  DoubleHeadedDragon,
  EvilBat,
  EvilHarpy,
  EvilHawk,
  EvilImp,
  EvilMinion,
  EvilTrident,
  FireDragon,
  FloatingGhost,
  Ghost,
  Gooey,
  HauntingGhost,
  HydraDragon,
  IceGolem,
  KingSlime,
  MambaSnake,
  Minotaur,
  PythonSnake,
  RattleSnake,
  RobotGolem,
  RockGolem,
  SandSnake,
  SeaDragon,
  SeaSerpent,
  SeaSerpentDragon,
  ShamblingMound,
  Slime,
  Slug,
  SpectreGhost,
  Troglodyte,
  VileFluid,
  ViperSnake,
  WyvernDragon
} from '../../systems/combat/dungeons/boss.factory';

import { Boss } from '../../models';

export type BossFactory = () => Boss;
export { DUNGEON_BOSS_SCALING, GetScalingParamsForDungeon } from './dungeon-boss-scaling.config';
export type { DungeonBossScalingParams } from './dungeon-boss-scaling.config';

export interface DungeonBossConfig {
  /**
   * Stage specific Bosses
   * e.g., key=1 means "at stage 1, spawn this Boss"
   */
  StageSpecific: Map<number, BossFactory>;

  /**
   * Boss Pools per stage range
   * e.g., key=20 means "from stage 20 onwards until next defined key"
   */
  BossPools: Map<number, BossFactory[]>;
}

export const DUNGEON_SPECIAL_BOSS_CONFIG = {
  MIMIC_ID: 'Mimic',
  MIMIC_SPAWN_RATE: 0.01, // 1% Chance, dass ein Mimic statt eines regulären Bosses spawnt
  MIMIC_GOLD_REWARD_MULTIPLIER: 10, // Mimics geben das 10-fache an Gold im Vergleich zu regulären Bossen

  DJINN_ID: 'Djinn',
  DJINN_SPAWN_RATE: 0.005, // 0.5% Chance, dass ein Djinn statt eines regulären Bosses spawnt
  DJINN_EXP_REWARD_MULTIPLIER: 5 // Djinns geben das 5-fache an Erfahrung im Vergleich zu regulären Bossen
};

export const DUNGEON_BOSS_CONFIGS: Record<string, DungeonBossConfig> = {
  D1: {
    StageSpecific: new Map<number, BossFactory>([
      [1, Gooey],
      [25, VileFluid],
      [50, Slime],
      [75, Slug],
      [100, KingSlime]
    ]),
    BossPools: new Map<number, BossFactory[]>([
      [1, [Gooey]],
      [15, [Gooey, VileFluid]],
      [35, [Gooey, VileFluid, Slime]],
      [50, [VileFluid, Slime]],
      [65, [Slime, Slug]],
      [85, [Slug]],
      [90, [Slug, KingSlime]]
    ])
  },
  D2: {
    StageSpecific: new Map<number, BossFactory>([
      [1, Troglodyte],
      [25, EvilMinion],
      [50, BullyMinion],
      [75, Brute],
      [100, Minotaur]
    ]),
    BossPools: new Map<number, BossFactory[]>([
      [1, [Troglodyte]],
      [15, [Troglodyte, EvilMinion]],
      [35, [Troglodyte, EvilMinion, BullyMinion]],
      [50, [EvilMinion, BullyMinion]],
      [65, [BullyMinion, Brute]],
      [85, [Brute]],
      [90, [Brute, Minotaur]]
    ])
  },
  D3: {
    StageSpecific: new Map<number, BossFactory>([
      [1, RattleSnake],
      [20, ViperSnake],
      [35, SandSnake],
      [50, MambaSnake],
      [65, PythonSnake],
      [80, CobraSnake],
      [100, SeaSerpent]
    ]),
    BossPools: new Map<number, BossFactory[]>([
      [1, [RattleSnake]],
      [10, [RattleSnake, ViperSnake]],
      [20, [RattleSnake, ViperSnake, SandSnake]],
      [30, [ViperSnake, SandSnake]],
      [40, [ViperSnake, SandSnake, MambaSnake]],
      [50, [SandSnake, MambaSnake]],
      [60, [SandSnake, MambaSnake, PythonSnake]],
      [70, [MambaSnake, PythonSnake]],
      [80, [MambaSnake, PythonSnake, CobraSnake]],
      [90, [CobraSnake, SeaSerpent]]
    ])
  },
  D4: {
    StageSpecific: new Map<number, BossFactory>([
      [1, RockGolem],
      [20, RockGolem],
      [40, IceGolem],
      [60, ShamblingMound],
      [80, RobotGolem],
      [100, BattleMechGolem]
    ]),
    BossPools: new Map<number, BossFactory[]>([
      [1, [RockGolem]],
      [20, [RockGolem, IceGolem]],
      [40, [RockGolem, IceGolem, ShamblingMound]],
      [60, [IceGolem, ShamblingMound, RobotGolem]],
      [80, [ShamblingMound, RobotGolem]],
      [90, [RobotGolem, BattleMechGolem]]
    ])
  },
  C1: {
    StageSpecific: new Map<number, BossFactory>([
      [1, Ghost],
      [20, Ghost],
      [40, FloatingGhost],
      [60, HauntingGhost],
      [80, SpectreGhost],
      [100, SpectreGhost]
    ]),
    BossPools: new Map<number, BossFactory[]>([
      [1, [Ghost]],
      [20, [Ghost, FloatingGhost]],
      [40, [FloatingGhost, HauntingGhost]],
      [60, [HauntingGhost]],
      [80, [HauntingGhost, SpectreGhost]],
      [90, [SpectreGhost]]
    ])
  },
  C2: {
    StageSpecific: new Map<number, BossFactory>([
      [1, EvilImp],
      [20, EvilImp],
      [40, EvilBat],
      [60, EvilTrident],
      [80, EvilHarpy],
      [100, EvilHawk]
    ]),
    BossPools: new Map<number, BossFactory[]>([
      [1, [EvilImp]],
      [20, [EvilImp, EvilBat]],
      [40, [EvilBat, EvilTrident]],
      [60, [EvilTrident, EvilHarpy]],
      [80, [EvilHarpy, EvilHawk]],
      [90, [EvilHawk]]
    ])
  },
  C3: {
    StageSpecific: new Map<number, BossFactory>([
      [1, SeaSerpentDragon],
      [20, SeaSerpentDragon],
      [35, WyvernDragon],
      [50, FireDragon],
      [65, SeaDragon],
      [80, DoubleHeadedDragon],
      [100, HydraDragon]
    ]),
    BossPools: new Map<number, BossFactory[]>([
      [1, [SeaSerpentDragon]],
      [10, [SeaSerpentDragon, WyvernDragon]],
      [20, [WyvernDragon]],
      [30, [WyvernDragon, FireDragon]],
      [40, [FireDragon]],
      [50, [FireDragon, SeaDragon]],
      [60, [SeaDragon]],
      [70, [SeaDragon, DoubleHeadedDragon]],
      [80, [DoubleHeadedDragon]],
      [90, [HydraDragon]]
    ])
  }
};

export function GetBossConfigForDungeon(dungeonId: string): DungeonBossConfig {
  return DUNGEON_BOSS_CONFIGS[dungeonId];
}
