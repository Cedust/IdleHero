import {
  CapstoneDungeonRoom,
  DungeonRoom,
  DungeonRoomKey,
  DungeonType,
  NormalDungeonRoom,
  NormalDungeonRoomPrerequisites,
  RuneQuality
} from '../../../core/models';
import { Component, computed, inject } from '@angular/core';
import { CreaturesIconName, IconComponent, Level, PanelHeader } from '../../../shared/components';
import {
  DungeonKeyService,
  DungeonRoomService,
  LevelService,
  StatisticsService
} from '../../../core/services';
import { GetAllDungeons, RUNE_QUALITY_ORDER } from '../../../core/constants';

import { GameStateService } from '../../../shared/services';

@Component({
  selector: 'app-dungeon-rooms',
  imports: [PanelHeader, IconComponent, Level],
  templateUrl: './dungeon-rooms.html',
  styleUrl: './dungeon-rooms.scss'
})
export class DungeonRooms {
  private readonly dungeonRoom = inject(DungeonRoomService);
  private readonly dungeonKey = inject(DungeonKeyService);
  private readonly level = inject(LevelService);
  private readonly statistics = inject(StatisticsService);
  private readonly gameState = inject(GameStateService);

  // Data
  public readonly Dungeons = GetAllDungeons();
  public readonly IsGameCompleted = computed<boolean>(() => this.gameState.IsGameCompleted());

  public readonly DungeonGroups = computed<DungeonGroupViewModel[]>(() => [
    {
      Title: 'DUNGEONS',
      Type: DungeonType.Normal,
      Dungeons: this.Dungeons.filter(
        (dungeon): dungeon is NormalDungeonRoom => dungeon.Type === DungeonType.Normal
      )
    },
    {
      Title: 'CAPSTONE DUNGEONS',
      Type: DungeonType.Capstone,
      Dungeons: this.Dungeons.filter(
        (dungeon): dungeon is CapstoneDungeonRoom => dungeon.Type === DungeonType.Capstone
      )
    }
  ]);

  public readonly UnlocksByDungeonId = computed<Record<string, CapstoneDungeonUnlockInfo[]>>(() => {
    return this.Dungeons.reduce<Record<string, CapstoneDungeonUnlockInfo[]>>((result, dungeon) => {
      const rewardKey = dungeon.Rewards.Key;
      if (!rewardKey) return result;

      result[dungeon.Id] = [
        {
          Label: `${rewardKey}`,
          Key: rewardKey,
          Symbol: 'skeletonkey',
          ColorClass: this.GetDungeonKeyColorClass(rewardKey)
        }
      ];

      return result;
    }, {});
  });

  // Actions
  public EnterDungeon(id: string): void {
    this.dungeonRoom.EnterDungeon(id);
  }

  public CanEnter(id: string): boolean {
    return this.dungeonRoom.CanEnter(id);
  }

  public GetUnlocks(dungeonId: string): CapstoneDungeonUnlockInfo[] {
    return this.UnlocksByDungeonId()[dungeonId] ?? [];
  }

  public GetRuneDrops(dungeon: DungeonRoom): RuneDropInfo[] {
    return RUNE_QUALITY_ORDER.map((quality) => ({
      Quality: quality,
      Chance: dungeon.Rewards.RuneDropChances[quality] ?? 0
    })).filter((runeDrop) => runeDrop.Chance > 0);
  }

  public GetRuneDropChanceLabel(chance: number): string {
    return `${Math.round(chance * 100)}%`;
  }

  public GetRuneQualityClass(quality: RuneQuality): string {
    switch (quality) {
      case 'Common':
        return 'common--font';
      case 'Magic':
        return 'magic--font';
      case 'Rare':
        return 'rare--font';
      case 'Epic':
        return 'epic--font';
      case 'Legendary':
        return 'legendary--font';
      default:
        return '';
    }
  }

