import {
  AttackPhaseResult,
  AttackResult,
  AttackType,
  BossDamageResult,
  Buff,
  ExperienceGainResult,
  MessageType,
  StageRewards
} from '../../models';
import { BATTLE_CONFIG, DELAYS } from '../../constants';
import { FlagsUtils, TimeoutUtils } from '../../utils';

import { BattleLogService } from './battle-log.service';
import { BossService } from './boss.service';
import { BuffsService } from '../buffs-service';
import { CurrencyService } from '../character/currency.service';
import { GameStateService } from '../state/game-state.service';
import { HeroService } from '../character/hero.service';
import { Injectable } from '@angular/core';
import { LevelService } from '../character/level.service';
import { StageService } from './stage.service';
import { StatsService } from '../character/stats.service';

@Injectable({
  providedIn: 'root'
})
export class BattleEngineService {
  constructor(
    private gameStateService: GameStateService,
    private heroService: HeroService,
    private stageService: StageService,
    private statsService: StatsService,
    private levelService: LevelService,
    private bossService: BossService,
    private battleLogService: BattleLogService,
    private buffsService: BuffsService,
    private currencyService: CurrencyService
  ) {}
  private get AttackDelay(): number {
    // Calculate attack delay in milliseconds based on player's attack speed
    return (1 / this.statsService.AttackSpeed()) * 1000;
  }

  private get IsSplashDamageEnabled(): boolean {
    const splashBuff: Buff | undefined = this.buffsService
      .Buffs()
      .find((b) => b.Name === 'Splash Area Damage');
    return splashBuff ? splashBuff.IsActive : false;
  }

  /* Start the game loop */
  public Start() {
    this.battleLogService.ClearLogs();
    this.battleLogService.StartGame();

    this.gameStateService.SetGameInProgress();
    this.BattleLoop();
  }

  /* Prestige the game */
  public Prestige() {
    this.battleLogService.Prestige(this.stageService.Current());
    this.heroService.Prestige(this.stageService.Current());

    this.gameStateService.SetGameIdle();
    this.bossService.Reset();
    this.stageService.Reset();
  }

  private async BattleLoop(): Promise<void> {
    let attackPowerOverflow: number = 0;

    while (this.gameStateService.IsGameInProgress) {
      if (!this.IsSplashDamageEnabled) {
        attackPowerOverflow = 0;
      }

      /* Attack Delay */
      await TimeoutUtils.wait(this.AttackDelay);

      if (!this.gameStateService.IsGameInProgress) {
        break;
      }

      /* Attack */
      const attackPhaseResult: AttackPhaseResult = this.AttackPhase(attackPowerOverflow);
      attackPowerOverflow = attackPhaseResult.AttackPowerOverflow;

      /* Boss Defeated */
      if (attackPhaseResult.IsBossDefeated && this.gameStateService.IsGameInProgress) {
        const rewards: StageRewards = this.stageService.GetRewards();
        this.battleLogService.BossDefeated(rewards);

        /* Boss Respawn Delay */
        await TimeoutUtils.wait(DELAYS.BOSS_RESPAWN_ANIMATION_MS);

        if (!this.gameStateService.IsGameInProgress) {
          break;
        }

        await this.RewardPhase(rewards);

        if (!this.gameStateService.IsGameInProgress) {
          break;
        }

        /* Game Win */
        if (this.stageService.Current() == BATTLE_CONFIG.STAGE.MAX) {
          this.Prestige();
          this.battleLogService.AddLog({
            Message: 'VICTORY!',
            Type: MessageType.Info
          });
          break;
        }

        this.NextStage();
      }
    }
  }

  private AttackPhase(attackPowerOverflow: number = 0): AttackPhaseResult {
    /* Perform Attack */
    let attackResult: AttackResult = this.statsService.Attack();

    if (attackPowerOverflow > 0) {
      attackResult.Damage += attackPowerOverflow;
      FlagsUtils.SetFlag(attackResult.AttackType, AttackType.Splash);
    }

    this.battleLogService.AttackLog(attackResult);
    this.heroService.RecordDamageDealt(attackResult.Damage);

    /* Deal Damage */
    const bossDamageResult: BossDamageResult = this.bossService.TakeDamage(attackResult.Damage);

    if (bossDamageResult.DamageDealt < attackResult.Damage) {
      attackPowerOverflow = Math.max(attackResult.Damage - bossDamageResult.DamageDealt, 0);
    } else {
      attackPowerOverflow = 0;
    }

    return {
      AttackPowerOverflow: attackPowerOverflow,
      IsBossDefeated: bossDamageResult.IsBossDefeated
    } as AttackPhaseResult;
  }

  private async RewardPhase(rewards: StageRewards) {
    this.currencyService.AddGold(rewards.Gold);
    let experienceGainResult: ExperienceGainResult = await this.levelService.GainExperience(
      rewards.Experience
    );

    if (!this.gameStateService.IsGameInProgress) {
      return;
    }

    if (experienceGainResult.LeveledUp) {
      this.LogPlayerLevelUp();

      while (experienceGainResult.ExperienceOverflow > 0) {
        experienceGainResult = this.levelService.GainExperience(
          experienceGainResult.ExperienceOverflow
        );

        if (!this.gameStateService.IsGameInProgress) {
          return;
        }

        if (!experienceGainResult.LeveledUp) {
          break;
        } else {
          this.LogPlayerLevelUp();
        }
      }
    }
  }

  private LogPlayerLevelUp() {
    this.battleLogService.LevelUp(this.levelService.Current(), this.levelService.Current() + 1);
  }

  private NextStage() {
    this.stageService.NextStage();
    this.bossService.SetBossForStage(this.stageService.Current());
  }
}
