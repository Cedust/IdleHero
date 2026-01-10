import { Gear, GearType } from '../models';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  public Gold = signal<number>(1337);

  public Weapon = signal<Gear>(null as any);
  public Shield = signal<Gear>(null as any);

  public Head = signal<Gear>(null as any);
  public Chest = signal<Gear>(null as any);
  public Legs = signal<Gear>(null as any);
  public Boots = signal<Gear>(null as any);

  public GetGearForSlot(slot: GearType): Gear | null {
    switch (slot) {
      case GearType.Weapon:
        return this.Weapon();
      case GearType.Shield:
        return this.Shield();
      case GearType.Head:
        return this.Head();
      case GearType.Chest:
        return this.Chest();
      case GearType.Legs:
        return this.Legs();
      case GearType.Boots:
        return this.Boots();
      default:
        return null;
    }
  }

  public SetGearForSlot(slot: GearType, gear: Gear): void {
    switch (slot) {
      case GearType.Weapon:
        this.Weapon.set(gear);
        break;
      case GearType.Shield:
        this.Shield.set(gear);
        break;
      case GearType.Head:
        this.Head.set(gear);
        break;
      case GearType.Chest:
        this.Chest.set(gear);
        break;
      case GearType.Legs:
        this.Legs.set(gear);
        break;
      case GearType.Boots:
        this.Boots.set(gear);
        break;
    }
  }
}
