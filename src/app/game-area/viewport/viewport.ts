import { BossService, GameService, PlayerService, StageService } from '../../../shared/services';
import { ExperienceBar, HealthBar, StageLabel } from '../../../shared/components';

import { Component } from '@angular/core';

@Component({
  selector: 'app-viewport',
  imports: [HealthBar, ExperienceBar, StageLabel],
  templateUrl: './viewport.html',
  styleUrl: './viewport.scss'
})
export class Viewport {
  protected get showStage(): boolean {
    return this.gameService.InProgress();
  }

  protected get showBoss(): boolean {
    return this.gameService.InProgress();
  }

  protected get showExpBar(): boolean {
    return this.gameService.InProgress();
  }

  constructor(
    protected stageService: StageService,
    protected bossService: BossService,
    protected playerService: PlayerService,
    protected gameService: GameService
  ) {}
}
