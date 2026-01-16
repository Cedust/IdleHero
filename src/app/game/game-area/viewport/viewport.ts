import {
  BattleLog,
  BuffsBar,
  CharactersIconName,
  CreaturesIconName,
  HealthBar,
  IconComponent,
  StageLabel
} from '../../../../shared/components';
import {
  BossService,
  GameStateService,
  HeroService,
  LevelService,
  StageService
} from '../../../../shared/services';

import { Component } from '@angular/core';

@Component({
  selector: 'app-viewport',
  imports: [HealthBar, StageLabel, BattleLog, BuffsBar, IconComponent],
  templateUrl: './viewport.html',
  styleUrl: './viewport.scss'
})
export class Viewport {
  protected get showStage(): boolean {
    return this.gameStateService.IsGameInProgress;
  }

  protected get showHero(): boolean {
    return this.gameStateService.IsGameInProgress;
  }

  protected get showBoss(): boolean {
    return this.gameStateService.IsGameInProgress;
  }

  protected get showBuffBar(): boolean {
    return this.gameStateService.IsGameInProgress;
  }

  protected get HeroIcon(): CharactersIconName {
    return this.heroService.CharacterIcon();
  }

  protected get BossIcon(): CreaturesIconName {
    return this.bossService.BossIcon();
  }

  constructor(
    protected heroService: HeroService,
    protected stageService: StageService,
    protected bossService: BossService,
    protected levelService: LevelService,
    protected gameStateService: GameStateService
  ) {}
}
