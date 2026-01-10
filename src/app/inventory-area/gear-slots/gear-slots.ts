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

  @Output() gearSlotSelected = new EventEmitter<{ event: MouseEvent; slot: GearType }>();

  constructor(protected inventoryService: InventoryService) {}

  protected SelectGearSlot(event: MouseEvent, slot: GearType): void {
    this.gearSlotSelected.emit({ event, slot });
  }
}
