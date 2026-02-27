import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CombatLogEntry, DamageLogEntry } from '../../../../core/models';
import { Exp, Gold, IconComponent, RuneIcon, Separator } from '../../../../shared/components';
import {
  GetHitCount,
  HasBleedingHit,
  HasCriticalHit,
  HasMultiHits,
  IsChargeHit,
  IsCriticalHit,
  IsCriticalMultiHit,
  IsMultiHit,
  IsSplashHit
} from '../../../../core/systems/combat';

import { CombatActorIcon } from './combat-actor-icon/combat-actor-icon';
import { CombatLogService } from '../../../../core/services';
import { DecimalPipe } from '@angular/common';
import { TimestampUtils } from '../../../../shared/utils';

interface DamageLogEntryExtended {
  ActorClass: string;
  ActionContent: string;
  TotalDamage: number;
  DamageDetails: string;
  AdditionalDetails: AdditionalDetail[];
}

interface AdditionalDetail {
  value: string;
  class: string;
}

@Component({
  selector: 'app-combat-log',
  imports: [DecimalPipe, CombatActorIcon, IconComponent, Separator, Gold, Exp, RuneIcon],
  templateUrl: './combat-log.html',
  styleUrl: './combat-log.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CombatLog {
  private readonly Log = inject(CombatLogService);

  private readonly Entries = this.Log.Entries;
  protected readonly VisibleEntries = computed<CombatLogEntry[]>(() => this.Entries());

  protected DamageLogEntryExtended(entry: DamageLogEntry): DamageLogEntryExtended {
    const totalDamage = entry.Damage.reduce((sum, dmg) => sum + dmg.Amount, 0);

    return {
      ActorClass: this.DamageActorClass(entry),
      ActionContent: this.ActionContent(entry),
      TotalDamage: totalDamage,
      DamageDetails: this.DamageDetails(entry),
      AdditionalDetails: this.AdditionalDetails(entry)
    };
  }

  private DamageActorClass(entry: DamageLogEntry): string {
    if (IsCriticalMultiHit(entry.Damage)) {
      return 'log-critical-multi';
    } else if (IsMultiHit(entry.Damage)) {
      return 'log-multi';
    } else if (IsCriticalHit(entry.Damage)) {
      return 'log-critical';
    } else {
      return '';
    }
  }

  private ActionContent(entry: DamageLogEntry): string {
    if (IsCriticalMultiHit(entry.Damage)) {
      return '⚡⚔️';
    } else if (IsMultiHit(entry.Damage)) {
      return '⚔️';
    } else if (IsCriticalHit(entry.Damage)) {
      return '⚡';
    } else {
      return '🗡️';
    }
  }

  private DamageDetails(entry: DamageLogEntry): string {
    let damageDetails = 'HIT';

    if (HasMultiHits(entry.Damage)) {
      const multiHitCount = GetHitCount(entry.Damage);
      damageDetails = 'MULTI ' + damageDetails + ' [x' + multiHitCount + ']';
    }

    if (HasCriticalHit(entry.Damage)) {
      damageDetails = 'CRITICAL ' + damageDetails;
    }

    return damageDetails === 'HIT' ? '' : damageDetails;
  }

  private AdditionalDetails(entry: DamageLogEntry): AdditionalDetail[] {
    const details: AdditionalDetail[] = [];

    if (HasBleedingHit(entry.Damage)) {
      details.push({ value: 'BLEEDING', class: 'log-bleed' });
    }

    if (IsChargeHit(entry.Damage)) {
      details.push({ value: 'CHARGED', class: 'log-charged' });
    }

    if (IsSplashHit(entry.Damage)) {
      details.push({ value: 'SPLASH', class: 'log-splash' });
    }

    return details;
  }

  protected FormatTimestamp(timestampMs: number): string {
    return TimestampUtils.FormatTimestamp(timestampMs);
  }
}
