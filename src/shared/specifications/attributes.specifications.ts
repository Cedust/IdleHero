import { GameStateService, LevelService, StatsService } from '../services';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AttributesSpecification {
  constructor(
    private statsService: StatsService,
    private levelService: LevelService,
    private gameStateService: GameStateService
  ) {}

  public CanIncrease(): boolean {
    return (
      !this.gameStateService.IsGameInProgress && this.levelService.UnspentAttributePoints() > 0
    );
  }

  public CanDecrease(attribute: 'Strength' | 'Intelligence' | 'Dexterity'): boolean {
    if (this.gameStateService.IsGameInProgress) {
      return false;
    }

    if (this.levelService.SpentAttributePoints() <= 0) {
      return false;
    }

    switch (attribute) {
      case 'Strength':
        return this.statsService.StrengthStat() > 1;
      case 'Intelligence':
        return this.statsService.IntelligenceStat() > 1;
      case 'Dexterity':
        return this.statsService.DexterityStat() > 1;

      default:
        return false;
    }
  }
}
