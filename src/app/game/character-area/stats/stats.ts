import { AttributesService, CombatStatsService, GoldService } from '../../../../core/services';
import { Component, DestroyRef, LOCALE_ID, computed, effect, inject, signal } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { Gold, IconComponent } from '../../../../shared/components';

import { ATTRIBUTES_CONFIG } from '../../../../core/constants';
import { Attributes } from '../../../../core/models';
import { CombatState } from '../../../../core/systems/combat';
import { HeroStatsStateService } from '../../../../shared/services';
import { ToggleIcon } from './toggle-icon/toggle-icon';

interface StatsItem {
  label: string;
  value: string | null;
  uncappedValue?: string | null;
}

interface StatItemDefinition {
  label: string;
  effectiveValue: number;
  uncappedValue: number;
  formatter: (value: number) => string | null;
  suffix?: string;
}

interface StatsGrid {
  title: string;
  items: StatsItem[];
  expanded: boolean;
}

interface AttributeItem {
  label: keyof Attributes;
  value: string | null;
}

interface RespecSnapshot {
  allocated: Attributes;
  unallocated: number;
}

@Component({
  selector: 'app-stats',
  imports: [IconComponent, ToggleIcon, Gold],
  templateUrl: './stats.html',
  styleUrl: './stats.scss'
})
export class Stats {
  private readonly locale = inject(LOCALE_ID);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly statsState = inject(HeroStatsStateService);
  private readonly combatState = inject(CombatState);
  private readonly attributesService = inject(AttributesService);
  private readonly statsService = inject(CombatStatsService);
  private readonly goldService = inject(GoldService);

  private readonly decimalPipe: DecimalPipe = new DecimalPipe(this.locale);
  private readonly percentPipe: PercentPipe = new PercentPipe(this.locale);

  //#region RESPEC
  private readonly InitialRespecSnapshot = signal<RespecSnapshot | null>(null);
  protected readonly IsRespecMode = signal<boolean>(false);
  protected readonly HideRespecButton = computed<boolean>(() => {
    return this.combatState.InProgress() || this.attributesService.AllocatedTotal() <= 0;
  });
  protected readonly RespecButtonDisabled = computed<boolean>(() => {
    if (this.IsRespecMode()) {
      return !this.goldService.CanAfford(this.RespecCost());
    } else {
      return (
        !this.goldService.CanAfford(ATTRIBUTES_CONFIG.RESPEC_COST_PER_POINT_SPENT) ||
        this.attributesService.AllocatedTotal() <= 0
      );
    }
  });
  protected readonly CanConfirmRespec = computed<boolean>(() => {
    if (!this.IsRespecMode()) return false;
    return this.goldService.CanAfford(this.RespecCost());
  });
  protected readonly DecreasedPoints = signal<number>(0);
  protected readonly RespecCost = computed<number>(() => {
    const decreasedPoints = this.DecreasedPoints();
    return decreasedPoints * ATTRIBUTES_CONFIG.RESPEC_COST_PER_POINT_SPENT;
  });
  protected readonly RespecButtonTooltip = computed<string>(() => {
    if (this.IsRespecMode()) {
      return `Confirm Respec`;
    } else if (this.RespecButtonDisabled()) {
      return `Not enough Gold to Respec. Costs ${ATTRIBUTES_CONFIG.RESPEC_COST_PER_POINT_SPENT} Gold per point.`;
    } else {
      return `Start Respec`;
    }
  });

