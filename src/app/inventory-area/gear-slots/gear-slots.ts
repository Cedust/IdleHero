import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/components';

@Component({
  selector: 'app-gear-slots',
  imports: [IconComponent],
  templateUrl: './gear-slots.html',
  styleUrl: './gear-slots.scss'
})
export class GearSlots {
  protected SelectGearSlot(slot: string): void {}
}
