import { Component, EventEmitter, Output } from '@angular/core';

import { GearType } from '../../../shared/models';
import { IconComponent } from '../../../shared/components';
import { InventoryService } from '../../../shared/services';

@Component({
  selector: 'app-gear-slots',
  imports: [IconComponent],
  templateUrl: './gear-slots.html',
  styleUrl: './gear-slots.scss'
})
export class GearSlots {
  protected GearType = GearType;
  protected SelectedGear: GearType | null = null;

  @Output() gearSlotSelected = new EventEmitter<{ event: MouseEvent; slot: GearType }>();

  constructor(private inventoryService: InventoryService) {}

  protected SelectGearSlot(event: MouseEvent, slot: GearType): void {
    this.SelectedGear = slot;
    this.gearSlotSelected.emit({ event, slot });
  }

  protected IsSelected(slot: GearType): boolean {
    return this.SelectedGear === slot;
  }

  protected IsUnequipped(slot: GearType): boolean {
    switch (slot) {
      case GearType.Weapon:
        return !this.inventoryService.Weapon() && !this.IsSelected(slot);
      case GearType.Shield:
        return !this.inventoryService.Shield() && !this.IsSelected(slot);
      case GearType.Head:
        return !this.inventoryService.Head() && !this.IsSelected(slot);
      case GearType.Chest:
        return !this.inventoryService.Chest() && !this.IsSelected(slot);
      case GearType.Legs:
        return !this.inventoryService.Legs() && !this.IsSelected(slot);
      case GearType.Boots:
        return !this.inventoryService.Boots() && !this.IsSelected(slot);
      default:
        return false;
    }
  }
}
