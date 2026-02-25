import { GoldState, LevelState, Skill } from '../../core/models';

import { Schema } from '../models/schema';

/**
 * Migration function to transform schema from version 3.1.0 to 3.2.0
 *
 * Changes:
 * - The player level is reduced to 40, and experience in level is reset to 0 for players above level 40 to prevent inconsistencies.
 * - The gold balance is reduced to a maximum of 100.000 to prevent excessively high gold amounts.
 * - The maximum level of the STAT_MAX_MH_CHAIN skill has been reduced from 5 to 3.
 *
 * @param schema The input schema in version 3.1.0 format
 * @returns The migrated schema in version 3.2.0 format
 */
export function MigrateSchema_3_1_0_to_3_2_0(schema: Schema): Schema {
  console.log('Starting migration from 3.1.0 to 3.2.0');

  let migratedSchema: Schema = {
    ...schema
  };

  migratedSchema.Level = ReducePlayerLevel(migratedSchema.Level);
  migratedSchema.Gold = ReduceGoldBalance(migratedSchema.Gold);

  for (let skill of Object.values(migratedSchema.Skills.SkillState)) {
    if (skill) {
      skill = DowngradeMultiHitChainSkillLevel(skill);
    }
  }

  return migratedSchema;
}

function IsMultiHitChainSkill(skill: Skill): boolean {
  return skill.DefinitionId === 'STAT_MAX_MH_CHAIN';
}

/**
 * Reduces the player's level to a maximum of 40 and resets experience in level to prevent inconsistencies.
 * @param level The current level state
 * @returns The migrated level state with reduced level and reset experience in level if necessary
 */
function ReducePlayerLevel(level: { Level: number; ExperienceInLevel: number }): {
  Level: number;
  ExperienceInLevel: number;
} {
  if (level.Level > 40) {
    level.Level = Math.min(level.Level, 40);
    level.ExperienceInLevel = 0; // Reset experience in level to prevent inconsistencies
  }
  return level;
}

/**
 * Reduces the gold balance to a maximum of 100,000 if it exceeds this amount.
 * @param goldState The current gold state
 * @returns The migrated gold state with reduced balance if necessary
 */
function ReduceGoldBalance(goldState: GoldState): GoldState {
  if (goldState.Balance > 100_000) {
    goldState.Balance = 100_000;
  }
  return goldState;
}

/**
 * In version 3.1.0, the STAT_MAX_MH_CHAIN skill had a maximum level of 5, which provided a total of +5 to the Multi Hit Chain stat.
 * In version 3.2.0, the maximum level of this skill has been reduced to 3, providing a total of +3 to the Multi Hit Chain stat.
 * This migration downgrades the skill level to 3 if it is currently higher than 3 to comply with the new rules.
 * @param skill The skill to be migrated
 * @returns The migrated skill with downgraded level if necessary
 */
function DowngradeMultiHitChainSkillLevel(skill: Skill): Skill {
  if (IsMultiHitChainSkill(skill)) {
    skill.Level = Math.min(skill.Level, 3);
  }
  return skill;
}