  public GetDungeonKeyColorClass(key: DungeonRoomKey): string {
    switch (key) {
      case 'Silver Key':
        return 'common--font';
      case 'Magic Key':
        return 'magic--font';
      case 'Golden Key':
        return 'rare--font';
      case 'Epic Key':
        return 'epic--font';
      case 'Legendary Key':
        return 'legendary--font';
      default:
        return '';
    }
  }

  public HasPrerequisiteKey(dungeon: CapstoneDungeonRoom): boolean {
    return this.dungeonKey.HasKey(dungeon.Prerequisites.Key);
  }

  public GetDungeonPrerequisiteKey(dungeon: DungeonRoom): DungeonRoomKey | null {
    return this.IsCapstoneDungeon(dungeon) ? dungeon.Prerequisites.Key : null;
  }

  public GetDungeonPrerequisiteDungeonCompletion(
    dungeon: DungeonRoom
  ): NormalDungeonUnlockInfo | null {
    if (!this.IsNormalDungeon(dungeon)) {
      return null;
    }

    const prerequisites: NormalDungeonRoomPrerequisites = dungeon.Prerequisites;
    const prerequisiteDungeonId = prerequisites.CompletedDungeonId;
    if (!prerequisiteDungeonId) return null;

    const prerequisiteDungeon = this.Dungeons.find(
      (currentDungeon): currentDungeon is NormalDungeonRoom =>
        currentDungeon.Type === DungeonType.Normal && currentDungeon.Id === prerequisiteDungeonId
    );

    if (!prerequisiteDungeon) {
      return null;
    }

    return {
      DungeonId: prerequisiteDungeon.Id,
      DungeonIcon: prerequisiteDungeon.Icon,
      RequiredStage: 100
    };
  }

  public HasDungeonPrerequisiteKey(dungeon: DungeonRoom): boolean {
    const prerequisiteKey = this.GetDungeonPrerequisiteKey(dungeon);
    if (!prerequisiteKey) return true;

    return this.dungeonKey.HasKey(prerequisiteKey);
  }

  public HasUnlockKey(unlock: CapstoneDungeonUnlockInfo): boolean {
    return this.dungeonKey.HasKey(unlock.Key);
  }

  private IsCapstoneDungeon(dungeon: DungeonRoom): dungeon is CapstoneDungeonRoom {
    return dungeon.Type === DungeonType.Capstone;
  }

  private IsNormalDungeon(dungeon: DungeonRoom): dungeon is NormalDungeonRoom {
    return dungeon.Type === DungeonType.Normal;
  }

  public GetDungeonPrerequisiteLevel(dungeon: DungeonRoom): number | null {
    return this.IsNormalDungeon(dungeon) ? dungeon.Prerequisites.Level : null;
  }

  public FulfillsDungeonPrerequisite(dungeon: DungeonRoom): boolean {
    if (!this.IsNormalDungeon(dungeon)) return true;

    const prerequisites: NormalDungeonRoomPrerequisites = dungeon.Prerequisites;
    const currentLevel = this.level.Level();
    if (currentLevel < prerequisites.Level) return false;

    const prerequisiteDungeonId = prerequisites.CompletedDungeonId;
    if (!prerequisiteDungeonId) return true;

    const prerequisiteDungeonCompletion = this.GetDungeonPrerequisiteDungeonCompletion(dungeon);
    if (!prerequisiteDungeonCompletion) return false;

    const highestReachedPrerequisiteStage =
      this.statistics.DungeonStatistics().Dungeon[prerequisiteDungeonId] ?? 0;

    return highestReachedPrerequisiteStage >= prerequisiteDungeonCompletion.RequiredStage;
  }
}

interface DungeonGroupViewModel {
  Title: string;
  Type: DungeonType;
  Dungeons: DungeonRoom[];
}

interface NormalDungeonUnlockInfo {
  DungeonId: string;
  DungeonIcon: CreaturesIconName;
  RequiredStage: 100;
}

interface CapstoneDungeonUnlockInfo {
  Label: string;
  Key: DungeonRoomKey;
  Symbol: 'skeletonkey';
  ColorClass?: string;
}

interface RuneDropInfo {
  Quality: RuneQuality;
  Chance: number;
}
