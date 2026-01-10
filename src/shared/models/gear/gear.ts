export class Gear {
  constructor(
    public Type: GearType,
    public SellValue: number
  ) {}
}

export enum GearType {
  Weapon = 'Weapon',
  Shield = 'Shield',
  Head = 'Head',
  Chest = 'Chest',
  Legs = 'Legs',
  Boots = 'Boots'
}