  public constructor() {
    effect(() => {
      if (this.combatState.InProgress()) {
        this.RollbackRespecIfNeeded();
      }
    });

    const HandleHiddenState = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        this.RollbackRespecIfNeeded();
      }
    };

    const HandleWindowBlur = () => {
      this.RollbackRespecIfNeeded();
    };

    // if (typeof document !== 'undefined') {
    //   document.addEventListener('visibilitychange', HandleHiddenState);
    // }

    // if (typeof window !== 'undefined') {
    //   window.addEventListener('blur', HandleWindowBlur);
    // }

    this.destroyRef.onDestroy(() => {
      // if (typeof document !== 'undefined') {
      //   document.removeEventListener('visibilitychange', HandleHiddenState);
      // }

      // if (typeof window !== 'undefined') {
      //   window.removeEventListener('blur', HandleWindowBlur);
      // }

      this.RollbackRespecIfNeeded();
    });
  }

  protected StartRespecMode(): void {
    if (this.IsRespecMode()) return;
    if (this.combatState.InProgress()) return;

    this.InitialRespecSnapshot.set({
      allocated: this.attributesService.GetAllocated(),
      unallocated: this.attributesService.UnallocatedPoints()
    });

    this.DecreasedPoints.set(0);
    this.IsRespecMode.set(true);
  }

  protected ConfirmRespec(): void {
    if (!this.CanConfirmRespec()) return;

    this.goldService.Spend(this.RespecCost());
    this.IsRespecMode.set(false);
    this.DecreasedPoints.set(0);
    this.InitialRespecSnapshot.set(null);
  }

  protected CancelRespecMode(): void {
    this.RollbackRespecIfNeeded();
  }

  private RollbackRespecIfNeeded(): void {
    if (!this.IsRespecMode()) return;

    const respecSnapshot = this.InitialRespecSnapshot();
    if (respecSnapshot) {
      this.attributesService.SetAllocated(respecSnapshot.allocated);
      this.attributesService.SetUnallocated(respecSnapshot.unallocated);
    }

    this.IsRespecMode.set(false);
    this.DecreasedPoints.set(0);
    this.InitialRespecSnapshot.set(null);
  }
  //#endregion RESPEC

  //#region ATTRIBUTES
  protected readonly ShowAttributePoints = computed<boolean>(
    () => this.attributesService.UnallocatedPoints() > 0
  );

  protected readonly AttributePoints = computed<string>(() => {
    const unspent: number = this.attributesService.UnallocatedPoints();
    return `${unspent}`;
  });

  protected readonly CanIncreaseAttributes = computed<boolean>(() => {
    if (this.IsRespecMode()) return false;

    const battleInProgress = this.combatState.InProgress();
    const hasUnspentPoints = this.attributesService.UnallocatedPoints() > 0;
    return !battleInProgress && hasUnspentPoints;
  });

  protected CanDecreaseAttribute(attribute: keyof Attributes): boolean {
    if (!this.IsRespecMode()) return false;

    const cost = this.RespecCost() + ATTRIBUTES_CONFIG.RESPEC_COST_PER_POINT_SPENT;
    const canSpend = this.goldService.CanAfford(cost);
    if (!canSpend) return false;

    const battleInProgress = this.combatState.InProgress();
    const canDeallocate = this.attributesService.CanDeallocate(attribute);
    return !battleInProgress && canDeallocate;
  }

  protected IncreaseAttribute(attribute: keyof Attributes): void {
    this.attributesService.Allocate(attribute, 1);
  }

  protected DecreaseAttribute(attribute: keyof Attributes): void {
    const deallocatedPoints = this.attributesService.Deallocate(attribute, 1);
    if (deallocatedPoints <= 0) return;

    this.DecreasedPoints.update((current) => current + deallocatedPoints);
  }

  protected ToggleAttributesExpanded() {
    this.statsState.AttributesExpanded.set(!this.statsState.AttributesExpanded());
  }
  //#endregion ATTRIBUTES

  //#region STATS
  protected readonly AllStats = computed<StatsGrid[]>(() => [
    {
      title: 'CHARGING STRIKE',
      items: this.ChargingStrikeStats(),
      expanded: this.statsState.ChargingStrikeStatsExpanded()
    },
    {
      title: 'OFFENSE',
      items: this.OffenseStats(),
      expanded: this.statsState.OffenseStatsExpanded()
    },
    {
      title: 'UTILITY',
      items: this.UtilityStats(),
      expanded: this.statsState.UtilityStatsExpanded()
    }
  ]);

  protected readonly Attributes = computed<AttributeItem[]>(() => {
    const attributes: Attributes = this.statsService.EffectiveAttributes();
    const displayValues: Attributes = {
      Strength: attributes.Strength + ATTRIBUTES_CONFIG.BASE.STRENGTH,
      Intelligence: attributes.Intelligence + ATTRIBUTES_CONFIG.BASE.INTELLIGENCE,
      Dexterity: attributes.Dexterity + ATTRIBUTES_CONFIG.BASE.DEXTERITY
    };

    return [
      {
        label: 'Strength',
        value: this.decimalPipe.transform(displayValues.Strength, '1.0-0')
      },
      {
        label: 'Intelligence',
        value: this.decimalPipe.transform(displayValues.Intelligence, '1.0-0')
      },
      {
        label: 'Dexterity',
        value: this.decimalPipe.transform(displayValues.Dexterity, '1.0-0')
      }
    ];
  });

  private ChargingStrikeStats = computed<StatsItem[]>(() => {
    const combatStats = this.statsService.Effective();
    const uncappedCombatStats = this.statsService.Uncapped();

    return [
      this.CreateStatItem({
        label: 'Charge Gain',
        effectiveValue: combatStats.ChargeGain,
        uncappedValue: uncappedCombatStats.ChargeGain,
        formatter: (value) => this.decimalPipe.transform(value, '1.0-0'),
        suffix: ' / Hit'
      }),
      this.CreateStatItem({
        label: 'Charge Loss',
        effectiveValue: combatStats.ChargeLoss,
        uncappedValue: uncappedCombatStats.ChargeLoss,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0'),
        suffix: ' / Miss'
      }),
      this.CreateStatItem({
        label: 'Charged Damage',
        effectiveValue: combatStats.ChargeDamage,
        uncappedValue: uncappedCombatStats.ChargeDamage,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Charged Duration',
        effectiveValue: combatStats.ChargeDuration,
        uncappedValue: uncappedCombatStats.ChargeDuration,
        formatter: (value) => this.decimalPipe.transform(value, '1.1-1', 'en-en'),
        suffix: ' s'
      })
    ];
  });

  private OffenseStats = computed<StatsItem[]>(() => {
    const combatStats = this.statsService.Effective();
    const uncappedCombatStats = this.statsService.Uncapped();

    return [
      this.CreateStatItem({
        label: 'Bleeding Chance',
        effectiveValue: combatStats.BleedingChance,
        uncappedValue: uncappedCombatStats.BleedingChance,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Bleeding Damage',
        effectiveValue: combatStats.BleedingDamage,
        uncappedValue: uncappedCombatStats.BleedingDamage,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Critical Hit Chance',
        effectiveValue: combatStats.CriticalHitChance,
        uncappedValue: uncappedCombatStats.CriticalHitChance,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Critical Hit Damage',
        effectiveValue: combatStats.CriticalHitDamage,
        uncappedValue: uncappedCombatStats.CriticalHitDamage,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Multi Hit Chance',
        effectiveValue: combatStats.MultiHitChance,
        uncappedValue: uncappedCombatStats.MultiHitChance,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Multi Hit Damage',
        effectiveValue: combatStats.MultiHitDamage,
        uncappedValue: uncappedCombatStats.MultiHitDamage,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      })
    ];
  });

  private UtilityStats = computed<StatsItem[]>(() => {
    const combatStats = this.statsService.Effective();
    const uncappedCombatStats = this.statsService.Uncapped();

    return [
      this.CreateStatItem({
        label: 'Attack Speed',
        effectiveValue: combatStats.AttackSpeed,
        uncappedValue: uncappedCombatStats.AttackSpeed,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Accuracy',
        effectiveValue: combatStats.Accuracy,
        uncappedValue: uncappedCombatStats.Accuracy,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Bleeding Ticks',
        effectiveValue: combatStats.BleedingTicks,
        uncappedValue: uncappedCombatStats.BleedingTicks,
        formatter: (value) => this.decimalPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Multi Hit Chain',
        effectiveValue: combatStats.MultiHitChain,
        uncappedValue: uncappedCombatStats.MultiHitChain,
        formatter: (value) => this.decimalPipe.transform(value, '1.0-0')
      }),
      this.CreateStatItem({
        label: 'Multi Hit Chain Factor',
        effectiveValue: combatStats.MultiHitChainFactor,
        uncappedValue: uncappedCombatStats.MultiHitChainFactor,
        formatter: (value) => this.percentPipe.transform(value, '1.0-0')
      })
    ];
  });

  private CreateStatItem(statDefinition: StatItemDefinition): StatsItem {
    const { label, effectiveValue, uncappedValue, formatter, suffix = '' } = statDefinition;

    const formattedEffectiveValue = this.FormatStatValue(formatter(effectiveValue), suffix);
    const shouldShowUncapped = uncappedValue > effectiveValue + Number.EPSILON;
    const formattedUncappedValue = shouldShowUncapped
      ? `(${this.FormatStatValue(formatter(uncappedValue), suffix) ?? '-'})`
      : null;

    return {
      label,
      value: formattedEffectiveValue,
      uncappedValue: formattedUncappedValue
    };
  }

  private FormatStatValue(value: string | null, suffix: string): string | null {
    if (value === null) {
      return null;
    }

    return `${value}${suffix}`;
  }
  //#endregion STATS
}
