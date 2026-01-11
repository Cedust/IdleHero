import { Enchantment } from './enchantment';
import { StatType } from '../stats/stat-type';

export interface EnchantmentPoolEntry {
  Stat: StatType;
  Min: number;
  Max: number;
  Probability: number;
}

export class EnchantmentPool extends Array<EnchantmentPoolEntry> {
  constructor(entries: EnchantmentPoolEntry[]) {
    super(...entries);
  }

  public GetRandomEnchantment(): Enchantment {
    const random: number = Math.random();
    let cumulativeProbability: number = 0;

    for (const enchantment of this) {
      cumulativeProbability += enchantment.Probability;

      if (random <= cumulativeProbability) {
        const value: number = this.GetRandomValue(enchantment.Min, enchantment.Max);
        return new Enchantment(enchantment.Stat as StatType, value);
      }
    }

    // Fallback in case probabilities don't sum to 1
    const fallback = this.GetFallback();
    return new Enchantment(fallback.Stat, fallback.Min);
  }

  private GetRandomValue(min: number, max: number): number {
    if (min < 1 && max <= 1) {
      // For decimal values
      const factor = 100;
      const scaledMin = Math.floor(min * factor);
      const scaledMax = Math.floor(max * factor);
      const randomScaledValue = Math.floor(Math.random() * (scaledMax - scaledMin + 1)) + scaledMin;
      return randomScaledValue / factor;
    } else {
      // Inclusive of min and max
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  private GetFallback(): EnchantmentPoolEntry {
    // Get stat with highest probability
    return this.reduce((prev, current) =>
      prev.Probability > current.Probability ? prev : current
    );
  }
}

export const WEAPON_ENCHANTMENT_POOL = new EnchantmentPool([
  { Stat: 'Strength', Min: 1, Max: 15, Probability: 0.5 },
  { Stat: 'CriticalHitChance', Min: 0.01, Max: 0.05, Probability: 0.3 },
  { Stat: 'AttackSpeed', Min: 0.02, Max: 0.1, Probability: 0.2 }
]);

export const SHIELD_ENCHANTMENT_POOL = new EnchantmentPool([
  { Stat: 'Strength', Min: 1, Max: 10, Probability: 0.5 },
  { Stat: 'CriticalHitDamage', Min: 0.5, Max: 1.0, Probability: 0.5 }
]);

export const HEAD_ENCHANTMENT_POOL = new EnchantmentPool([
  { Stat: 'Intelligence', Min: 1, Max: 20, Probability: 1.0 }
]);

export const CHEST_ENCHANTMENT_POOL = new EnchantmentPool([
  { Stat: 'Strength', Min: 1, Max: 10, Probability: 0.5 },
  { Stat: 'Dexterity', Min: 1, Max: 10, Probability: 0.5 }
]);

export const LEGS_ENCHANTMENT_POOL = new EnchantmentPool([
  { Stat: 'Strength', Min: 1, Max: 10, Probability: 0.5 },
  { Stat: 'Dexterity', Min: 1, Max: 10, Probability: 0.5 }
]);

export const BOOTS_ENCHANTMENT_POOL = new EnchantmentPool([
  { Stat: 'AttackSpeed', Min: 0.02, Max: 0.15, Probability: 0.9 },
  { Stat: 'CriticalHitChance', Min: 0.01, Max: 0.1, Probability: 0.1 }
]);
