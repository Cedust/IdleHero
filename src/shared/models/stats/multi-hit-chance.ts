export class MultiHitChance {
  private static readonly BASE_MHC: number = 0.0;
  private static readonly MAX_MHC: number = 0.5;
  private static readonly MHC_PER_DEXTERITY: number = 0.005;

  /**
   * Berechnet die Multi-Hit-Chance mit Diminishing Returns.
   * Formel: 1 - (Base * Dex * Gear) * Modifier
   */
  public static Calculate(dexterity: number, bonus: number, modifier: number = 1): number {
    // // Formula: BASE_MHC + (Dexterity - 1) * MHC_PER_DEXTERITY + Bonus * Modifier
    // return Math.min(
    //   (MultiHitChance.BASE_MHC + (dexterity - 1) * MultiHitChance.MHC_PER_DEXTERITY + bonus) *
    //     modifier,
    //   MultiHitChance.MAX_MHC
    // );

    // 1. Chance durch Dexterity (0.5% pro Punkt)
    const dexChance = (dexterity - 1) * MultiHitChance.MHC_PER_DEXTERITY;

    // 2. Multiplikative Kombination der Basis-Chancen
    // Wir berechnen die Wahrscheinlichkeit, NICHT zu multi-hitten
    const chanceNotToMultiHit = (1 - MultiHitChance.BASE_MHC) * (1 - dexChance) * (1 - bonus);

    // 3. Finale Chance berechnen
    let finalChance = 1 - chanceNotToMultiHit;

    // 4. Modifier anwenden
    finalChance *= modifier;

    // 5. Hard-Cap
    return Math.min(finalChance, MultiHitChance.MAX_MHC);
  }
}
