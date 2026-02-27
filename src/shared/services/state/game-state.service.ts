import { DungeonKeyService, DungeonRoomService, StatisticsService } from '../../../core/services';
import { DungeonRoomKey, DungeonType } from '../../../core/models';
import { Injectable, computed, inject } from '@angular/core';

import { GetAllDungeons } from '../../../core/constants';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private readonly Statistics = inject(StatisticsService);
  private readonly Keys = inject(DungeonKeyService);
  private readonly DungeonRooms = inject(DungeonRoomService);

  public readonly IsGameCompleted = computed<boolean>(() => {
    const requiredKeys = this.GetRequiredDungeonKeys();
    const hasAllRequiredKeys = requiredKeys.every((key) => this.Keys.HasKey(key));
    if (!hasAllRequiredKeys) {
      return false;
    }

    const dungeonStatistics = this.Statistics.DungeonStatistics();
    return GetAllDungeons().every((dungeon) => {
      const category = dungeon.Type === DungeonType.Capstone ? 'Capstone' : 'Dungeon';
      const highestReachedStage = dungeonStatistics[category][dungeon.Id] ?? 0;
      return highestReachedStage >= dungeon.StagesMax;
    });
  });

  private GetRequiredDungeonKeys(): DungeonRoomKey[] {
    const requiredKeys = GetAllDungeons()
      .map((dungeon) => dungeon.Rewards.Key)
      .filter((key): key is DungeonRoomKey => key !== null);

    return Array.from(new Set(requiredKeys));
  }
}
