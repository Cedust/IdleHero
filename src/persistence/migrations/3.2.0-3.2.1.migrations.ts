import { Attributes } from '../../core/models';
import { Schema } from '../models/schema';

/**
 * Migration function to transform schema from version 3.2.0 to 3.2.1
 *
 * Changes:
 * - All allocated attributes are reset to 0, and unallocated attributes are reset.
 *
 * @param schema The input schema in version 3.2.0 format
 * @returns The migrated schema in version 3.2.1 format
 */
export function MigrateSchema_3_2_0_to_3_2_1(schema: Schema): Schema {
  console.log('Starting migration from 3.2.0 to 3.2.1');

  let migratedSchema: Schema = {
    ...schema
  };

  migratedSchema.Attributes = ResetAttributes(
    migratedSchema.Level.Level,
    migratedSchema.Attributes
  );

  return migratedSchema;
}

/**
 * Resets the player's allocated attributes to 0 and unallocated attributes to player level * 1.
 * @param playerLevel The current player level
 * @param attributes The current attributes state
 * @returns The migrated attributes state with reset allocated attributes and updated unallocated attributes
 */
function ResetAttributes(
  playerLevel: number,
  attributes: {
    Allocated: Attributes;
    Unallocated: number;
  }
): {
  Allocated: Attributes;
  Unallocated: number;
} {
  return {
    Allocated: {
      Strength: 0,
      Intelligence: 0,
      Dexterity: 0
    },
    Unallocated: playerLevel * 1
  };
}
