import {
  AttackPower,
  AttackResult,
  AttackSpeed,
  CriticalHitChance,
  CriticalHitDamage,
  MultiHitChance,
  MultiHitDamage
} from '../models';
import { Injectable, computed, signal } from '@angular/core';

import { ChanceUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly SKILL_POINTS_PER_LEVEL = 1;

  public UnspentSkillPoints = signal(0);

  /* Attributes */
  public Strength = signal(1);
  public Intelligence = signal(1);
  public Dexterity = signal(1);

  /* Combat Stats */
  public AttackPower = computed(() => AttackPower.Calculate(this.Strength()));
  public AttackSpeed = computed(() => AttackSpeed.Calculate(this.Dexterity()));
  public CriticalHitChance = computed(() => CriticalHitChance.Calculate(this.Intelligence()));
  public CriticalHitDamage = signal(1.5);
  public MultiHitChance = computed(() => MultiHitChance.Calculate(this.Dexterity()));
  public MultiHitDamage = signal(2);

  public Attack(): AttackResult {
    let damage: number = this.AttackPower();
    let isCritical: boolean = false;
    let isMultiHit: boolean = false;

    /* Critical Hit Calculation */
    if (ChanceUtils.success(this.CriticalHitChance())) {
      damage = CriticalHitDamage.Calculate(damage, this.CriticalHitDamage());
      isCritical = true;
    }

    /* Multi Hit Calculation */
    if (ChanceUtils.success(this.MultiHitChance())) {
      damage = MultiHitDamage.Calculate(damage, this.MultiHitDamage());
      isMultiHit = true;
    }

    return {
      Damage: damage,
      IsCritical: isCritical,
      IsMultiHit: isMultiHit
    };
  }

  public LevelUp() {
    this.UnspentSkillPoints.set(this.UnspentSkillPoints() + this.SKILL_POINTS_PER_LEVEL);
  }

  public IncreaseAttribute(attribute: 'Strength' | 'Intelligence' | 'Dexterity'): void {
    if (this.UnspentSkillPoints() <= 0) {
      return;
    }

    switch (attribute) {
      case 'Strength':
        this.Strength.set(this.Strength() + 1);
        break;
      case 'Intelligence':
        this.Intelligence.set(this.Intelligence() + 1);
        break;
      case 'Dexterity':
        this.Dexterity.set(this.Dexterity() + 1);
        break;
    }

    this.UnspentSkillPoints.set(this.UnspentSkillPoints() - 1);
  }

  public DecreaseAttribute(attribute: 'Strength' | 'Intelligence' | 'Dexterity'): void {
    switch (attribute) {
      case 'Strength':
        if (this.Strength() <= 1) return;
        this.Strength.set(this.Strength() - 1);
        break;

      case 'Intelligence':
        if (this.Intelligence() <= 1) return;
        this.Intelligence.set(this.Intelligence() - 1);
        break;

      case 'Dexterity':
        if (this.Dexterity() <= 1) return;
        this.Dexterity.set(this.Dexterity() - 1);
        break;
    }

    this.UnspentSkillPoints.set(this.UnspentSkillPoints() + 1);
  }
}
