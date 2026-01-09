import { AttackResult, ExperienceGainResult, StageRewards } from '../models';
import { Injectable, signal } from '@angular/core';

import { BossService } from './boss.service';
import { LevelService } from './level.service';
import { StageService } from './stage.service';
import { StatsService } from './stats.service';
import { TimeoutUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    private stageService: StageService,
    private statsService: StatsService,
    private levelService: LevelService,
    private bossService: BossService
  ) {}

  private _gameInProgress = signal(false);
  public InProgress = this._gameInProgress.asReadonly();

  private get AttackDelay(): number {
    // Calculate attack delay in milliseconds based on player's attack speed
    return (1 / this.statsService.AttackSpeed()) * 1000;
  }

  /* Start the game loop */
  public Start() {
    this._gameInProgress.set(true);
    this.BattleLoop();
  }

  /* Prestige the game */
  public Prestige() {
    this._gameInProgress.set(false);
    this.bossService.Reset();
    this.stageService.Reset();
  }

  private async BattleLoop(): Promise<void> {
    while (this.InProgress()) {
      /* Attack Delay */
      await TimeoutUtils.wait(this.AttackDelay);

      if (!this.InProgress()) {
        return;
      }

      /* Attack */
      await this.AttackPhase();

      if (!this.InProgress()) {
        return;
      }

      /* Boss Defeated */
      if (this.bossService.IsDefeated) {
        console.log('Boss Defeated!');

        /* Boss Respawn Delay */
        await TimeoutUtils.wait(500);

        await this.RewardPhase();
        this.NextStage();
      }
    }
  }

  private async AttackPhase() {
    /* Perform Attack */
    const attackResult: AttackResult = this.statsService.Attack();

    /* Log Attack Type */
    if (attackResult.IsCritical && attackResult.IsMultiHit) {
      console.log('Critical Multi Hit!');
    } else if (attackResult.IsCritical) {
      console.log('Critical Hit!');
    } else if (attackResult.IsMultiHit) {
      console.log('Multi Hit!');
    }

    /* Deal Damage */
    console.log('Dealing Damage:', attackResult.Damage);
    this.bossService.TakeDamage(attackResult.Damage);
  }

  private async RewardPhase() {
    const rewards: StageRewards = this.stageService.GetRewards();
    console.log('Gained Experience:', rewards.Experience);
    console.log('Gained Gold:', rewards.Gold);

    let experienceGainResult: ExperienceGainResult = await this.levelService.GainExperience(
      rewards.Experience
    );

    if (experienceGainResult.LeveledUp) {
      this.PlayerLevelUp();

      while (experienceGainResult.ExperienceOverflow > 0) {
        experienceGainResult = await this.levelService.GainExperience(
          experienceGainResult.ExperienceOverflow
        );

        if (!experienceGainResult.LeveledUp) {
          break;
        } else {
          this.PlayerLevelUp();
        }
      }
    }
  }

  private PlayerLevelUp() {
    console.log('Level Up!');
    this.statsService.LevelUp();
  }

  private NextStage() {
    this.stageService.NextStage();
    this.bossService.SetBossForStage(this.stageService.CurrentStage());
  }
}
