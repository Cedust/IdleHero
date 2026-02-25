import {
  CapstoneDungeonRoom,
  DungeonRoom,
  DungeonRoomKey,
  DungeonType,
  NormalDungeonRoom
} from '../../models/combat/dungeon-room';

export const NORMAL_DUNGEONS: NormalDungeonRoom[] = [
  {
    Id: 'D1',
    Title: 'Slime Cave',
    Description: 'A damp cave filled with oozing slimes.',
    Icon: 'slime',
    Type: DungeonType.Normal,
    StagesBase: 1,
    MidStages: [25, 50, 75],
    StagesMax: 100,

    Rewards: {
      XpBase: 10,
      GoldBase: 30,
      RuneDropChances: { Common: 0.06, Magic: 0.005, Rare: 0.0, Epic: 0.0, Legendary: 0.0 },
      Key: null
    },

    Prerequisites: {
      Level: 1
    },

    Locked: false
  },
  {
    Id: 'D2',
    Title: 'Brute Lair',
    Description: 'A dark cave infested with mischievous brutes.',
    Icon: 'brute',
    Type: DungeonType.Normal,

    StagesBase: 1,
    MidStages: [25, 50, 75],
    StagesMax: 100,

    Rewards: {
      XpBase: 30,
      GoldBase: 60,
      RuneDropChances: { Common: 0.08, Magic: 0.04, Rare: 0.005, Epic: 0.0, Legendary: 0.0 },
      Key: null
    },

    Prerequisites: {
      Level: 10
    },

    Locked: false
  },
  {
    Id: 'D3',
    Title: 'Snake Den',
    Description: 'A winding den crawling with venomous snakes.',
    Icon: 'snake',
    Type: DungeonType.Normal,

    StagesBase: 1,
    MidStages: [20, 35, 50, 65, 80],
    StagesMax: 100,

    Rewards: {
      XpBase: 60,
      GoldBase: 90,
      RuneDropChances: { Common: 0.0, Magic: 0.08, Rare: 0.04, Epic: 0.005, Legendary: 0.0 },
      Key: null
    },

    Prerequisites: {
      Level: 20
    },

    Locked: false
  },
  {
    Id: 'D4',
    Title: 'Golem Quarry',
    Description: 'A rocky quarry guarded by stone golems.',
    Icon: 'rockgolem',
    Type: DungeonType.Normal,

    StagesBase: 1,
    MidStages: [20, 40, 60, 80],
    StagesMax: 100,

    Rewards: {
      XpBase: 90,
      GoldBase: 120,
      RuneDropChances: { Common: 0.0, Magic: 0.0, Rare: 0.08, Epic: 0.04, Legendary: 0.005 },
      Key: 'Silver Key' as DungeonRoomKey
    },

    Prerequisites: {
      Level: 30
    },

    Locked: false
  }
];

export const CAPSTONE_DUNGEONS: CapstoneDungeonRoom[] = [
  {
    Id: 'C1',
    Title: 'Trial of the Spectres',
    Description: 'Prove your worth against the spectral guardians.',
    Icon: 'spectre',
    Type: DungeonType.Capstone,

    StagesBase: 1,
    MidStages: [20, 40, 60, 80],
    StagesMax: 100,

    Rewards: {
      XpBase: 100,
      GoldBase: 175,
      RuneDropChances: { Common: 0.0, Magic: 0.0, Rare: 0.0, Epic: 0.06, Legendary: 0.02 },
      Key: 'Magic Key' as DungeonRoomKey
    },

    Prerequisites: { Key: 'Silver Key' as DungeonRoomKey },

    Locked: false
  },
  {
    Id: 'C2',
    Title: 'Trial of Arcana',
    Description: 'Arcane creatures test your mastery.',
    Icon: 'harpy',
    Type: DungeonType.Capstone,

    StagesBase: 1,
    MidStages: [20, 40, 60, 80],
    StagesMax: 100,

    Rewards: {
      XpBase: 150,
      GoldBase: 200,
      RuneDropChances: { Common: 0.0, Magic: 0.0, Rare: 0.0, Epic: 0.08, Legendary: 0.04 },
      Key: 'Golden Key' as DungeonRoomKey
    },

    Prerequisites: { Key: 'Magic Key' as DungeonRoomKey },

    Locked: false
  },
  {
    Id: 'C3',
    Title: 'Trial of the Dragons',
    Description: 'The final trial guarded by ancient dragons.',
    Icon: 'hydra',
    Type: DungeonType.Capstone,

    StagesBase: 1,
    MidStages: [20, 35, 50, 65, 80],
    StagesMax: 100,

    Rewards: {
      XpBase: 200,
      GoldBase: 250,
      RuneDropChances: { Common: 0.0, Magic: 0.0, Rare: 0.0, Epic: 0.1, Legendary: 0.06 },
      Key: 'Epic Key' as DungeonRoomKey
    },

    Prerequisites: { Key: 'Golden Key' as DungeonRoomKey },

    Locked: false
  }
];

export function GetAllDungeons(): DungeonRoom[] {
  return [...NORMAL_DUNGEONS, ...CAPSTONE_DUNGEONS];
}

export function GetDungeonById(id: string): DungeonRoom | null {
  return [...NORMAL_DUNGEONS, ...CAPSTONE_DUNGEONS].find((d) => d.Id === id) ?? null;
}
