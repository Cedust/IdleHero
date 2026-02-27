import {
  Boss,
  BossIcon,
  InitialActorState,
  InitialAttackInterval,
  InitialBossStats,
  InitialLife,
  NoArmor
} from '../../../models';

import { DUNGEON_SPECIAL_BOSS_CONFIG } from '../../../constants';

function DefaultBoss(): Partial<Boss> {
  return {
    Life: InitialLife(0),
    Armor: NoArmor(),
    Stats: InitialBossStats(0, 0, 0),
    AttackInterval: InitialAttackInterval(0),
    State: InitialActorState(),
    IsElite: false,
    IsEndboss: false
  };
}

export function Mimic(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: DUNGEON_SPECIAL_BOSS_CONFIG.MIMIC_ID,
    Name: 'Mimic',
    BossIcon: BossIcon('mimicchest', true)
  };
}

export function Djinn(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: DUNGEON_SPECIAL_BOSS_CONFIG.DJINN_ID,
    Name: 'Djinn',
    BossIcon: BossIcon('djinn', false)
  };
}

//#region SLIMES
export function Gooey(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'slime-cave-1',
    Name: 'Gooey Slime',
    BossIcon: BossIcon('gooeydaemon', true)
  };
}

export function VileFluid(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'slime-cave-2',
    Name: 'Vile Fluid',
    BossIcon: BossIcon('vilefluid', false)
  };
}

export function Slime(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'slime-cave-3',
    Name: 'Slime',
    BossIcon: BossIcon('slime', true)
  };
}

export function Slug(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'slime-cave-4',
    Name: 'Slug',
    BossIcon: BossIcon('graspingslug', true)
  };
}

export function KingSlime(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'slime-cave-boss',
    Name: 'Cyclop',
    BossIcon: BossIcon('jawlesscyclop')
  };
}
//#endregion SLIMES

//#region BRUTES
export function Troglodyte(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'brute-lair-1',
    Name: 'Troglodyte',
    BossIcon: BossIcon('troglodyte', true)
  };
}
export function EvilMinion(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'brute-lair-2',
    Name: 'Evil Minion',
    BossIcon: BossIcon('evilminion', true)
  };
}
export function BullyMinion(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'brute-lair-3',
    Name: 'Bully Minion',
    BossIcon: BossIcon('bullyminion', true)
  };
}
export function Brute(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'brute-lair-4',
    Name: 'Brute',
    BossIcon: BossIcon('brute')
  };
}
export function Minotaur(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'brute-lair-boss',
    Name: 'Minotaur',
    BossIcon: BossIcon('minotaur')
  };
}
//#endregion BRUTES

//#region SNAKES
export function RattleSnake(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'snake-den-1',
    Name: 'Rattle Snake',
    BossIcon: BossIcon('rattlesnake')
  };
}
export function ViperSnake(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'snake-den-2',
    Name: 'Viper',
    BossIcon: BossIcon('poisonsnake')
  };
}
export function SandSnake(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'snake-den-3',
    Name: 'Sand Snake',
    BossIcon: BossIcon('sandsnake', true)
  };
}
export function MambaSnake(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'snake-den-4',
    Name: 'Mamba',
    BossIcon: BossIcon('snake', true)
  };
}
export function PythonSnake(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'snake-den-5',
    Name: 'Python',
    BossIcon: BossIcon('snaketongue')
  };
}
export function CobraSnake(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'snake-den-5',
    Name: 'Cobra',
    BossIcon: BossIcon('cobra', true)
  };
}
export function SeaSerpent(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'snake-den-boss',
    Name: 'Sea Serpent',
    BossIcon: BossIcon('seaserpent', true)
  };
}
//#endregion SNAKES

//#region GOLEMS
export function RockGolem(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'golem-quarry-1',
    Name: 'Rock Golem',
    BossIcon: BossIcon('rockgolem', false)
  };
}
export function IceGolem(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'golem-quarry-2',
    Name: 'Ice Golem',
    BossIcon: BossIcon('icegolem', false)
  };
}
export function ShamblingMound(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'golem-quarry-3',
    Name: 'Shambling Mound',
    BossIcon: BossIcon('shamblingmound', true)
  };
}
export function RobotGolem(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'golem-quarry-4',
    Name: 'Robot Golem',
    BossIcon: BossIcon('robotgolem', false)
  };
}
export function BattleMechGolem(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'golem-quarry-boss',
    Name: 'Battle Mech Golem',
    BossIcon: BossIcon('battlemech', false)
  };
}
//#endregion GOLEMS

//#region GHOSTS
export function Ghost(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'spectres-1',
    Name: 'Ghost',
    BossIcon: BossIcon('ghost', true)
  };
}
export function FloatingGhost(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'spectres-2',
    Name: 'Floating Ghost',
    BossIcon: BossIcon('floatingghost', true)
  };
}
export function HauntingGhost(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'spectres-3',
    Name: 'Haunting Ghost',
    BossIcon: BossIcon('haunting', false)
  };
}
export function SpectreGhost(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'spectres-boss',
    Name: 'Evil Spectre',
    BossIcon: BossIcon('spectre', false)
  };
}
//#endregion GHOSTS

//#region EVILS
export function EvilImp(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'arcana-1',
    Name: 'Evil Imp',
    BossIcon: BossIcon('imp', true)
  };
}
export function EvilBat(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'arcana-2',
    Name: 'Evil Bat',
    BossIcon: BossIcon('evilbat', false)
  };
}
export function EvilTrident(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'arcana-3',
    Name: 'Evil Trident',
    BossIcon: BossIcon('evilfork', false)
  };
}
export function EvilHarpy(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'arcana-4',
    Name: 'Evil Harpy',
    BossIcon: BossIcon('harpy', false)
  };
}
export function EvilHawk(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'arcana-boss',
    Name: 'Evil Hawk',
    BossIcon: BossIcon('hawkemblem', false)
  };
}
//#endregion EVILS

//#region DRAGONS
export function SeaSerpentDragon(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'dragon-lair-1',
    Name: 'Sea Serpent',
    BossIcon: BossIcon('seadragon', true)
  };
}
export function WyvernDragon(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'dragon-lair-2',
    Name: 'Wyvern',
    BossIcon: BossIcon('wyvern', true)
  };
}
export function FireDragon(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'dragon-lair-3',
    Name: 'Fire Dragon',
    BossIcon: BossIcon('dragonhead', true)
  };
}
export function SeaDragon(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'dragon-lair-4',
    Name: 'Sea Dragon',
    BossIcon: BossIcon('seadragon', true)
  };
}
export function DoubleHeadedDragon(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'dragon-lair-5',
    Name: 'Double-Headed Dragon',
    BossIcon: BossIcon('doubledragon', true)
  };
}
export function HydraDragon(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'dragon-lair-boss',
    Name: 'Hydra',
    BossIcon: BossIcon('hydra', true)
  };
}
//#endregion DRAGONS

//#region TITANS
export function GargoyleTitan(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'titans-1',
    Name: 'Gargoyle the Stone Sentinel',
    BossIcon: BossIcon('gargoyle', false)
  };
}
export function ThanatosTitan(): Boss {
  const boss = DefaultBoss() as Boss;
  return {
    ...boss,
    Id: 'titans-boss',
    Name: 'Thanatos the Death Bringer',
    BossIcon: BossIcon('cloakedfigureonhorseback', true)
  };
}
//#endregion TITANS
