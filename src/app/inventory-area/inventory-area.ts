import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GearSlots } from './gear-slots/gear-slots';
import { InventoryService } from '../../shared/services';

@Component({
  selector: 'app-inventory-area',
  imports: [DecimalPipe, GearSlots],
  templateUrl: './inventory-area.html',
  styleUrl: './inventory-area.scss'
})
export class InventoryArea {
  constructor(protected inventoryService: InventoryService) {}
}
